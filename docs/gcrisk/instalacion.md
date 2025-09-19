# Instalación - GCRisk

## Requisitos Previos

Antes de instalar GCRisk, asegúrese de cumplir con todos los [requisitos del sistema](./requisitos).

## Instalación Paso a Paso

### 1. Preparación del Entorno

```bash
# Crear directorio de instalación
mkdir /opt/gcrisk
cd /opt/gcrisk

# Clonar repositorio
git clone https://github.com/garantias-comunitarias/gcrisk.git .
```

### 2. Configuración de Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE gcrisk_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario
CREATE USER 'gcrisk_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON gcrisk_db.* TO 'gcrisk_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Instalación de Dependencias

```bash
# Backend (PHP)
composer install --no-dev --optimize-autoloader

# Frontend (Node.js)
npm install --production
npm run build
```

### 4. Configuración de la Aplicación

```bash
# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Ejecutar migraciones
php artisan migrate --force

# Ejecutar seeders (opcional)
php artisan db:seed
```

### 5. Configuración del Servidor Web

#### Nginx

```nginx
server {
    listen 80;
    server_name gcrisk.local;
    root /opt/gcrisk/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 6. Configuración de Permisos

```bash
# Establecer propietario
chown -R www-data:www-data /opt/gcrisk

# Configurar permisos
chmod -R 755 /opt/gcrisk
chmod -R 775 /opt/gcrisk/storage
chmod -R 775 /opt/gcrisk/bootstrap/cache
```

## Verificación de la Instalación

1. Acceda a `http://gcrisk.local` en su navegador
2. Verifique que la página de login se carga correctamente
3. Ejecute las pruebas básicas:

```bash
php artisan test --testsuite=Feature
```

## Próximos Pasos

- [Configuración Avanzada](./configuracion-avanzada)
- [Guía de Usuario](./guia-usuario)
- [Mantenimiento](./mantenimiento)
