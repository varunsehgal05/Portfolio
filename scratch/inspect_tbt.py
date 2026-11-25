import json

with open('lighthouse-prod.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

audits = data.get('audits', {})

print('=== MAIN THREAD BREAKDOWN ===')
for item in audits.get('mainthread-work-breakdown', {}).get('details', {}).get('items', []):
    print(f"  {item.get('groupLabel')}: {item.get('duration'):.1f} ms")

print('\n=== LONG TASKS (>50ms) ===')
for task in audits.get('long-tasks', {}).get('details', {}).get('items', []):
    print(f"  Duration: {task.get('duration'):.1f} ms, StartTime: {task.get('startTime'):.1f} ms, URL: {task.get('url')}")

print('\n=== BOOT DIAGNOSTICS ===')
for item in audits.get('bootup-time', {}).get('details', {}).get('items', []):
    print(f"  {item.get('url')}: total={item.get('total'):.1f}ms, script={item.get('scripting'):.1f}ms")
