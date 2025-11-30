# Introducción

El Actual repositorio contiene el desarrollo de una aplicación web hecha en EXPRESS para el backend y REACT para el frontend.

# Tecnologías usadas

1. Backend:

- Node.js
- Express.js
- TypeScript
- TypeORM
- MySQL / PostgreSQL
- bcrypt (hash de contraseñas)
- jsonwebtoken (JWT)
- dotenv
- cors

# Estructura del proyecto

```bash
/backend
 └─ src
     ├─ entities
     │   └─ User.ts
     ├─ routes
     │   └─ auth.routes.ts
     ├─ controllers
     │   └─ auth.controller.ts
     ├─ config
     │   └─ db.ts
     └─ index.ts

/frontend
 └─ src
     ├─ pages
     │   └─ Login.jsx
     └─ services
         └─ api.js
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
