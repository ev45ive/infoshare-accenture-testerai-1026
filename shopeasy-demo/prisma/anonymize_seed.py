#!/usr/bin/env python3
"""
Skrypt anonimizujący dane osobowe w pliku seed.ts
Wynik zapisuje do seed_anonymized.ts
"""
import re

INPUT_FILE = 'seed.ts'
OUTPUT_FILE = 'seed_anonymized.ts'

with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

counts = {}

# 1. Adresy e-mail
email_re = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')
content, n = email_re.subn('[EMAIL]', content)
counts['E-mail'] = n

# 2. Imię i nazwisko w polu name: (dwa słowa zaczynające się z wielkiej litery)
name_re = re.compile(r"(name:\s*')[A-Z][a-z]+\s+[A-Z][a-z]+(?=')")
content, n = name_re.subn(r'\1[IMIĘ NAZWISKO]', content)
counts['Imię/Nazwisko'] = n

# 3. Hasło w bcrypt.hash(...)
bcrypt_re = re.compile(r"(bcrypt\.hash\s*\(\s*')[^']+(?=')")
content, n = bcrypt_re.subn(r'\1[HASŁO]', content)
counts['Hasło (bcrypt.hash)'] = n

# 4. Hasło w logach (po znaku '/')
log_pass_re = re.compile(r"(/\s*)([A-Za-z0-9!@#$%^&*]{6,})(?=')")
content, n = log_pass_re.subn(r'\1[HASŁO]', content)
counts['Hasło (log)'] = n

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'✅ Zapisano: {OUTPUT_FILE}')
print()
print('Podsumowanie zastąpień:')
for key, val in counts.items():
    print(f'  • {key}: {val}')
