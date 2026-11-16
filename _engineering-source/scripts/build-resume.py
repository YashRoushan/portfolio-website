"""Compile and check the public PDF against the HTML résumé."""

import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unicodedata
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]


def normalized(text):
    text = unicodedata.normalize("NFKC", text).replace("’", "'")
    text = re.sub(r"[\u2010-\u2015\u2212]", "-", text)
    return " ".join(text.split()).casefold()


def run(*args, capture=False, env=None):
    result = subprocess.run(
        args, cwd=ROOT, check=True, stdout=subprocess.PIPE if capture else None,
        text=True, env=env,
    )
    return result.stdout if capture else ""


resume = json.loads((ROOT / "src/resume.json").read_text(encoding="utf-8"))
with tempfile.TemporaryDirectory() as directory:
    pdf = Path(directory) / "resume.pdf"
    run(
        "pdflatex", "-interaction=nonstopmode", "-halt-on-error", "-file-line-error",
        f"-output-directory={directory}", "resume.tex",
        env={**os.environ, "SOURCE_DATE_EPOCH": "1794787200", "FORCE_SOURCE_DATE": "1"},
    )
    info = run("pdfinfo", str(pdf), capture=True)
    if not re.search(r"^Pages:\s+1\s*$", info, re.MULTILINE):
        raise SystemExit("The public résumé must have exactly one PDF page.")

    plain = normalized(run("pdftotext", "-raw", str(pdf), "-", capture=True))
    expected = [resume["name"], *[skill["value"] for skill in resume["skills"]]]
    for section in ("education", "experience", "projects"):
        for entry in resume[section]:
            expected.extend([entry["title"], *entry["points"]])
    expected = [item.replace(" · ", " | ") for item in expected]
    missing = [item for item in expected if normalized(item) not in plain]
    if missing:
        raise SystemExit("Text missing from the PDF: " + "; ".join(missing))

    layout = run("pdftotext", "-bbox-layout", str(pdf), "-", capture=True)
    page = ElementTree.fromstring(layout).find(".//{*}page")
    if page is None:
        raise SystemExit("PDF text layout is unavailable.")
    width, height = (float(page.attrib[key]) for key in ("width", "height"))
    words = page.findall(".//{*}word")
    if not words or any(
        float(word.attrib["xMin"]) < 20 or float(word.attrib["xMax"]) > width - 20
        or float(word.attrib["yMin"]) < 20 or float(word.attrib["yMax"]) > height - 20
        for word in words
    ):
        raise SystemExit("PDF text falls outside the checked margins.")
    shutil.copyfile(pdf, ROOT / "public/Yash_Roushan_Resume.pdf")
    print(f"Verified one résumé page, {len(words)} selectable words, content parity and PDF text bounds.")
