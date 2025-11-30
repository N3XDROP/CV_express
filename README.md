# Introducción

Este repositorio contiene el desarrollo de una aplicación web con arquitectura separada: **Express + TypeScript** para el backend y **React (Vite)** para el frontend.

# Tecnologías usadas

## Backend:

- Node.js
- Express.js
- TypeScript
- TypeORM
- MySQL / PostgreSQL
- bcrypt (hash de contraseñas)
- jsonwebtoken (JWT)
- dotenv
- cors

## Frontend

- React (Vite)
- TypeScript
- Axios

# Estructura del proyecto

```bash
/backend
 └─ src
     ├─ config
     │   └─ db.ts
     ├─ controllers
     │   └─ auth.controller.ts
     ├─ entities
     │   └─ User.ts
     ├─ routes
     │   └─ auth.routes.ts
     ├─ scripts
     │   └─ createAdmin.ts # Script para crear admin desde consola
     └─ index.ts

/frontend
 └─ src
     ├─ pages
     │   └─ Login.tsx
     └─ services
         └─ api.ts
```

# Comandos de inicialización/creación del proyecto

Creación de carpeta BACKEND por comandos y entrar a la misma:

```bash
mkdir backend; cd backend
```

Inicialización de NPM:

```bash
npm init -y
```

Instalación dependencias principales:

```bash
npm install express dotenv cors mysql2 typeorm reflect-metadata bcrypt jsonwebtoken class-validator class-transformer readline-sync
```

Instalación dependencias del desarrollo:

```bash
npm install -D typescript ts-node-dev nodemon @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken @types/readline-sync
```

Creación de tsconfig.json (Recordar modificar el contenido por uno adecuado al desarollo):

```bash
npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --allowSyntheticDefaultImports --strict
```

Luego, en el tsconfig.json se deben habilitar:

```bash
"experimentalDecorators": true
"emitDecoratorMetadata": true
```

# Comandos de ejecución

## Backend

Conexión a base de datos:

```bash
npm run mysql # Conexión a MYSQL (XAMPP)
npm run sb # Conexión a PostgreSQL (Supabase)
```

## Usuarios

Creación de admin por consola:

```bash
npm run create:admin
```

# Creación de .env

Actualmente el proyecto cuenta con un script que permite cambiar entre bases de datos (XAMPP y Supabase) de forma sencilla; cabe recalcar que el archivo `.env` se genera automáticamente al ejecutar los scripts.  
Los archivos `.env.mysql` y `.env.supabase` deben ser creados manualmente:

```bash
cd backend
type nul > .env.mysql
type nul > .env.supabase
```

A continuación el contenido de ejemplo:

```bash
# Para '.env.supabase'
DB_TYPE=supabase
SUPABASE_URL=TU_URL_DE_SUPABASE
SUPABASE_KEY=TU_API_KEY
JWT_SECRET=CONTRASEÑA_SEGURA
```

```bash
# Para '.env.mysql'
DB_TYPE=mysql
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=NAME_DATABASE
MYSQL_PORT=3306
JWT_SECRET=CONTRASEÑA_SEGURA
```
