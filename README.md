# Introducción
El Actual repositorio contiene el desarrollo de una aplicación web hecha en EXPRESS para el backend y REACT para el frontend.

# Herramientas usadas
- Se usó nodeJS para el desarollo del proyecto.
- El idioma del backend TypesScript.
- EXPRESS para el desarrollo del backend y REACT para la organización del FRONTEND.

# Comandos de inicialización/creación del proyecto

Creación de carpeta BACKEND por comandos y entrar a la misma:
```bash
mkdir backend; cd backend
```

Inicialización de NPM:
```bash
npm init -y
```

Instalacion dependencia de EXPRESS:
```bash
npm install express
```

Instalación dependencias del desarrollo:
```bash
npm install -D typescript ts-node-dev @types/node @types/express nodemon
```

Creación de tsconfig.json (Recordar modificar el contenido por uno adecuado al desarollo):
```bash
npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --allowSyntheticDefaultImports --strict
```