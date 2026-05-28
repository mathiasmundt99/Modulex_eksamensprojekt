# Modulex Eksamensprojekt - Onboarding & Læringsplatform

Dette projekt er en fuldstack webapplikation designet til at håndtere onboarding af brugere og administration af læringsmateriale. Projektet er et samarbejde mellem **Gruppe 3 (Backend)** og **Gruppe 4 (Frontend)**.

## 📦 Installation og Opsætning

## 💡 Sådan kører du begge dele samtidig

For at systemet fungerer korrekt, skal både backenden og frontenden køre på samme tid:

1.  **(Backend) gruppe 3:** Skal altid være aktiv for at håndtere database-forespørgsler og login.
2.  **(Frontend) gruppe 4:** Skal være aktiv for at vise brugerfladen.

Du kan nu tilgå applikationen i din browser på den adresse, som Vite terminalen oplyser (typisk `http://localhost:5173` ).

---

## 📋 Gennemgang af systemet (User Journey)

For at teste hele flowet korrekt, skal du følge disse trin:

1.  **Invitation & Oprettelse:** Når du åbner siden, lander du på invitationssiden. Her skal du starte med at **oprette en bruger**.
2.  **Login:** Efter oprettelse skal den nye bruger **logge ind** med sin email og adgangskode.
3.  **Survey:** Efter login bliver brugeren automatisk sendt videre til en **survey**, som skal udfyldes.
4.  **Admin Login:** For at give den nye bruger adgang til kurser, skal du logge ind som administrator.
    - **Admin Email:** `admintest@test.dk`
    - **Kodeord:** `Test1234`
5.  **Tildeling af kurser:**
    - Gå til **Admin Dashboard**.
    - Find den bruger, du lige har oprettet, under brugeroversigten.
    - Tildel de relevante kurser til brugeren.
6.  **Bruger Dashboard:** Log ud som admin og ind med den nye bruger for at se de tildelte kurser på brugerens dashboard.

---

## 📂 Projektstruktur (Frontend)

- `src/services/`: Indeholder API-kald opdelt efter domæne (`authService.js`, `adminService.js`, `contentService.js`).
- `src/composables/`: Globale tilstande som `useCurrentUser.js`.
- `src/views/`: De primære sider i applikationen.
- `src/components/`: Genanvendelige UI-komponenter opdelt i `admin` og `user` mapper.
- `src/router/`: Konfiguration af alle ruter og adgangskontrol.

## 🔐 Sikkerhed

Projektet benytter `credentials: "include"` i alle fetch-kald. Dette sikrer, at HttpOnly cookies (som f.eks. session tokens) sendes med mellem frontend og backend for at verificere brugerens identitet uden at gemme følsom data i `localStorage`.

---

_Udviklet som eksamensprojekt i Modulex._
