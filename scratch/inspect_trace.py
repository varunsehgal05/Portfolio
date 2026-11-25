import json

with open('lighthouse-prod.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Look in audits for details or long tasks details
long_tasks = data.get('audits', {}).get('long-tasks', {}).get('details', {}).get('items', [])
print('Found', len(long_tasks), 'long tasks:')
for t in long_tasks:
    print(t)
