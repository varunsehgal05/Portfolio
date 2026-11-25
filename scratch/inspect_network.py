import json

with open('lighthouse-prod.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

reqs = data.get('audits', {}).get('network-requests', {}).get('details', {}).get('items', [])
print(f'Total network requests: {len(reqs)}')
for r in reqs:
    sz = (r.get('transferSize') or 0) / 1024
    t = r.get('time') or 0
    st = r.get('startTime') or 0
    print(f"[{r.get('resourceType')}] {r.get('url')} - size={sz:.1f}KB, start={st:.1f}ms, time={t:.1f}ms")
