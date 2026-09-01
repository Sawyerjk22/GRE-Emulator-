from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from .schemas import (
    SourceQuestionCreate, SourceQuestionResponse,
    VariationRequest, VariationResponse,
    TutorChatRequest, TutorChatResponse,
    DiagnosticExportRequest, DiagnosticExportResponse
)
from .gemini_service import generate_question_variation, run_socratic_tutor_chat
from .supabase_client import supabase_service

app = FastAPI(
    title="GRE Quant Preparation & AI Engine API",
    description="Mobile-first PWA Backend with Gemini API & Supabase Integration",
    version="1.0.0"
)

# Enable CORS for PWA client origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "gemini_configured": bool(supabase_service.is_configured()),
        "supabase_configured": supabase_service.is_configured()
    }

@app.get("/api/questions", response_model=List[Dict[str, Any]])
def get_questions(limit: int = 50):
    """Retrieve practice questions from database with local fallback."""
    questions = supabase_service.fetch_source_questions(limit)
    if not questions:
        # Fallback to local default questions if Supabase is unconfigured or empty
        return [
            {
                "id": "q1",
                "title": "Standard Deviation Comparison",
                "category": "Quantitative Reasoning",
                "subcategory": "Statistics",
                "question_type": "single",
                "question_text": "Distribution C: Mass concentrated at mean (30). Distribution D: Mass concentrated at extremes (10 and 50).\n\nQuantity A: Standard Deviation of C\nQuantity B: Standard Deviation of D",
                "options": ["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."],
                "correct_answer": "B: Quantity B is greater.",
                "explanation": "Distribution D has mass at the extreme boundaries (10 & 50), maximizing standard deviation.",
                "trap_type": "Symmetry & Range Illusion",
                "trap_description": "Tricking test-takers into assuming equal spread because both distributions span 10 to 50.",
                "hack_solution": "Visualize SD as physical distance from center fulcrum (30). Outer mass = maximum SD instantly.",
                "rule_takeaway": "Standard deviation is distance from the mean; pushing data to extreme edges maximizes SD.",
                "difficulty_rating": 4
            },
            {
                "id": "q2",
                "title": "Exponent Base Multiplier",
                "category": "Quantitative Reasoning",
                "subcategory": "Algebra",
                "question_type": "single",
                "question_text": "(5^(5x))(25) = 5^n. What is n in terms of x?",
                "options": ["A: 5x + 1", "B: 5x + 2", "C: 5x + 5", "D: 25x"],
                "correct_answer": "B: 5x + 2",
                "explanation": "(5^(5x))(5^2) = 5^(5x+2), hence n = 5x + 2.",
                "trap_type": "Exponent Base Multiplier Trap",
                "trap_description": "Getting bogged down in algebra and multiplying base coefficients incorrectly.",
                "hack_solution": "Number Plugging: Set x = 0 => (1)(25) = 25 = 5^2 => n = 2. Match with choices at x = 0.",
                "rule_takeaway": "When variables appear in both problem and choices, plug x = 0 or x = 1 to solve in 10 seconds.",
                "difficulty_rating": 3
            },
            {
                "id": "q3",
                "title": "Judges Venn Diagram / Neither Group",
                "category": "Quantitative Reasoning",
                "subcategory": "Sets & Venn Diagrams",
                "question_type": "single",
                "question_text": "Of 180 judges, 30% are women and 25% are minorities. 1/9 of women are minorities. How many judges are neither women nor minority?",
                "options": ["A: 78", "B: 81", "C: 87", "D: 93"],
                "correct_answer": "C: 87",
                "explanation": "Women = 54, Minority = 45, Overlap = 6. Union = 93. Neither = 180 - 93 = 87.",
                "trap_type": "Stopped-Short / Union Distractor",
                "trap_description": "Stopping early at Union (93) or double-subtracting overlap.",
                "hack_solution": "Venn Formula: Union = 54 + 45 - 6 = 93. Neither = 180 - 93 = 87.",
                "rule_takeaway": "Neither always equals Total - (Group A + Group B - Overlap). Never stop at the Union!",
                "difficulty_rating": 3
            }
        ]
    return questions

@app.post("/api/questions/ingest")
def ingest_question(question: SourceQuestionCreate):
    """Upload/Ingest a new practice question into Supabase database."""
    res = supabase_service.insert_source_question(question.dict())
    if not res:
        raise HTTPException(status_code=500, detail="Failed to save question to database.")
    return {"message": "Question ingested successfully", "data": res}

@app.post("/api/generate-variation", response_model=VariationResponse)
def create_variation(req: VariationRequest):
    """Generate a dynamic question variation using Gemini API."""
    return generate_question_variation(req)

@app.post("/api/tutor-chat", response_model=TutorChatResponse)
def tutor_chat(req: TutorChatRequest):
    """Interactive Socratic Tutor step execution."""
    reply = run_socratic_tutor_chat(req)
    return TutorChatResponse(reply=reply)

@app.post("/api/export-diagnostics", response_model=DiagnosticExportResponse)
def export_diagnostics(req: DiagnosticExportRequest):
    """Compile missed questions into diagnostic markdown report format."""
    lines = [
        "# 🎯 GRE Quantitative Missed Pattern Diagnostic Report",
        f"**Session Date:** {req.missed_questions[0].trap_type if req.missed_questions else 'Practice Review'}\n",
        "---"
    ]
    
    for idx, item in enumerate(req.missed_questions, 1):
        lines.append(f"\n### Question #{idx}: {item.trap_type}")
        lines.append(f"**Problem:** {item.question_text}")
        lines.append(f"**Your Answer:** {item.user_answer} | **Correct Answer:** {item.correct_answer}\n")
        lines.append(f"* **The Trap:** {item.trap_type} — {item.trap_description}")
        lines.append(f"* **The Hack:** {item.hack_solution}")
        lines.append(f"* **The Rule:** {item.rule_takeaway}")
        lines.append("\n---")
        
    formatted_report = "\n".join(lines)
    return DiagnosticExportResponse(formatted_report=formatted_report)
