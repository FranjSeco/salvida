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

#### Activar entorno virtual

- En Windows (cmd):
  ```cmd
  backend\.venv\Scripts\activate
  ```
- En Bash (Git Bash, WSL, etc.):
  ```bash
  source backend/.venv/Scripts/activate
  ```

#### Levantar el backend
```bash
uvicorn backend.main:app --reload
```

## Cómo iniciar el backend

### Instalación y configuración de PostgreSQL

1. **Instala PostgreSQL**
   - Descarga e instala desde https://www.postgresql.org/download/
   - Elige una contraseña para el usuario superusuario `postgres`.

2. **Crea usuario y base de datos**
   - Abre la consola de PostgreSQL (`SQL Shell (psql)` o PowerShell en la carpeta de instalación).
   - Conéctate como superusuario:
     ```powershell
     .\psql -U postgres
     ```
   - Ejecuta los siguientes comandos, eligiendo el nombre de usuario, contraseña y base de datos que prefieras:
     ```sql
     CREATE USER <usuario> WITH PASSWORD '<contraseña>';
     CREATE DATABASE <nombre_db> OWNER <usuario>;
     ```
   - Guarda el usuario, contraseña y nombre de la base de datos para usarlos en la configuración del backend.

3. **Configura las variables de entorno**
   - Crea el archivo `backend/.env` con:
     ```
     DATABASE_URL=postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_db>
     SECRET_KEY=tu-clave-secreta
     ALGORITHM=HS256
     ACCESS_TOKEN_EXPIRE_MINUTES=30
     ```
   - Reemplaza `<usuario>`, `<contraseña>` y `<nombre_db>` por los valores que elegiste.
   - El valor de `SECRET_KEY` puede ser cualquier cadena segura.

4. **Instala dependencias y levanta el backend**
   - Activa el entorno virtual:
     ```bash
     source backend/.venv/Scripts/activate
     ```
   - Instala dependencias:
     ```bash
     pip install -r backend/requirements.txt
     ```
   - Desde la raíz del proyecto, ejecuta:
     ```bash
     uvicorn backend.main:app --reload
     ```
   - Accede a la API en [http://127.0.0.1:8000](http://127.0.0.1:8000) y a la documentación en [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### Variables de entorno

Antes de iniciar los servicios, copia los archivos de ejemplo y ajusta los valores según tu entorno local:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Backend** (`backend/.env`)

- `DATABASE_URL`: URL de conexión a la base de datos.
- `SECRET_KEY`: clave secreta para firmar los tokens.
- `ALGORITHM`: algoritmo de firma (por defecto `HS256`).
- `ACCESS_TOKEN_EXPIRE_MINUTES`: tiempo de expiración del token en minutos.

**Frontend** (`frontend/.env`)

- `VITE_API_URL`: URL base del backend.

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

## Contribución

Las contribuciones son bienvenidas. Si deseas colaborar:
- Abre un issue para discutir cambios importantes.
- Envía un pull request con tus mejoras.
- Asegúrate de que las pruebas pasen y sigue las convenciones del proyecto.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.
