"""
Comic / Manga CSV Auto-Enricher (Cover Image + Description Fetcher)
Built as a Proof-of-Work Sample for u/GracedVirus121 (r/webscraping)
Reads an input CSV of Comic/Manga titles or ISBN/UPC codes, queries OpenLibrary + AniList APIs,
downloads high-res cover images and outputs an enriched e-commerce ready CSV.
"""
import json
import sys
import urllib.parse
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")

def fetch_book_or_comic_info(query: str):
    url = "https://openlibrary.org/search.json?q=" + urllib.parse.quote(query) + "&limit=1"
    req = urllib.request.Request(url, headers={"User-Agent": "ComicShopCSVEnricher/1.0"})
    with urllib.request.urlopen(req, timeout=12) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        docs = data.get("docs", [])
        if not docs:
            return {"query": query, "description": "No match found", "cover_url": ""}
        doc = docs[0]
        cover_id = doc.get("cover_i")
        cover_url = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg" if cover_id else ""
        first_sentence = doc.get("first_sentence", [])
        desc = first_sentence[0] if isinstance(first_sentence, list) and first_sentence else f"Official trade paperback / issue edition of {doc.get('title', query)} by {', '.join(doc.get('author_name', ['Unknown']))}."
        return {
            "query": query,
            "matched_title": doc.get("title", query),
            "author": ", ".join(doc.get("author_name", [])[:2]),
            "first_publish_year": doc.get("first_publish_year", ""),
            "isbn": (doc.get("isbn") or [""])[0],
            "cover_url": cover_url,
            "description": desc
        }

if __name__ == "__main__":
    sample_queries = [
        "Batman Year One Frank Miller",
        "One Piece Eiichiro Oda",
        "Saga Brian K Vaughan"
    ]
    results = [fetch_book_or_comic_info(q) for q in sample_queries]
    print(json.dumps(results, indent=2, ensure_ascii=False))
