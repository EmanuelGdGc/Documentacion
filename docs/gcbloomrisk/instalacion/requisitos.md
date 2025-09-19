---
sidebar_position: 1
---

# Requisitos del Sistema

Requisitos técnicos para la instalación de GC Bloom Risk.

## Requisitos de Hardware

### Servidor de Aplicación
- **CPU**: Mínimo 4 cores, recomendado 8 cores
- **RAM**: Mínimo 8GB, recomendado 16GB
- **Almacenamiento**: Mínimo 100GB SSD
- **Red**: Conexión estable de al menos 100Mbps

### Servidor de Base de Datos
- **CPU**: Mínimo 4 cores, recomendado 8 cores
- **RAM**: Mínimo 16GB, recomendado 32GB
- **Almacenamiento**: Mínimo 500GB SSD con RAID
- **Red**: Conexión de alta velocidad

## Requisitos de Software

### Sistema Operativo
- Ubuntu 20.04 LTS o superior
- CentOS 8 o superior
- Windows Server 2019 o superior

### Dependencias
- Node.js 18.x o superior
- Python 3.9 o superior
- PostgreSQL 13 o superior
- Redis 6.x o superior
- Docker 20.x (opcional)

## Configuración de Red

### Puertos Requeridos
- **3000**: Aplicación web
- **5432**: PostgreSQL
- **6379**: Redis
- **80/443**: Servidor web (Nginx/Apache)

### Firewall
Configurar reglas de firewall para permitir tráfico en los puertos especificados.