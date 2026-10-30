# ShopEasy 

**Wersja:** 1.0  
**Aplikacja:** http://localhost:3000/  

**Konto testowe:** `test@shopeasy.pl` / `Test1234!`
**Imię i nazwisko (wyświetlane w aplikacji):** Jan Testowy

## Uruchomienie aplikacji

Z katalogu `shopeasy-demo`:

```bash
cd shopeasy-demo
npm run dev
```

Pierwsze uruchomienie wymaga wcześniej: `npm install`, `npx prisma db push`, `npx prisma generate` oraz `npm run seed`.

### Gdy port 3000 jest zajęty

Sprawdź, który proces go używa:

```bash
netstat -ano | findstr :3000
```

Zatrzymaj proces o wskazanym PID:

```bash
taskkill /PID <PID> /F
```

Albo uruchom aplikację na innym porcie, np. 3001:

```bash
npx next dev -p 3001
```

Wtedy aplikacja działa pod adresem http://localhost:3001/. Konto testowe pozostaje bez zmian.  