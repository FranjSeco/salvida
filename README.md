![logo](https://github.com/user-attachments/assets/2b568d6f-a653-437a-8ad1-6a966ac176b7)

# Salvida

![SalVidaLogo|100](https://github.com/user-attachments/assets/1fb0c014-54ac-48df-81b0-b7bda1f0357c)

La misión de Salvida es facilitar el transporte accesible y el acompañamiento para personas con movilidad reducida. Sus objetivos incluyen ofrecer un servicio seguro, flexible y confiable que conecte usuarios, familias y profesionales, promoviendo la autonomía y la inclusión. El público objetivo abarca a personas mayores, personas con discapacidad y las organizaciones que apoyan su movilidad diaria.

## Tech Stack

**Frontend:** [Astro](https://astro.build/) 4.x 🚀 + [React](https://react.dev/) 18.x ⚛

**Backend:** [Python&nbsp;3.12](https://www.python.org/) 🐍

**Store:** [NanoStores](https://github.com/nanostores/nanostores)

**Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) 5 🌴🌐

**Authentication:** Por definir; se evalúa [Better&nbsp;Auth](https://better-auth.com/) 🔐

**DB:** [PostgreSQL](https://www.postgresql.org/) (versión por definir) 💾

**Deployment:** Por definir; opciones [Vercel](https://vercel.com/) o [Heroku](https://www.heroku.com/) 📟

**UX/UI Design**: Figma · [ReactCalendar](https://www.react-calendar.com/) ✒️ 📐

**Styling:** [HeroUI](https://www.heroui.com/) / [ShadCN](https://ui.shadcn.com/) 💎

## Instalación

### Requisitos previos
- [Node.js](https://nodejs.org/) 20.x y npm
- [Python](https://www.python.org/) 3.12
- [PostgreSQL](https://www.postgresql.org/) (opcional para entorno local)

### Dependencias
#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Uso

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```

## Pages

- **Landing/Home**

  Página de inicio donde se presenta el servicio y se ofrecen llamadas a la acción para registrarse o iniciar sesión.

  ![Landing](https://github.com/user-attachments/assets/8c57073a-bdf3-47f1-b6ea-632ab6c56dde)

- **User Profile** (Perfil de Usuario: `user` || `admin`)

  Permite a cada persona gestionar su información de contacto y revisar sus reservas activas. Funciona como el centro de control para la cuenta de un usuario o administrador.

### Entidad: User

```json
{
  "id": "uuid",
  "personalId": "dni",
  "dependantPrmIds": ["uuid"],
  "name": "string",
  "address": "string",
  "location": "string",
  "billingAddress": "string",
  "countryCode": "string",
  "phone": "string",
  "email": "string",
  "avatar": "string",
  "role": "user || admin",
  "bookings": [
    {
      "id": "uuid",
      "date": "timestamp",
      "prm": "uuid",
      "user": "uuid",
      "type": "singleService || voucher",
      "status": "requested || approved || canceled || done",
      "pickupAddress": "string",
      "destinationAddress": "string"
    }
  ]
}
```

- **PRM Profile**

  Muestra los datos relevantes de la persona con movilidad reducida (PRM), incluidos contactos de emergencia y direcciones frecuentes. Ayuda a organizar la información necesaria para cada servicio de transporte.

### Entidad: PRM

```json
{
  "id": "uuid",
  "personalId": "dni",
  "responsibleUserIds": ["uuid"],
  "createdBy": "uuid",
  "name": "string",
  "address": "string",
  "location": "string",
  "countryCode": "string",
  "phone": "string",
  "emergenciesPhoneNumbers": ["string"],
  "pickupAddresses": [
    {
      "id": "uuid",
      "address": "string",
      "location": "string",
      "contactPerson": "string || null"
    }
  ],
  "destinationAddresses": [
    {
      "id": "uuid",
      "address": "string",
      "location": "string",
      "alias": "string"
    }
  ],
  "bookings": [
    {
      "id": "uuid",
      "date": "timestamp",
      "prm": "uuid",
      "user": "uuid",
      "type": "singleService || voucher",
      "status": "requested || approved || canceled || done",
      "pickupAddress": "string",
      "destinationAddress": "string"
    }
  ]
}
```

### Entidad: Booking

```json
{
  "id": "uuid",
  "date": "timestamp",
  "prm": "uuid",
  "user": "uuid",
  "type": "singleService || voucher",
  "status": "requested || approved || canceled || done",
  "pickupAddress": "string",
  "destinationAddress": "string"
}
```

- **Admin panel**

  Sección destinada a la gestión interna; permite a los administradores revisar usuarios, PRM y reservas para mantener la plataforma operativa.

- **About**

  Página dedicada al servicio, su misión y el equipo que lo impulsa.

  ![About](https://github.com/user-attachments/assets/6699c177-6be9-4f71-a2d7-135785cb7b4d)

### Relaciones DDBB

[Diagram](https://database.build/db/blr9xemeegvy7qg3)

Iconography
[Isotipo.zip](https://github.com/user-attachments/files/18522895/Isotipo.zip)

Images
![Service1](https://github.com/user-attachments/assets/8c57073a-bdf3-47f1-b6ea-632ab6c56dde)
![ScreenSaver2](https://github.com/user-attachments/assets/6699c177-6be9-4f71-a2d7-135785cb7b4d)
![ScreenSaver](https://github.com/user-attachments/assets/444171ea-7270-4bce-9ba6-2253f2445158)
![SalVidaLogo](https://github.com/user-attachments/assets/1fb0c014-54ac-48df-81b0-b7bda1f0357c)
