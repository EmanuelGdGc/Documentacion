# Concentración de Deudores - Base de Datos

## Descripción

Estructura de base de datos y consultas SQL para el análisis de concentración de deudores en el sistema SARC.

## Tablas Principales

### Tabla: deudores
```sql
CREATE TABLE deudores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    tipo_identificacion ENUM('CC', 'NIT', 'CE', 'PP') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO'
);
```

### Tabla: creditos
```sql
CREATE TABLE creditos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deudor_id INT NOT NULL,
    numero_credito VARCHAR(50) UNIQUE NOT NULL,
    saldo_capital DECIMAL(15,2) NOT NULL,
    fecha_desembolso DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado ENUM('VIGENTE', 'VENCIDO', 'CANCELADO') DEFAULT 'VIGENTE',
    FOREIGN KEY (deudor_id) REFERENCES deudores(id)
);
```

### Tabla: concentracion_historica
```sql
CREATE TABLE concentracion_historica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deudor_id INT NOT NULL,
    fecha_calculo DATE NOT NULL,
    saldo_total DECIMAL(15,2) NOT NULL,
    porcentaje_concentracion DECIMAL(5,4) NOT NULL,
    patrimonio_total DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (deudor_id) REFERENCES deudores(id),
    UNIQUE KEY unique_deudor_fecha (deudor_id, fecha_calculo)
);
```

## Consultas Principales

### Concentración Actual de Deudores
```sql
SELECT 
    d.id,
    d.identificacion,
    d.nombre as nombreDeudor,
    SUM(c.saldo_capital) as saldo,
    (SUM(c.saldo_capital) / (
        SELECT SUM(saldo_capital) 
        FROM creditos 
        WHERE estado = 'VIGENTE'
    )) * 100 as porcentaje
FROM deudores d
INNER JOIN creditos c ON d.id = c.deudor_id
WHERE c.estado = 'VIGENTE'
    AND c.fecha_desembolso BETWEEN ? AND ?
GROUP BY d.id, d.identificacion, d.nombre
HAVING porcentaje > 0
ORDER BY porcentaje DESC;
```

### Top 10 Deudores por Concentración
```sql
SELECT 
    d.nombre,
    d.identificacion,
    SUM(c.saldo_capital) as saldo_total,
    ROUND((SUM(c.saldo_capital) / pt.patrimonio_total) * 100, 4) as concentracion
FROM deudores d
INNER JOIN creditos c ON d.id = c.deudor_id
CROSS JOIN (
    SELECT SUM(saldo_capital) as patrimonio_total 
    FROM creditos 
    WHERE estado = 'VIGENTE'
) pt
WHERE c.estado = 'VIGENTE'
GROUP BY d.id, d.nombre, d.identificacion, pt.patrimonio_total
ORDER BY concentracion DESC
LIMIT 10;
```

### Histórico de Concentración por Período
```sql
SELECT 
    DATE_FORMAT(ch.fecha_calculo, '%Y-%m') as periodo,
    AVG(ch.porcentaje_concentracion) as concentracion_promedio,
    MAX(ch.porcentaje_concentracion) as concentracion_maxima,
    COUNT(DISTINCT ch.deudor_id) as total_deudores
FROM concentracion_historica ch
WHERE ch.fecha_calculo BETWEEN ? AND ?
GROUP BY DATE_FORMAT(ch.fecha_calculo, '%Y-%m')
ORDER BY periodo DESC;
```

## Procedimientos Almacenados

### sp_calcular_concentracion
```sql
DELIMITER //
CREATE PROCEDURE sp_calcular_concentracion(
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE
)
BEGIN
    DECLARE v_patrimonio_total DECIMAL(15,2);
    
    -- Obtener patrimonio total
    SELECT SUM(saldo_capital) INTO v_patrimonio_total
    FROM creditos 
    WHERE estado = 'VIGENTE'
        AND fecha_desembolso BETWEEN p_fecha_inicio AND p_fecha_fin;
    
    -- Insertar cálculos en tabla histórica
    INSERT INTO concentracion_historica (deudor_id, fecha_calculo, saldo_total, porcentaje_concentracion, patrimonio_total)
    SELECT 
        d.id,
        CURDATE(),
        SUM(c.saldo_capital),
        (SUM(c.saldo_capital) / v_patrimonio_total) * 100,
        v_patrimonio_total
    FROM deudores d
    INNER JOIN creditos c ON d.id = c.deudor_id
    WHERE c.estado = 'VIGENTE'
        AND c.fecha_desembolso BETWEEN p_fecha_inicio AND p_fecha_fin
    GROUP BY d.id
    ON DUPLICATE KEY UPDATE
        saldo_total = VALUES(saldo_total),
        porcentaje_concentracion = VALUES(porcentaje_concentracion),
        patrimonio_total = VALUES(patrimonio_total);
END //
DELIMITER ;
```

## Índices Recomendados

```sql
-- Índices para optimizar consultas de concentración
CREATE INDEX idx_creditos_deudor_estado ON creditos(deudor_id, estado);
CREATE INDEX idx_creditos_fecha_desembolso ON creditos(fecha_desembolso);
CREATE INDEX idx_concentracion_fecha ON concentracion_historica(fecha_calculo);
CREATE INDEX idx_deudores_identificacion ON deudores(identificacion);
```

## Consideraciones de Rendimiento

- Las consultas de concentración pueden ser costosas con grandes volúmenes de datos
- Se recomienda ejecutar el cálculo de concentración en horarios de baja demanda
- Implementar cache para consultas frecuentes
- Considerar particionamiento de tablas por fechas para mejorar rendimiento