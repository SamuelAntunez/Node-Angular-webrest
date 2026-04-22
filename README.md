# Node.js Store - Clean Architecture

Este proyecto es una implementación de una tienda virtual siguiendo los principios de **Arquitectura Limpia**, utilizando Node.js, Express, Prisma (Postgres) y Mongoose (MongoDB).

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión v20+)
- [Docker](https://www.docker.com/) y Docker Compose

## Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto:

### 1. Clonar el repositorio y dependencias
```bash
# Clonar repositorio
git clone <URL_DEL_REPOSITORIO>
cd USER-STORE-CA

# Instalar dependencias
npm install
```

### 2. Configurar variables de entorno
Copia el archivo `.env.template` a un nuevo archivo `.env` y ajusta las variables según sea necesario:
```bash
cp .env.template .env
```

### 3. Levantar las bases de datos (Docker)
El proyecto usa Docker para levantar instancias de MongoDB y PostgreSQL:
```bash
docker compose up -d
```

### 4. Configurar Prisma (Base de datos Postgres)
Debes sincronizar el esquema de la base de datos y generar el cliente de Prisma:
```bash
# Crear y aplicar migraciones
npx prisma migrate dev --name init

# Generar el cliente de Prisma
npx prisma generate
```

## Ejecución

### Modo Desarrollo
Para ejecutar el proyecto con recarga automática:
```bash
npm run dev
```

### Modo Producción
Para compilar y ejecutar la versión de producción:
```bash
npm run build
npm start
```

## Tecnologías Utilizadas

- **Node.js & TypeScript**
- **Express**: Framework web.
- **Prisma**: ORM para PostgreSQL.
- **Mongoose**: ODM para MongoDB.
- **Docker**: Contenedores para bases de datos.
- **Arquitectura Limpia**: Estructura basada en Dominio, Infraestructura y Presentación.