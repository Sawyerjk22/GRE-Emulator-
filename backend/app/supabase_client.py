import logging
import requests
from typing import List, Dict, Any, Optional
from .config import settings

logger = logging.getLogger("supabase_client")

class SupabaseService:
    def __init__(self):
        self.url = settings.SUPABASE_URL.rstrip('/')
        self.key = settings.SUPABASE_KEY
        self.headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    def is_configured(self) -> bool:
        return bool(self.url and self.key)

    def fetch_source_questions(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Fetch source questions from Supabase database."""
        if not self.is_configured():
            logger.info("Supabase credentials not set. Returning local fallback questions.")
            return []
            
        endpoint = f"{self.url}/rest/v1/source_questions?select=*&limit={limit}"
        try:
            res = requests.get(endpoint, headers=self.headers, timeout=10)
            if res.status_code == 200:
                return res.json()
            else:
                logger.error(f"Failed to fetch questions from Supabase ({res.status_code}): {res.text}")
                return []
        except Exception as e:
            logger.error(f"Supabase connection error: {e}")
            return []

    def insert_source_question(self, question_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Insert a newly ingested source practice question into Supabase."""
        if not self.is_configured():
            logger.info("Supabase unconfigured, skipping DB insert.")
            return question_data
            
        endpoint = f"{self.url}/rest/v1/source_questions"
        try:
            res = requests.post(endpoint, json=question_data, headers=self.headers, timeout=10)
            if res.status_code in (200, 201):
                data = res.json()
                return data[0] if isinstance(data, list) and len(data) > 0 else question_data
            else:
                logger.error(f"Failed to insert question ({res.status_code}): {res.text}")
                return None
        except Exception as e:
            logger.error(f"Error inserting question to Supabase: {e}")
            return None

    def record_test_session(self, session_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Save completed test session statistics."""
        if not self.is_configured():
            return session_data
            
        endpoint = f"{self.url}/rest/v1/test_sessions"
        try:
            res = requests.post(endpoint, json=session_data, headers=self.headers, timeout=10)
            if res.status_code in (200, 201):
                return res.json()[0]
        except Exception as e:
            logger.error(f"Error recording test session: {e}")
        return None

supabase_service = SupabaseService()
