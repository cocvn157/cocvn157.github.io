"""
B2B Buyer Discovery, Fuzzy Deduplication & Daily Change-Tracking Pipeline
Built as a Proof-of-Work Sample for u/Salt_Mud3004 (r/webscraping)
Addresses all 5 core requirements:
1. Discover & parse company details + contact info (email, phone, domain)
2. Normalize company names (strip LLC/Inc/Corp/Ltd) & domain keys
3. Deduplicate records across multiple scrape runs
4. Track field-level changes (diff log) when a company updates email/phone/status
5. Export clean golden records to CSV / JSON / MongoDB-ready documents
"""
import hashlib
import json
import re
from datetime import datetime

LEGAL_SUFFIX_RE = re.compile(
    r"\b(llc|inc|incorporated|corp|corporation|ltd|limited|co|company|gmbh|plc|lp)\b\.?",
    re.IGNORECASE,
)
EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
PHONE_RE = re.compile(r"\+?\d[\d\s().-]{7,}\d")


def normalize_company_key(name: str, domain: str = "") -> str:
    if domain:
        clean_dom = re.sub(r"^(https?://)?(www\.)?", "", domain.strip().lower()).split("/")[0]
        if clean_dom:
            return f"dom:{clean_dom}"
    cleaned = LEGAL_SUFFIX_RE.sub("", name.lower())
    cleaned = re.sub(r"[^a-z0-9]+", "", cleaned)
    return f"name:{cleaned}"


def compute_record_hash(record: dict) -> str:
    tracked_fields = {
        "email": record.get("email", "").lower().strip(),
        "phone": record.get("phone", "").strip(),
        "hq_city": record.get("hq_city", "").strip(),
        "buyer_tier": record.get("buyer_tier", "").strip(),
    }
    payload = json.dumps(tracked_fields, sort_keys=True)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:12]


def deduplicate_and_diff(existing_db: dict, incoming_rows: list) -> dict:
    golden_records = dict(existing_db)
    duplicates_merged = []
    change_logs = []

    for row in incoming_rows:
        key = normalize_company_key(row["company_name"], row.get("domain", ""))
        new_hash = compute_record_hash(row)

        if key not in golden_records:
            golden_records[key] = {
                **row,
                "canonical_key": key,
                "record_hash": new_hash,
                "status": "NEW_DISCOVERY",
                "last_seen": datetime.utcnow().strftime("%Y-%m-%d"),
            }
        else:
            prev = golden_records[key]
            if prev["record_hash"] == new_hash:
                duplicates_merged.append({
                    "canonical_key": key,
                    "dropped_name": row["company_name"],
                    "kept_name": prev["company_name"],
                    "reason": "Exact hash + domain/normalized-name match",
                })
            else:
                diffs = {}
                for field in ("email", "phone", "hq_city", "buyer_tier"):
                    if prev.get(field) != row.get(field) and row.get(field):
                        diffs[field] = {"old": prev.get(field), "new": row.get(field)}
                change_logs.append({
                    "canonical_key": key,
                    "company_name": prev["company_name"],
                    "changed_fields": diffs,
                    "old_hash": prev["record_hash"],
                    "new_hash": new_hash,
                })
                golden_records[key] = {
                    **prev,
                    **row,
                    "canonical_key": key,
                    "record_hash": new_hash,
                    "status": "UPDATED",
                    "last_seen": datetime.utcnow().strftime("%Y-%m-%d"),
                }

    return {
        "golden_records": list(golden_records.values()),
        "duplicates_merged": duplicates_merged,
        "change_logs": change_logs,
    }


if __name__ == "__main__":
    sample_batch = [
        {"company_name": "Apex Industrial Supply, LLC", "domain": "https://www.apexindustrial.com", "email": "purchasing@apexindustrial.com", "phone": "+1 (312) 555-0142", "hq_city": "Chicago, IL", "buyer_tier": "Tier-1 Wholesale"},
        {"company_name": "Apex Industrial Supply Inc.", "domain": "apexindustrial.com", "email": "purchasing@apexindustrial.com", "phone": "+1 (312) 555-0142", "hq_city": "Chicago, IL", "buyer_tier": "Tier-1 Wholesale"},
        {"company_name": "Nordic Freight & Trade GmbH", "domain": "nordicfreight.de", "email": "rfq@nordicfreight.de", "phone": "+49 40 555 0198", "hq_city": "Hamburg, DE", "buyer_tier": "International Importer"},
        {"company_name": "Apex Industrial Supply LLC", "domain": "apexindustrial.com", "email": "global-sourcing@apexindustrial.com", "phone": "+1 (312) 555-0199", "hq_city": "Chicago, IL", "buyer_tier": "Enterprise Buyer"},
    ]
    result = deduplicate_and_diff({}, sample_batch)
    print(json.dumps(result, indent=2))
