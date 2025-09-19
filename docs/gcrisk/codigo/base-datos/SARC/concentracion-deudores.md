# Concentración de Deudores - Base de Datos

## Migración: Diagrama de Relaciones

### Tablas Principales

```sql
-- Tabla de deudores
CREATE TABLE deudores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento VARCHAR(10) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    tipo_deudor ENUM('individual', 'empresarial') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_documento (tipo_documento, numero_documento)
);

-- Tabla de obligaciones
CREATE TABLE obligaciones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    deudor_id BIGINT NOT NULL,
    numero_obligacion VARCHAR(50) NOT NULL UNIQUE,
    saldo_capital DECIMAL(15,2) NOT NULL DEFAULT 0,
    saldo_intereses DECIMAL(15,2) NOT NULL DEFAULT 0,
    fecha_desembolso DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado ENUM('vigente', 'vencida', 'cancelada') NOT NULL DEFAULT 'vigente',
    clasificacion_riesgo CHAR(1) NOT NULL DEFAULT 'A',
    FOREIGN KEY (deudor_id) REFERENCES deudores(id),
    INDEX idx_deudor (deudor_id),
    INDEX idx_estado (estado),
    INDEX idx_clasificacion (clasificacion_riesgo)
);

-- Vista para concentración de deudores
CREATE VIEW v_concentracion_deudores AS
SELECT 
    d.id as deudor_id,
    d.nombre,
    d.tipo_documento,
    d.numero_documento,
    d.tipo_deudor,
    SUM(o.saldo_capital + o.saldo_intereses) as saldo_total,
    COUNT(o.id) as numero_obligaciones,
    MAX(o.clasificacion_riesgo) as peor_clasificacion
FROM deudores d
INNER JOIN obligaciones o ON d.id = o.deudor_id
WHERE o.estado = 'vigente'
GROUP BY d.id, d.nombre, d.tipo_documento, d.numero_documento, d.tipo_deudor;
```

### Diagrama de Relaciones

```
┌─────────────────┐       ┌─────────────────────┐
│    DEUDORES     │       │    OBLIGACIONES     │
├─────────────────┤       ├─────────────────────┤
│ id (PK)         │◄──────┤ deudor_id (FK)      │
│ tipo_documento  │       │ numero_obligacion   │
│ numero_documento│       │ saldo_capital       │
│ nombre          │       │ saldo_intereses     │
│ tipo_deudor     │       │ fecha_desembolso    │
│ fecha_creacion  │       │ fecha_vencimiento   │
└─────────────────┘       │ estado              │
                          │ clasificacion_riesgo│
                          └─────────────────────┘
```

### Índices de Performance

```sql
-- Índice compuesto para consultas de concentración
CREATE INDEX idx_concentracion ON obligaciones (estado, deudor_id, saldo_capital, saldo_intereses);

-- Índice para reportes por fecha
CREATE INDEX idx_fecha_desembolso ON obligaciones (fecha_desembolso);
CREATE INDEX idx_fecha_vencimiento ON obligaciones (fecha_vencimiento);
```