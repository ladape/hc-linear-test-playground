# 🏗️ Moduláris Projekt Architektúra

## Projekt Szerkezet

```
src/
├── modules/                          # 📦 Modulok - Önálló egységek
│   ├── tasks/                        # 📋 Tasks Kanban Board Modul
│   │   ├── api/                      # API réteg
│   │   ├── hooks/                    # React Query hooks
│   │   ├── components/               # Komponensek
│   │   ├── types/                    # TypeScript típusok
│   │   ├── style/                    # Komponens stílok
│   │   └── index.ts                  # Barrel export
│   │
│   └── bus/                          # 🚌 Bus Management Modul
│       ├── api/                      # API réteg
│       ├── hooks/                    # React Query hooks
│       ├── components/               # Komponensek
│       ├── types/                    # TypeScript típusok
│       ├── style/                    # Komponens stílok
│       └── index.ts                  # Barrel export
│
├── shared/                           # 🔗 Közös Dolgok
│   ├── ui/                           # Megosztott UI Komponensek
│   │   ├── ConfirmPopup/
│   │   ├── Modal/
│   │   ├── types/
│   │   ├── styles/
│   │   └── index.ts
│   │
│   └── common/                       # Közös Stílok & Layout
│       ├── styles/
│       └── index.ts
│
├── page/                             # 📄 Page Layout Komponensek
│   ├── TasksPage.tsx
│   ├── BusesPage.tsx
│   ├── ViewBusPage.tsx
│   ├── EditBusPage.tsx
│   └── task/
│
├── component/                        # 🏗️ Globális Layout Komponensek
│   └── navbar/
│
├── config/                           # ⚙️ Konfigurációk
├── App.tsx
└── main.tsx
```

## Modulok Felépítése

### Egy Modul Szerkezete

```
modules/[modul]/
├── api/
│   └── [modul].api.ts               # API hívások
├── hooks/
│   └── use*.ts                       # React Query hooks
├── components/
│   └── *.tsx                         # React komponensek
├── types/
│   └── [modul].type.ts              # TypeScript típusok
├── style/
│   └── *.style.ts                    # Komponens stílok
└── index.ts                          # Barrel export
```

### Elvek

- **🔒 Isolation**: Egy modul nem importálhat más modulból
- **📦 Encapsulation**: Az API a `index.ts` barrelben van
- **🎯 Single Responsibility**: Egy modul = egy feature
- **♻️ Reusability**: `shared/ui` komponensek bárhol használhatók

## Importok

### Helyes Import Minták ✅

```typescript
// Tasks modul használata
import { 
  useBoardQuery, 
  TaskCard, 
  TaskColumn 
} from '../modules/tasks';

// Bus modul használata
import { 
  useBusesQuery, 
  BusTable, 
  CreateBusForm 
} from '../modules/bus';

// Shared UI komponensek
import { ConfirmPopup, Modal } from '../shared/ui';

// Közös stílok
import { Page, Card, Title } from '../shared/common';
```

### Helytelen Importok ❌

```typescript
// Közvetlen fájl importálás módulból
import { useBoardQuery } from '../modules/tasks/hooks/useTasksKanbanBoardQuery';

// Modul-modul importok
import { useBusesQuery } from '../modules/bus/hooks/useBusesQuery';

// Nem exportált fájlok importálása
import { TaskColumn } from '../modules/tasks/components/TaskColumn';
```

## Új Modulok Hozzáadása

1. Hozz létre egy új mappát: `src/modules/[modulnév]/`
2. Készítsd el a mappastruktúrát:
   ```bash
   mkdir -p src/modules/[modulnév]/{api,hooks,components,types,style}
   ```
3. Implementálj az API, Hooks, Components, Types fájlokat
4. Hozz létre egy `index.ts` barrelexportet az összes publikus export-hoz
5. Importálás az `index.ts`-ből az egész alkalmazásban

## Build & Test

```bash
# Build
npm run build

# Development
npm run dev

# Type check
npm run typecheck
```

## Előnyök

✅ **Skálázhatóság** - Új modulok könyen hozzáadhatók  
✅ **Karbantarthatóság** - Tiszta szerkezet és határok  
✅ **Testability** - Modulok izoláltan tesztelhetők  
✅ **Átláthatóság** - Könnyű megtalálni amit keresünk  
✅ **Modularitás** - Modulok függetlenek egymástól  
✅ **Törlhetőség** - Egy modul teljes egészében eltávolítható  

