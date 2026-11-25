import json
import sys

filename = sys.argv[1] if len(sys.argv) > 1 else 'lighthouse-desktop.json'

with open(filename, 'r', encoding='utf-8') as f:
    data = json.load(f)

score = data.get('categories', {}).get('performance', {}).get('score')
print(f'=== LIGHTHOUSE PERFORMANCE SCORE for {filename}: {score * 100:.0f} / 100 ===')

audits = data.get('audits', {})
for key in ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'speed-index', 'cumulative-layout-shift']:
    a = audits.get(key, {})
    print(f"  {key}: {a.get('displayValue')} (score: {a.get('score')})")
