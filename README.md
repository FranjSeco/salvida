![logo](https://github.com/user-attachments/assets/2b568d6f-a653-437a-8ad1-6a966ac176b7)

# Salvida

![SalVidaLogo|100](https://github.com/user-attachments/assets/1fb0c014-54ac-48df-81b0-b7bda1f0357c)

La misión de Salvida es facilitar el transporte accesible y el acompañamiento para personas con movilidad reducida. Sus objetivos incluyen ofrecer un servicio seguro, flexible y confiable que conecte usuarios, familias y profesionales, promoviendo la autonomía y la inclusión. El público objetivo abarca a personas mayores, personas con discapacidad y las organizaciones que apoyan su movilidad diaria.

## Tech Stack

**Frontend:** Astro 🚀 + React ⚛

**Backend:** Python 🐍

**Store:** [NanoStores](https://github.com/nanostores/nanostores)

**Data Fetching:** Tanstack - react query 🌴🌐

**Authentication:** BetterAuth? 🔐

**DB:** SQL 💾

**Deployment:** ¿Vercel, Heroku? 📟

**UX/UI Design**: [Figma](https://www.figma.com/files/project/23313500) [ReactCalendar](https://www.react-calendar.com/) ✒️ 📐

**Styling:** [HeroUI](https://www.heroui.com/) / [ShadCN](https://ui.shadcn.com/) 💎

## Pages

- **Landing/Home**  
  Página de inicio.

- **User Profile** (Perfil de Usuario: `user` || `admin`)  
  Representa los datos de un usuario o administrador.

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
  "role": "user || admin"
  "bookings": {
     {
      "id": "uuid",
      "date": "timestamp",
      "prm": "uuid",
      "user": "uuid",
      "type": "singleService || voucher",
      "status": "requested || approved || canceled || done",
      "pickupAddress": "string",
      "destinationAddress": "string",
    }
  }
}
```

- **PRM Profile**

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
  "pickupAddresses": {
    {
      "id": "uuid",
      "address": "string",
      "location": "string",
      "contactPerson": "string || null"
    }
  },
  "destinationAddresses": {
    {
      "id": "uuid",
      "address": "string",
      "location": "string",
      "alias": "string"
    }
  },
  "bookings": {
    {
      "id": "uuid",
      "date": "timestamp",
      "prm": "uuid",
      "user": "uuid",
      "type": "singleService || voucher",
      "status": "requested || approved || canceled || done",
      "pickupAddress": "string",
      "destinationAdress": "string"
    }
  }
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

- Admin panel
- About
  Página dedicada al servicio

### Relaciones DDBB

[Diagram](https://database.build/db/blr9xemeegvy7qg3)

Iconography
[Isotipo.zip](https://github.com/user-attachments/files/18522895/Isotipo.zip)

Images
![Service1](https://github.com/user-attachments/assets/8c57073a-bdf3-47f1-b6ea-632ab6c56dde)
![ScreenSaver2](https://github.com/user-attachments/assets/6699c177-6be9-4f71-a2d7-135785cb7b4d)
![ScreenSaver](https://github.com/user-attachments/assets/444171ea-7270-4bce-9ba6-2253f2445158)
![SalVidaLogo](https://github.com/user-attachments/assets/1fb0c014-54ac-48df-81b0-b7bda1f0357c)
