import json

with open('lighthouse-prod.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

audits = data.get('audits', {})

for k in ['forced-reflow', 'render-blocking-resources', 'dom-size', 'unused-javascript', 'unused-css-rules', 'critical-request-chains']:
    if k in audits:
        a = audits[k]
        print(f"[{k}] displayValue={a.get('displayValue')}, score={a.get('score')}")
        details = a.get('details', {})
        items = details.get('items', [])
        for it in items[:5]:
            print('   ', it)
