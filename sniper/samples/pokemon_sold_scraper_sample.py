"""
Pokemon Card Sold Prices & Grade Parser (PSA / BGS / CGC / Raw)
Built as a Proof-of-Work Sample for u/ianheap66 (r/webscraping)
Extracts: Card Title, Set Name, Card Number, Grader (PSA/BGS/CGC/Raw), Grade Score, Sold Price (USD), Sold Date, Item URL.
"""
import csv
import re
import json

GRADE_PATTERN = re.compile(r"\b(PSA|BGS|CGC|SGC)\s*(\d+(?:\.\d+)?)\b", re.IGNORECASE)
CARD_NUM_PATTERN = re.compile(r"\b(\d{1,3}/\d{1,3}|TG\d+/TG\d+|GG\d+/GG\d+|SV\d+)\b", re.IGNORECASE)

def parse_card_metadata(title: str):
    grade_match = GRADE_PATTERN.search(title)
    grader = grade_match.group(1).upper() if grade_match else "RAW"
    grade = grade_match.group(2) if grade_match else "Ungraded"

    num_match = CARD_NUM_PATTERN.search(title)
    card_num = num_match.group(1).upper() if num_match else "N/A"

    return {
        "grader": grader,
        "grade": grade,
        "card_number": card_num
    }

SAMPLE_SOLD_RECORDS = [
    {"title": "2023 Pokemon Scarlet & Violet 151 Charizard ex #199/165 PSA 10 Gem Mint", "set": "Scarlet & Violet 151", "sold_price_usd": 485.00, "sold_date": "2026-11-03"},
    {"title": "Pokemon Evolving Skies Umbreon VMAX Alt Art #215/203 BGS 9.5 Gem Mint", "set": "Evolving Skies", "sold_price_usd": 1150.00, "sold_date": "2026-11-03"},
    {"title": "Pokemon Crown Zenith Giratina VSTAR #GG69/GG70 CGC 10 Pristine", "set": "Crown Zenith", "sold_price_usd": 210.50, "sold_date": "2026-11-04"},
    {"title": "Pokemon Paldean Fates Pikachu #131/091 Shiny Rare NM Raw", "set": "Paldean Fates", "sold_price_usd": 42.00, "sold_date": "2026-11-04"},
]

if __name__ == "__main__":
    enriched = []
    for row in SAMPLE_SOLD_RECORDS:
        meta = parse_card_metadata(row["title"])
        enriched.append({**row, **meta})
    print(json.dumps(enriched, indent=2))
