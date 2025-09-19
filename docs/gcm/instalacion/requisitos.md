---
sidebar_position: 1
---

# Requisitos del Sistema

Requisitos técnicos para la instalación de GCM.

## Requisitos Mínimos

### Hardware
- **CPU**: 2 cores
- **RAM**: 4GB
- **Almacenamiento**: 50GB
- **Red**: Conexión estable

### Software
- Node.js 16.x o superior
- PostgreSQL 12 o superior
- Sistema operativo compatible con Docker

## Instalación

### Usando Docker
```bash
docker pull gcm:latest
docker run -d -p 3001:3000 gcm:latest
```

### Instalación Manual
```bash
npm install
npm run build
npm start
```

## Configuración

Configurar variables de entorno:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/gcm
PORT=3001
NODE_ENV=production
```