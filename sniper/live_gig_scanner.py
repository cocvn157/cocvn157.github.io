import json
import subprocess
import time
import urllib.parse
import xml.etree.ElementTree as ET
import re
from datetime import datetime, timezone

MULTI_SUBS = [
    "forhire+slavelabour+DoneDirtCheap+hireaprogrammer+webscraping+AutomateYourself+googlesheets+excel",
    "forhire+slavelabour+DoneDirtCheap+webscraping+AutomateYourself+googlesheets+excel+smallbusiness"
]

BUYING_KEYWORDS = [
    "[task]", "[hiring]", "hiring", "task", "need", "looking for",
    "scrape", "scraper", "script", "formula", "help", "automate",
    "automation", "build", "website", "landing page", "sheet",
    "macro", "vba", "python", "data", "extract", "bot", "crm"
]
SMALLBIZ_TECH_KEYWORDS = [
    "website", "landing page", "web design", "scrape", "scraping",
    "automate", "automation", "spreadsheet", "excel", "google sheet",
    "googlesheets", "script", "python", "developer", "crm",
    "dashboard", "shopify", "wordpress", "data entry"
]
OFFER_KEYWORDS = ["[offer]", "[for hire]", "for hire", "offering"]

def strip_html(html_str):
    text = re.sub(r"<[^>]+>", " ", html_str or "")
    text = re.sub(r"&#32;\s*submitted by\s*/u/\S+.*$", "", text, flags=re.IGNORECASE)
    text = re.sub(r"submitted by\s*/u/\S+\s*to\s*r/\S+\s*\[link\]\s*\[comments\]", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def fetch_rss_via_curl(url, ua_idx=0):
    uas = [
        f"SniperLeadScanner/2.{ua_idx} (Windows NT 10.0; Win64; x64)",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ]
    cmd = [
        "curl.exe", "-s", "-L",
        "-A", uas[ua_idx % len(uas)],
        url
    ]
    out = subprocess.check_output(cmd, timeout=25)
    return out.decode("utf-8", errors="replace")

def classify_gig(title, sub_label, body):
    combined = f"{title} {body}".lower()
    if any(k in combined for k in ["scrape", "scraping", "crawler", "extract", "ebay", "csv", "json"]):
        return "Web Scraping / Data", "$25-$60"
    if any(k in combined for k in ["excel", "sheet", "googlesheets", "vba", "formula", "macro", "spreadsheet"]):
        return "Excel / Google Sheets", "$15-$40"
    if any(k in combined for k in ["website", "landing", "web", "shopify", "wordpress", "html", "ui", "frontend"]):
        return "Web / Landing Page", "$40-$120"
    if any(k in combined for k in ["automate", "automation", "script", "bot", "python", "api", "workflow"]):
        return "Python / Automation", "$30-$75"
    if sub_label.lower() in ("r/slavelabour", "r/donedirtcheap"):
        return "Quick Micro-Task", "$15-$30"
    return "General / SMB Task", "$25-$50"

def build_quick_pitch(author, title, niche_tag):
    clean_title = re.sub(r"^\[[^\]]+\]\s*", "", title).strip()
    return (
        f"Hi u/{author}! Saw your post regarding \"{clean_title[:65]}\". "
        f"I specialize in fast-turnaround {niche_tag} deliverables and already mocked up a working sample/workflow for your exact use case. "
        f"Happy to share the preview or run a quick test on your sample data right now so you can verify quality before paying!"
    )

def fetch_live_gigs():
    gigs_by_id = {}
    ns = {"atom": "http://www.w3.org/2005/Atom"}

    for idx, multi_sub in enumerate(MULTI_SUBS):
        if idx > 0:
            time.sleep(1.5)
        url = f"https://www.reddit.com/r/{multi_sub}/new.rss?limit=100"
        try:
            xml_text = fetch_rss_via_curl(url, idx)
            if not xml_text.strip() or "<feed" not in xml_text:
                continue
            root = ET.fromstring(xml_text)
            for entry in root.findall("atom:entry", ns):
                post_id = entry.findtext("atom:id", default="", namespaces=ns)
                if not post_id or post_id in gigs_by_id:
                    continue

                title = entry.findtext("atom:title", default="", namespaces=ns).strip()
                link_el = entry.find("atom:link", ns)
                link = link_el.attrib.get("href", "") if link_el is not None else ""
                cat_el = entry.find("atom:category", ns)
                sub_label = cat_el.attrib.get("label", "r/reddit") if cat_el is not None else "r/reddit"
                if not sub_label.startswith("r/"):
                    term = cat_el.attrib.get("term", "") if cat_el is not None else ""
                    sub_label = f"r/{term}" if term else "r/reddit"

                author_el = entry.find("atom:author/atom:name", ns)
                author_raw = author_el.text if author_el is not None else ""
                author = author_raw.replace("/u/", "").strip()
                updated = entry.findtext("atom:updated", default="", namespaces=ns)
                content_html = entry.findtext("atom:content", default="", namespaces=ns)
                clean_body = strip_html(content_html)

                title_lower = title.lower()
                body_lower = clean_body.lower()
                combined_lower = f"{title_lower} {body_lower}"

                if "removed by reddit" in combined_lower:
                    continue
                if any(ok in title_lower for ok in OFFER_KEYWORDS):
                    continue

                if sub_label.lower() == "r/smallbusiness":
                    is_buying = bool(
                        re.search(r"\b(website|landing page|web design|scrape|scraping|automate|automation|spreadsheet|excel|google sheet|googlesheets|python|crm|dashboard|shopify|wordpress)\b", combined_lower)
                        and any(k in title_lower for k in ["need", "looking for", "help", "how", "recommend", "hire", "automate", "website", "crm", "sheet", "excel"])
                    )
                else:
                    is_buying = (
                        any(bk in title_lower for bk in BUYING_KEYWORDS)
                        or sub_label.lower() in ("r/webscraping", "r/automateyourself", "r/excel", "r/googlesheets")
                    )
                if not is_buying:
                    continue

                try:
                    dt = datetime.fromisoformat(updated)
                    created_utc = dt.timestamp()
                    age_minutes = max(1, int((datetime.now(timezone.utc).timestamp() - created_utc) / 60))
                except Exception:
                    created_utc = 0
                    age_minutes = 9999

                niche_tag, est_payout = classify_gig(title, sub_label, clean_body)
                quick_pitch = build_quick_pitch(author, title, niche_tag)

                gigs_by_id[post_id] = {
                    "id": post_id,
                    "subreddit": sub_label,
                    "title": title,
                    "author": author,
                    "url": link,
                    "dm_url": f"https://www.reddit.com/message/compose/?to={author}&subject=" + urllib.parse.quote(f"DONE / Sample Ready: {title[:50]}"),
                    "selftext": clean_body[:700],
                    "niche_tag": niche_tag,
                    "estimated_payout": est_payout,
                    "quick_pitch": quick_pitch,
                    "created_utc": created_utc,
                    "age_minutes": age_minutes
                }
        except Exception as e:
            print(f"Warn group ({multi_sub}): {e}")

    gigs = list(gigs_by_id.values())
    gigs.sort(key=lambda x: x["created_utc"], reverse=True)
    return gigs

if __name__ == "__main__":
    results = fetch_live_gigs()
    with open("live_reddit_gigs.json", "w", encoding="utf-8") as f:
        json.dump(results[:60], f, ensure_ascii=False, indent=2)
    print(f"Fetched {len(results)} live buying tasks/hiring posts across target subreddits (saved top {min(60, len(results))}).")
    for g in results[:15]:
        print(f"- [{g['subreddit']}] ({g['age_minutes']}m ago | {g['estimated_payout']}) {g['title']} (by u/{g['author']})")
