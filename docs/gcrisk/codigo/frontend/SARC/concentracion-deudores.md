# Concentración de Deudores - Frontend

## Descripción

El componente `concentracion-deudores.component.html` es responsable de mostrar y gestionar la información relacionada con la concentración de deudores en el sistema SARC.

## Estructura del Componente

### Template HTML

```html
<div class="concentracion-deudores-container">
  <div class="header-section">
    <h2>Concentración de Deudores</h2>
    <div class="filters-container">
      <mat-form-field>
        <mat-label>Fecha Inicio</mat-label>
        <input matInput [matDatepicker]="fechaInicio" [(ngModel)]="filtros.fechaInicio">
        <mat-datepicker-toggle matSuffix [for]="fechaInicio"></mat-datepicker-toggle>
        <mat-datepicker #fechaInicio></mat-datepicker>
      </mat-form-field>
      
      <mat-form-field>
        <mat-label>Fecha Fin</mat-label>
        <input matInput [matDatepicker]="fechaFin" [(ngModel)]="filtros.fechaFin">
        <mat-datepicker-toggle matSuffix [for]="fechaFin"></mat-datepicker-toggle>
        <mat-datepicker #fechaFin></mat-datepicker>
      </mat-form-field>
      
      <button mat-raised-button color="primary" (click)="aplicarFiltros()">
        Consultar
      </button>
    </div>
  </div>

  <div class="content-section">
    <mat-table [dataSource]="dataSource" class="concentracion-table">
      <!-- Columna Deudor -->
      <ng-container matColumnDef="deudor">
        <mat-header-cell *matHeaderCellDef>Deudor</mat-header-cell>
        <mat-cell *matCellDef="let element">{{element.nombreDeudor}}</mat-cell>
      </ng-container>

      <!-- Columna Identificación -->
      <ng-container matColumnDef="identificacion">
        <mat-header-cell *matHeaderCellDef>Identificación</mat-header-cell>
        <mat-cell *matCellDef="let element">{{element.identificacion}}</mat-cell>
      </ng-container>

      <!-- Columna Saldo -->
      <ng-container matColumnDef="saldo">
        <mat-header-cell *matHeaderCellDef>Saldo</mat-header-cell>
        <mat-cell *matCellDef="let element">{{element.saldo | currency:'COP':'symbol':'1.0-0'}}</mat-cell>
      </ng-container>

      <!-- Columna Porcentaje -->
      <ng-container matColumnDef="porcentaje">
        <mat-header-cell *matHeaderCellDef>% Concentración</mat-header-cell>
        <mat-cell *matCellDef="let element">
          <span [class.high-concentration]="element.porcentaje > 10">
            {{element.porcentaje | percent:'1.2-2'}}
          </span>
        </mat-cell>
      </ng-container>

      <!-- Columna Acciones -->
      <ng-container matColumnDef="acciones">
        <mat-header-cell *matHeaderCellDef>Acciones</mat-header-cell>
        <mat-cell *matCellDef="let element">
          <button mat-icon-button (click)="verDetalle(element)">
            <mat-icon>visibility</mat-icon>
          </button>
          <button mat-icon-button (click)="exportarDeudor(element)">
            <mat-icon>download</mat-icon>
          </button>
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>

    <mat-paginator [pageSizeOptions]="[10, 25, 50]" showFirstLastButtons></mat-paginator>
  </div>

  <!-- Gráfico de Concentración -->
  <div class="chart-section">
    <h3>Distribución de Concentración</h3>
    <canvas #chartCanvas></canvas>
  </div>
</div>
```

## Funcionalidades

### Filtros de Consulta
- **Fecha Inicio/Fin**: Permite filtrar los datos por rango de fechas
- **Consulta en tiempo real**: Los datos se actualizan automáticamente al aplicar filtros

### Tabla de Datos
- **Información del Deudor**: Nombre e identificación
- **Saldo**: Monto adeudado formateado en pesos colombianos
- **Porcentaje de Concentración**: Indicador visual para concentraciones altas (>10%)
- **Acciones**: Ver detalle y exportar información individual

### Visualización
- **Gráfico de Distribución**: Muestra la concentración de deudores de forma visual
- **Paginación**: Manejo eficiente de grandes volúmenes de datos

## Estilos CSS

```css
.concentracion-deudores-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 30px;
}

.filters-container {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-top: 20px;
}

.concentracion-table {
  width: 100%;
  margin-bottom: 20px;
}

.high-concentration {
  color: #f44336;
  font-weight: bold;
}

.chart-section {
  margin-top: 30px;
  text-align: center;
}
```

## Integración con el Backend

Este componente se conecta con el controlador `RiskConcentracionDeudoresController.php` para obtener los datos de concentración de deudores.

### Endpoints Utilizados
- `GET /api/concentracion-deudores`: Obtiene la lista de deudores con su concentración
- `GET /api/concentracion-deudores/{id}`: Obtiene el detalle de un deudor específico
- `POST /api/concentracion-deudores/export`: Exporta los datos en formato Excel/PDF

## Consideraciones de Seguridad

- Validación de permisos de usuario antes de mostrar datos sensibles
- Sanitización de inputs para prevenir ataques XSS
- Implementación de rate limiting en las consultas