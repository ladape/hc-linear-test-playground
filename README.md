# HC Linear – Frontend Tesztfeladat

Ez a projekt egy React + TypeScript + Vite alapú frontend, amely két külön backendhez kapcsolódik.  

A feladat leírása megtalálható a kezdő oldalon, a projekt elindítása után.
---

## Minimum követelmények

- **Node.js 18+**
- **npm 9+** vagy **pnpm / yarn**
- **Docker + Docker Compose**

---

## Projekt indítása (frontend)

A projekt gyökérmappájában futtasd:

```bash
npm install
npm run dev
```

Ez elindítja a fejlesztői szervert, amely alapértelmezés szerint a `http://localhost:5173` címen érhető el.

## Backend indítása (Docker Compose)

A backend konfiguráció a `backend/` mappában található.
Az adatstruktúra megtekinthető a `backend/data` mappában található **json** fájlokban.

Lépj be:
```bash
cd backend
```

Indítsd el a JSON server konténereket:
```bash
docker compose up -d
```

Ez elindít két külön backend szolgáltatást:

### 1. CRUD Backend

```
URL: http://localhost:3001
Resource: /buses
```
Ez a backend szolgálja ki a buszokkal kapcsolatos alap CRUD műveleteket
(lista, lekérés, mentés, módosítás, törlés).
A feladat első része ehhez a végponthoz kapcsolódik.

### 2. Board Backend

```
URL: http://localhost:3002
Resource: /board
```

## Általános API végpontok (clue/json-server)

| Művelet             | HTTP                   | Leírás                         |
| ------------------- | ---------------------- | ------------------------------ |
| Lista lekérése      | `GET /resource`        | Összes elem lekérése           |
| Egy elem lekérése   | `GET /resource/:id`    | Egy elem részletes adatai      |
| Új elem létrehozása | `POST /resource`       | Új bejegyzés mentése           |
| Elem módosítása     | `PATCH /resource/:id`  | Egy tétel részleges módosítása |
| Teljes csere        | `PUT /resource/:id`    | Egy tétel teljes újraírása     |
| Törlés              | `DELETE /resource/:id` | Egy elem törlése               |
