"""Configuration for the LLM Council - Executive Board Edition."""

import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Council members - list of OpenRouter model identifiers
COUNCIL_MODELS = [
    "openai/gpt-5.1",
    "anthropic/claude-sonnet-4.5",
    "google/gemini-3-pro-preview",
    "x-ai/grok-4",
]

# Chairman model - synthesizes final response (Chief Innovation Officer)
CHAIRMAN_MODEL = "google/gemini-3-pro-preview"

# Executive Board Role Mapping
MODEL_ROLES = {
    "openai/gpt-5.1": {
        "title": "Chief Strategic Officer (CSO)",
        "short_title": "CSO",
        "description": "Provides structured, comprehensive strategic analysis and long-term thinking",
        "color": "#10a37f"  # OpenAI green
    },
    "anthropic/claude-sonnet-4.5": {
        "title": "Chief Finance & Operating Officer (CFO/COO)",
        "short_title": "CFO/COO", 
        "description": "Delivers precise analysis with attention to financial and operational details",
        "color": "#d4a574"  # Anthropic tan
    },
    "google/gemini-3-pro-preview": {
        "title": "Chief Innovation Officer (CIO) & Chairman",
        "short_title": "CIO & Chairman",
        "description": "Drives creative problem-solving and synthesizes the council's collective wisdom",
        "color": "#4285f4"  # Google blue
    },
    "x-ai/grok-4": {
        "title": "Non-Executive Director & Chief of Staff",
        "short_title": "NED & CoS",
        "description": "Challenges assumptions and provides direct, unfiltered perspective",
        "color": "#1d9bf0"  # X/Twitter blue
    }
}

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Data directory for conversation storage
DATA_DIR = "data/conversations"
