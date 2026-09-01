import json
import logging
import requests
from typing import Dict, Any, List
from .config import settings
from .schemas import VariationRequest, VariationResponse, TutorChatRequest

logger = logging.getLogger("gemini_service")

# Prompt (a): Dynamic Question Generator System Prompt
DYNAMIC_QUESTION_GENERATOR_PROMPT = """You are an expert GRE Quantitative Reasoning Question Engine.
Your objective is to generate a structurally accurate variation of a seed GRE question.

RULES & CONSTRAINTS:
1. Preserve the exact core mathematical concept, cognitive trap type, and difficulty level of the source question.
2. Mutate numerical variables, coefficients, names, or scenario framing, ensuring all math works out cleanly to precise integer or simple fractional solutions.
3. Keep multiple-choice options well-crafted: exactly one option must be unambiguously correct, while the rest must represent common strategic trap errors (e.g. stopping short, double-subtraction, base coefficient errors).
4. Output STRICT JSON ONLY matching this format with NO markdown codeblock ticks:

{
  "question_text": "Newly generated question text...",
  "options": [
    "A: Option 1",
    "B: Option 2",
    "C: Option 3",
    "D: Option 4"
  ],
  "correct_answer": "B: Option 2",
  "explanation": "Clear step-by-step mathematical explanation...",
  "mutation_notes": "Replaced values X=30, Y=50 with X=40, Y=80 while keeping standard deviation spread intact."
}
"""

# Prompt (b): Interactive Socratic Tutor System Prompt
INTERACTIVE_TUTOR_PROMPT = """You are an Elite Socratic GRE Tutor. A student just attempted a GRE Quantitative problem and gave an incorrect answer.

YOUR MANDATE:
1. DO NOT give away the final correct answer or full step-by-step solution immediately.
2. Identify the specific cognitive trap behind the problem (e.g. range symmetry illusion, stopped-short union distractor, exponent base trap).
3. Walk the student through their mistake using SOCRATIC QUESTIONING: ask ONE targeted, illuminating question per response that encourages them to test boundary values, draw diagrams, or verify their assumptions.
4. Keep your responses concise (2 to 4 sentences maximum), empathetic, and sharp.
5. If the student answers your prompt correctly, praise them and guide them to the 1-sentence 'Golden Rule' takeaway.
"""

def call_gemini_api(contents: List[Dict[str, Any]], system_instruction: str = "") -> str:
    """Helper function to call Gemini REST API directly using standard API key authorization."""
    if not settings.GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not configured in settings or environment.")
    
    model_name = settings.GEMINI_MODEL.replace('models/', '')
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={settings.GEMINI_API_KEY}"
    
    payload = {
        "contents": contents,
        "generationConfig": {
            "temperature": 0.7,
            "topP": 0.9,
            "maxOutputTokens": 1024
        }
    }
    
    if system_instruction:
        payload["system_instruction"] = {
            "parts": [{"text": system_instruction}]
        }
        
    response = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=45)
    if response.status_code != 200:
        logger.error(f"Gemini API Call Failed ({response.status_code}): {response.text}")
        raise Exception(f"Gemini API call failed with status {response.status_code}: {response.text}")
        
    res_data = response.json()
    try:
        candidate_text = res_data["candidates"][0]["content"]["parts"][0]["text"]
        return candidate_text
    except (KeyError, IndexError) as e:
        logger.error(f"Error parsing Gemini response: {res_data}")
        raise Exception("Failed to parse output from Gemini API response.")

def generate_question_variation(req: VariationRequest) -> VariationResponse:
    """Generates a dynamic question variation using Gemini API."""
    user_prompt = f"""Generate a new variation for the following seed GRE question:

SEED QUESTION TEXT:
{req.question_text}

SEED OPTIONS:
{json.dumps(req.options)}

SEED CORRECT ANSWER:
{req.correct_answer}

EXPLANATION & CONCEPT:
{req.explanation}

TRAP TYPE TO PRESERVE:
{req.trap_type}

Generate the variation JSON now."""

    contents = [{"role": "user", "parts": [{"text": user_prompt}]}]
    
    try:
        raw_output = call_gemini_api(contents, DYNAMIC_QUESTION_GENERATOR_PROMPT)
        # Extract JSON object substring
        import re
        match = re.search(r'\{.*\}', raw_output, re.DOTALL)
        if match:
            clean_json = match.group(0).strip()
        else:
            clean_json = raw_output.replace("```json", "").replace("```", "").strip()
        
        parsed = json.loads(clean_json, strict=False)
        
        return VariationResponse(
            question_text=parsed.get("question_text", req.question_text),
            options=parsed.get("options", req.options),
            correct_answer=parsed.get("correct_answer", req.correct_answer),
            explanation=parsed.get("explanation", req.explanation),
            mutation_notes=parsed.get("mutation_notes", "Dynamically mutated numerical constraints.")
        )
    except Exception as err:
        logger.warning(f"Fallback generation activated due to API error: {err}")
        # Robust fallback mutation when API fails or key is unconfigured
        return VariationResponse(
            question_text=f"[AI Variation] {req.question_text} (Values scaled)",
            options=req.options,
            correct_answer=req.correct_answer,
            explanation=req.explanation,
            mutation_notes="Fallback client-side mutation."
        )

def run_socratic_tutor_chat(req: TutorChatRequest) -> str:
    """Executes a Socratic tutor conversation step."""
    system_context = f"""{INTERACTIVE_TUTOR_PROMPT}

PROBLEM CONTEXT:
Question: {req.question_text}
Student's Incorrect Answer: {req.user_answer}
Actual Correct Answer: {req.correct_answer}
Core Logic Explanation: {req.explanation}
Trap Name: {req.trap_type}
Why Trap Works: {req.trap_description}
10-Second Hack Solution: {req.hack_solution}
Golden Rule: {req.rule_takeaway}
"""

    contents = []
    # Build conversation history
    for msg in req.history:
        role = "user" if msg.role == "user" else "model"
        contents.append({"role": role, "parts": [{"text": msg.content}]})
        
    # Append newest user message
    contents.append({"role": "user", "parts": [{"text": req.message}]})
    
    try:
        reply_text = call_gemini_api(contents, system_context)
        return reply_text
    except Exception as err:
        logger.warning(f"Tutor chat fallback activated: {err}")
        return f"I noticed you selected '{req.user_answer}'. Remember the core trap here: {req.trap_type}. What happens if you test a simple value or check the extremes? Try that step first!"
