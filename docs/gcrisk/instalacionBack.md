# Guía de instalación del back para GCRisk

---

## Índice

- [Requisitos previos](#requisitos-previos)
- [Instalación proyecto 'pruebas' - Configuración del Virtual Host](#instalacion-pruebas)
- [Configuración del Proyecto back_laravel](#configuracion-laravel)
- [Configuración de certificado SSL](#certficado-ssl)

---

La instalación del back del proyecto GCRisk consta de dos partes. La primera es un proyecto "legacy" que esta desarrollado completamente en PHP y donde se encuentra construida la mitad del proyecto

La otra parte consta de una API construida en Laravel, donde se están desarrollando los features mas recientes. Para que el proyecto corra adecuadamente, debemos instalar ambos proyectos y cada uno conlleva una instalación diferente.
Nos referiremos al proyecto legacy como **'pruebas'** y a la API como **'back_laravel'**

## Requisitos previos

- **Wampserve**: Ve al buscador de Windows busca `wampserve` y verifica que aplicación se encuentre instalada en el equipo, si no esta instalada puedes ir a la pagina:

  - `Url`: https://www.wampserver.com/en/download-wampserver-64bits/#download-wrapper y descargar la versión más actual
  - Si ya lo tienes instalado ejecútalo para verificar la versión que tienes, después debes entrar en el apartado de apache, apache modules y verificar que vhost_alias_module este activado.

  📌 _Se recomienda desinstalar la versión anterior en caso de no ser compatible con el back y actualizarla por una mas actual._

- **Versión de PHP**: Ejecuta `php -v` en la consola de comandos para verificar que versión de php tienes instalada. Laravel 8.83.29 que es la versión del proyecto requiere PHP entre 8.1 y 8.3. En este ejemplo se está utilizando PHP 8.2.26\*.  
  📌 Si la versión no es compatible, cámbiala desde las variables de entorno del sistema y reinicia el PC para aplicar los cambios.

### Cómo cambiar la versión de PHP en las Variables de Entorno

Si al ejecutar `php -v` no aparece la versión correcta, sigue estos pasos para cambiarla:

1. **Abrir Configuración de Variables de Entorno**

   - Presiona `Win + R`, escribe `sysdm.cpl` y presiona Enter.
   - Ve a la pestaña Opciones avanzadas y haz clic en Variables de entorno.

2. **Editar la variable `Path` de PHP**
   - En la sección Variables del sistema, busca y selecciona la variable `Path`.
   - Haz clic en Editar y verifica si hay rutas de PHP anteriores (por ejemplo, `C:\wamp64\bin\php\php8.0.0`).
   - Si hay una versión incorrecta, selecciónala y haz clic en Eliminar.
   - Agrega la ruta correcta de PHP. Para PHP 8.2.26 en Wampserver, normalmente es:
   ```
    C:\wamp64\bin\php\php8.2.26
   ```
   - Guarda los cambios y cierra todas las ventanas.
3. **Actualizar composer**

   - Validar la instalación de composer, `composer --version`, en caso de requerirlo, actualice el manejador de paquetes con el comando `composer self-update`

4. **Aplicar los cambios**
   - Reinicia tu PC para asegurarte de que el sistema detecte la nueva versión.
   - Abre una nueva terminal (`cmd`, Git Bash o PowerShell) y ejecuta:  
     `php -v`
   - Ahora debería mostrar `PHP 8.2.26`.

- Versión de Laravel Ejecuta `php artisan --version` dentro del proyecto.

---

## Instalación proyecto 'pruebas' - Configuración del Virtual Host {#instalacion-pruebas}

### 1. Habilitar el módulo `vhost_alias_module`

Desde el icono de Wampserver en la barra de tareas:

- Ir a Apache > Módulos de Apache > Activar `vhost_alias_module`.

### 2. Configurar el archivo `httpd-vhosts.conf`

Ubicación del archivo:

```
C:\wamp64\bin\apache\apacheX.X.XX\conf\extra\httpd-vhosts.conf
```

Añadir la siguiente configuración:

```
<VirtualHost *:80>
    ServerName https://www.gcrisk.local
    DocumentRoot "C:/wamp64/www/gcrisk_pruebas"
    <Directory  "C:/wamp64/www/gcrisk_pruebas/">
        Options +Indexes +Includes +FollowSymLinks +MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

📌 _Nota: Reemplaza `DocumentRoot` y `Directory` con la ruta real del proyecto._

### 3. Modificar el archivo `hosts`

Ubicación del archivo:

```
C:\Windows\System32\drivers\etc\hosts
```

Abrir como administrador y agregar:

```
127.0.0.1 https://www.gcrisk.local
::1 https://www.gcrisk.local
```

### 4. Reiniciar Wampserver

Una vez hechas las configuraciones, reinicia Wampserver para aplicar los cambios.

📌 _Notas Importantes_

- El proyecto cuando lo clonas desde la rama master no viene con la carpeta `**Landing**` así que debes solicitarla.
- Se recomienda ejecutar `composer install` desde Git Bash o CMD.
- Antes de ejecutarlo, asegúrate de que Composer está actualizado.
- También se debe ejecutar `composer install` en `**gcrisk_pruebas**` y `**gc_risk_mini**`.

---

## Configuración del Proyecto back_laravel {#configuracion-laravel}

### 1. Crear el archivo `.env`

En la raíz del proyecto GCRisk, copia el archivo `.env.example` y renómbralo a `.env`. Luego, configura las siguientes variables:

```
APP_NAME=
APP_ENV=
APP_KEY=
APP_DEBUG=
APP_URL=
URL_GCRISK=
ADMIN_MAIL=
URL_RSCRIPT=
BLOOMRISK_API_BASE_URL

DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

LOG_CHANNEL=
LOG_DEPRECATIONS_CHANNEL=
LOG_LEVEL=

MAIL_MAILER=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=
```

📌 **Nota**

- Configura correctamente la base de datos.
- Asegúrate de tener la conexión a la base de datos desde el gestor con el que deseas hacer la conexión.

### 2. Instalar Dependencias

Ejecuta en la raíz del proyecto:

```sh
composer install
```

---

## Certificado ssl {#certificado-ssl}

1.Descarga el archivo de certificados ssl:
Descarga este archivo:

👉 https://curl.se/ca/cacert.pem 2. Guarda el archivo como cacert.pem en la carpeta que contenga la versión de php que estas usando, Ejemplo:

👉C:\wamp64\bin\php\php8.3.6
![image](https://github.com/user-attachments/assets/8492cc65-78c8-4048-aeaa-079bdf0cde99)

3. Edita tu php.ini (Que esta en la misma carpeta donde pusiste el archivo cacert.pem)
   ![image](https://github.com/user-attachments/assets/aeb17093-fbfd-4a73-81a9-05304af48f54)

4. Abre el php.ini y busca esta línea:
   👉;curl.cainfo =
   y descoméntala (quita el ;) y pon la ruta a tu archivo cacert.pem, por ejemplo:

👉curl.cainfo = "C:\wamp64\bin\php\php8.3.6\cacert.pem"
![image](https://github.com/user-attachments/assets/2bf28ea9-66b4-4331-8560-852ea2f169c5)

5. También busca y haz lo mismo con openssl.cafile
   👉openssl.cafile="C:\wamp64\bin\php\php8.2.26\cacert.pem"
   ![image](https://github.com/user-attachments/assets/e70a4659-9036-4305-a210-97a61bbb99da)

6. Reinicia wamp y todos los servidores

## Notas Finales

Luego, accede a la aplicación desde: https://www.gcrisk.local
