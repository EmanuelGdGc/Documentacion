# Docusaurus en Garantias Comunitarias

## Bienvenido al Centro de Documentación

Este sitio contiene toda la documentación técnica y funcional de los sistemas desarrollados por Garantías Comunitarias.

## Módulos Disponibles

### 🏦 GCRisk

Sistema integral de gestión de riesgo crediticio para entidades financieras.

- Gestión de cartera de créditos
- Reportería regulatoria SARC
- Control de concentración de deudores

### 🌸 GCBloomRisk

Extensión especializada de GCRisk con funcionalidades avanzadas.

- Análisis predictivo de riesgo
- Machine Learning para scoring
- Integración con bureaus de crédito

### 📈 GCM

Sistema de gestión y monitoreo empresarial.

- Dashboard ejecutivo
- KPIs y métricas de negocio
- Reportería gerencial

### 🤝 GCMutual

Plataforma para gestión de cooperativas y mutuales.

- Gestión de socios
- Productos financieros cooperativos
- Reportería sectorial

## Navegación y Búsqueda

### Menú de Navegación

Utilice el menú superior para acceder a la documentación específica de cada módulo. Cada sección contiene:

- **Descripción del Sistema**: Qué hace y para qué sirve
- **Arquitectura**: Diseño técnico y componentes
- **Instalación**: Guías paso a paso para implementación
- **Código**: Documentación técnica por capas (Frontend, Backend, Base de Datos)

### Barra de Búsqueda

El sitio incluye una **barra de búsqueda local** que permite encontrar rápidamente contenido en toda la documentación:

- **Ubicación**: En la esquina superior derecha de la barra de navegación
- **Funcionalidad**: Búsqueda en tiempo real en todos los módulos
- **Cobertura**: Busca en títulos, contenido y metadatos de todas las páginas
- **Idioma**: Optimizada para contenido en español

**Consejos de búsqueda**:

- Use palabras clave específicas como "instalación", "configuración", "API"
- Combine términos para resultados más precisos
- Los resultados muestran el contexto y la ubicación exacta

### Solución de Problemas de Búsqueda

Si la barra de búsqueda no aparece o no funciona correctamente:

1. **Verificar que el plugin esté instalado**:

   ```bash
   npm list @easyops-cn/docusaurus-search-local
   ```

2. **Limpiar caché y reconstruir**:

   ```bash
   npm run clear
   npm run build
   ```

3. **Verificar configuración**: El plugin debe estar configurado en `docusaurus.config.ts` en la sección `plugins`

4. **Reiniciar servidor de desarrollo**:
   ```bash
   # Detener el servidor (Ctrl+C)
   npm start
   ```

La barra de búsqueda se genera automáticamente después del primer build y se actualiza con cada cambio en el contenido.

## Soporte

Para soporte técnico o consultas sobre la documentación, contacte al equipo de desarrollo.
