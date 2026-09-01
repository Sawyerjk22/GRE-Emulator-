from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class SourceQuestionBase(BaseModel):
    title: str
    category: str = "Quantitative Reasoning"
    subcategory: Optional[str] = None
    question_type: str = "single"  # single, multiple, numeric
    question_text: str
    options: List[str] = []
    correct_answer: str
    explanation: str
    variable_constraints: Optional[Dict[str, Any]] = {}
    trap_type: str
    trap_description: str
    hack_solution: str
    rule_takeaway: str
    difficulty_rating: int = Field(default=3, ge=1, le=5)

class SourceQuestionCreate(SourceQuestionBase):
    pass

class SourceQuestionResponse(SourceQuestionBase):
    id: str
    created_at: Optional[str] = None

class VariationRequest(BaseModel):
    source_question_id: Optional[str] = None
    question_text: str
    options: List[str] = []
    correct_answer: str
    explanation: str
    trap_type: str
    difficulty_rating: int = 3

class VariationResponse(BaseModel):
    question_text: str
    options: List[str]
    correct_answer: str
    explanation: str
    mutation_notes: str

class TutorChatMessage(BaseModel):
    role: str  # 'user' or 'model' / 'assistant'
    content: str

class TutorChatRequest(BaseModel):
    question_text: str
    user_answer: str
    correct_answer: str
    explanation: str
    trap_type: str
    trap_description: str
    hack_solution: str
    rule_takeaway: str
    history: List[TutorChatMessage] = []
    message: str

class TutorChatResponse(BaseModel):
    reply: str

class MissedQuestionDiagnostic(BaseModel):
    question_id: Optional[str] = None
    question_text: str
    user_answer: str
    correct_answer: str
    trap_type: str
    trap_description: str
    hack_solution: str
    rule_takeaway: str

class DiagnosticExportRequest(BaseModel):
    missed_questions: List[MissedQuestionDiagnostic]

class DiagnosticExportResponse(BaseModel):
    formatted_report: str
