# Aplicación Web Fullstack

Aplicación web con autenticación y roles de usuario, desarrollada con
**Express + TypeScript** en el backend y **React (Vite)** en el frontend.

Incluye:

- Autenticación con JWT
- Roles (Admin / Usuario)
- Protección de rutas
- Panel de administración

---

## Ejecución rápida (modo desarrollo)

La aplicación en local estará disponible en:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

---

## Backend

```bash
cd backend
npm install
```

### Configuración de base de datos

El proyecto permite alternar entre bases de datos mediante scripts, cada comando utiliza un archivo .env distinto. Ejemplos a continuación:

```bash
# Para '.env.mysql'
DB_TYPE=mysql
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE={NameDatabase}
MYSQL_PORT=3306
JWT_SECRET={UnaContraseñaSecreta}
# FRONTEND_URL=http://localhost:{PUERTO} OPCIONAL
```

```bash
#Para '.env.supabase'
DB_TYPE=supabase
SUPABASE_URL=TU_URL_DE_SUPABASE
SUPABASE_KEY=TU_API_KEY
JWT_SECRET=CONTRASEÑA_SEGURA
# FRONTEND_URL=http://localhost:{PUERTO} OPCIONAL
```

### Ejecutar Backend

Al ejecutar el comando correspondiente, se genera automáticamente el .env principal del backend.

```bash
npm run mysql
# o
npm run sb
```

### Crear primer admin o usuarios en general
Se usa un script por comando para la creación del primer admin o usuarios generales por consola, este no tiene verificación de tokens o seguridad.
```bash
# Ubicarse en la carpeta backend
cd backend

#Crear usuario admin
npm run create:admin
```

## Frontend

```bash
cd frontend
npm install
```

### Conexión al backend

Crear un archivo .env indicando la IP del backend:

```bash
VITE_API_URL=http://{IP_EQUIPO}:4000/api
```

Para conocer la IP del equipo en Windows (IPv4):

```bash
ipconfig
```

### Ejecutar frontend

```bash
npm run dev
# o para acceso desde otros dispositivos
npm run dev -- --host
```
