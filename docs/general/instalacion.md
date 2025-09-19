# Instalación de Docusaurus

Esta guía te ayudará a instalar y configurar el proyecto de documentación de Garantías Comunitarias.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18.0 o superior
- **npm** o **yarn** como gestor de paquetes
- **Git** para clonar el repositorio

### Verificar instalaciones

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

## Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd Documentacion
```

### 2. Instalar Dependencias

**Usando npm:**
```bash
npm install
```

**Usando yarn:**
```bash
yarn install
```

### 3. Verificar Instalación

```bash
# Verificar que las dependencias se instalaron correctamente
npm list --depth=0
```

## Ejecución del Proyecto

### Modo Desarrollo

Para ejecutar el sitio en modo desarrollo con recarga automática:

```bash
npm start
```

Esto abrirá automáticamente `http://localhost:3000` en tu navegador.

### Construcción para Producción

Para generar los archivos estáticos optimizados:

```bash
npm run build
```

Los archivos se generarán en la carpeta `build/`.

### Servir Archivos de Producción

Para probar la versión de producción localmente:

```bash
npm run serve
```

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run serve` | Sirve archivos de producción |
| `npm run clear` | Limpia caché de Docusaurus |
| `npm run typecheck` | Verifica tipos TypeScript |

## Solución de Problemas

### Error de Puerto Ocupado

Si el puerto 3000 está ocupado:

```bash
npm start -- --port 3001
```

### Limpiar Caché

Si experimentas problemas de caché:

```bash
npm run clear
npm install
npm start
```

### Problemas de Dependencias

Si hay conflictos de dependencias:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Estructura de Archivos

```
Documentacion/
├── docs/                    # Documentación por módulos
│   ├── general/            # Documentación general
│   ├── gcrisk/            # Documentación GCRisk
│   ├── gcbloomrisk/       # Documentación GCBloomRisk
│   ├── gcm/               # Documentación GCM
│   └── gcmutual/          # Documentación GCMutual
├── src/                    # Código fuente personalizado
│   ├── components/        # Componentes React
│   ├── css/              # Estilos personalizados
│   └── pages/            # Páginas personalizadas
├── static/                # Archivos estáticos
├── docusaurus.config.ts   # Configuración principal
└── package.json           # Dependencias y scripts
```

## Configuración Adicional

### Variables de Entorno

Si necesitas configurar variables de entorno, crea un archivo `.env` en la raíz:

```bash
# .env
NODE_ENV=development
PORT=3000
```

### Personalización

Para personalizar el sitio, edita:
- `docusaurus.config.ts` - Configuración principal
- `src/css/custom.css` - Estilos personalizados
- `static/` - Archivos estáticos (imágenes, favicon, etc.)

## Próximos Pasos

Una vez instalado correctamente:

1. Explora la documentación existente
2. Familiarízate con la estructura de archivos
3. Revisa la [documentación oficial de Docusaurus](https://docusaurus.io/)
4. Comienza a agregar o editar contenido según sea necesario