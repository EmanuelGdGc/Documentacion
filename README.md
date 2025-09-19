# Centro de Documentación - Garantías Comunitarias

Este sitio web está construido usando [Docusaurus](https://docusaurus.io/), un generador moderno de sitios web estáticos.

## 📋 Requisitos Previos

- **Node.js** versión 18.0 o superior
- **npm** o **yarn** como gestor de paquetes

## 🚀 Instalación

### Usando npm:
```bash
npm install
```

### Usando yarn:
```bash
yarn install
```

## 💻 Desarrollo Local

### Usando npm:
```bash
npm start
```

### Usando yarn:
```bash
yarn start
```

Este comando inicia un servidor de desarrollo local y abre una ventana del navegador en `http://localhost:3000`. La mayoría de los cambios se reflejan en vivo sin necesidad de reiniciar el servidor.

## 🏗️ Construcción

### Usando npm:
```bash
npm run build
```

### Usando yarn:
```bash
yarn build
```

Este comando genera contenido estático en el directorio `build` y puede ser servido usando cualquier servicio de hosting de contenido estático.

## 🧪 Probar Build Local

### Usando npm:
```bash
npm run serve
```

### Usando yarn:
```bash
yarn serve
```

## 📁 Estructura del Proyecto

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

## 🔍 Funcionalidades

- **Búsqueda Local**: Barra de búsqueda integrada para encontrar contenido rápidamente
- **Múltiples Módulos**: Documentación organizada por sistemas (GCRisk, GCBloomRisk, GCM, GCMutual)
- **Responsive**: Diseño adaptable para dispositivos móviles y desktop
- **Modo Oscuro**: Soporte para tema claro y oscuro

## 🛠️ Comandos Útiles

- `npm run clear` - Limpia la caché de Docusaurus
- `npm run typecheck` - Verifica tipos de TypeScript
- `npm run swizzle` - Personaliza componentes de Docusaurus

## 📚 Documentación

Para más información sobre cómo usar y personalizar Docusaurus, consulta la [documentación oficial](https://docusaurus.io/).

## 🤝 Contribución

Para contribuir a la documentación:

1. Clona el repositorio
2. Crea una rama para tu feature/fix
3. Realiza tus cambios
4. Prueba localmente con `npm start`
5. Crea un Pull Request

## 📄 Licencia

Copyright © 2025 Garantías Comunitarias
