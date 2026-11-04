import json
import subprocess
import urllib.parse
import xml.etree.ElementTree as ET
import re
from datetime import datetime, timezone

MULTI_SUB = "slavelabour+forhire+hireaprogrammer+DoneDirtCheap+webscraping+AutomateYourself+excel+googlesheets"

BUYING_KEYWORDS = ["[task]", "[hiring]", "hiring", "task", "need", "looking for", "scrape", "script", "formula", "help", "automate", "build"]
OFFER_KEYWORDS = ["[offer]", "[for hire]", "for hire"]

def strip_html(html_str):
    text = re.sub(r"<[^>]+>", " ", html_str or "")
    text = re.sub(r"\s+", " ", text).strip()
    return text

def fetch_rss_via_curl(url):
    cmd = [
        "curl.exe", "-s", "-L",
        "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        url
    ]
    out = subprocess.check_output(cmd, timeout=20)
    return out.decode("utf-8", errors="replace")

def fetch_live_gigs():
    gigs = []
    ns = {"atom": "http://www.w3.org/2005/Atom"}
    url = f"https://www.reddit.com/r/{MULTI_SUB}/new.rss?limit=100"
    try:
        xml_text = fetch_rss_via_curl(url)
        root = ET.fromstring(xml_text)
        for entry in root.findall("atom:entry", ns):
            title = entry.findtext("atom:title", default="", namespaces=ns)
            link_el = entry.find("atom:link", ns)
            link = link_el.attrib.get("href", "") if link_el is not None else ""
            cat_el = entry.find("atom:category", ns)
            sub_label = cat_el.attrib.get("label", "r/reddit") if cat_el is not None else "r/reddit"
            author_el = entry.find("atom:author/atom:name", ns)
            author_raw = author_el.text if author_el is not None else ""
            author = author_raw.replace("/u/", "").strip()
            updated = entry.findtext("atom:updated", default="", namespaces=ns)
            content_html = entry.findtext("atom:content", default="", namespaces=ns)
            clean_body = strip_html(content_html)

            title_lower = title.lower()
            if any(ok in title_lower for ok in OFFER_KEYWORDS):
                continue

            is_buying = (
                any(bk in title_lower for bk in BUYING_KEYWORDS)
                or sub_label.lower() in ("r/webscraping", "r/automateyourself", "r/excel", "r/googlesheets")
            )
            if not is_buying:
                continue

            try:
                dt = datetime.fromisoformat(updated)
                created_utc = dt.timestamp()
                age_minutes = int((datetime.now(timezone.utc).timestamp() - created_utc) / 60)
            except Exception:
                created_utc = 0
                age_minutes = 9999

            gigs.append({
                "id": entry.findtext("atom:id", default="", namespaces=ns),
                "subreddit": sub_label,
                "title": title,
                "author": author,
                "url": link,
                "dm_url": f"https://www.reddit.com/message/compose/?to={author}&subject=" + urllib.parse.quote(f"DONE / Sample Ready: {title[:50]}"),
                "selftext": clean_body[:700],
                "created_utc": created_utc,
                "age_minutes": age_minutes
            })
    except Exception as e:
        print(f"Warn multi-sub: {e}")

    gigs.sort(key=lambda x: x["created_utc"], reverse=True)
    return gigs

if __name__ == "__main__":
    results = fetch_live_gigs()
    with open("live_reddit_gigs.json", "w", encoding="utf-8") as f:
        json.dump(results[:50], f, ensure_ascii=False, indent=2)
    print(f"Fetched {len(results)} live buying tasks/hiring posts across 8 subreddits.")
    for g in results[:15]:
        print(f"- [{g['subreddit']}] ({g['age_minutes']}m ago) {g['title']} (by u/{g['author']})")
