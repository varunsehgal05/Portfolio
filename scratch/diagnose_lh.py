import json

with open('lighthouse-report.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

audits = data.get('audits', {})
print('LCP element:', audits.get('largest-contentful-paint-element', {}).get('displayValue'))
for key in ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'speed-index', 'cumulative-layout-shift']:
    print(f"{key}: {audits.get(key, {}).get('displayValue')} (score: {audits.get(key, {}).get('score')})")

print('\nTop main thread tasks:')
for item in audits.get('mainthread-work-breakdown', {}).get('details', {}).get('items', [])[:8]:
    print(' ', item.get('groupLabel'), ':', item.get('duration'))

print('\nTop diagnostics items:')
for k, v in audits.items():
    if v.get('score') is not None and v.get('score') < 0.5 and v.get('details'):
        title = v.get('title', k)
        val = v.get('displayValue', '')
        print(f" - {title}: {val}")
