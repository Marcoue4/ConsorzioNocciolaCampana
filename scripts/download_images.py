import os
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup

BASE_URL = "https://www.consorzionocciolacampana.it/"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')

os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Fetching {BASE_URL}")

resp = requests.get(BASE_URL)
resp.raise_for_status()

soup = BeautifulSoup(resp.text, 'html.parser')

imgs = set()
for img in soup.find_all('img'):
    src = img.get('src')
    if not src:
        continue
    img_url = urljoin(BASE_URL, src)
    imgs.add(img_url)

print(f"Found {len(imgs)} images")

for img_url in imgs:
    parsed = urlparse(img_url)
    filename = os.path.basename(parsed.path)
    if not filename:
        continue
    out_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(out_path):
        print(f"Skipping existing {filename}")
        continue
    print(f"Downloading {img_url} -> {filename}")
    try:
        r = requests.get(img_url, stream=True)
        r.raise_for_status()
        with open(out_path, 'wb') as f:
            for chunk in r.iter_content(1024):
                f.write(chunk)
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")

print("Done")
