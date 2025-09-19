# Concentración de Deudores - Backend

## Descripción

Controlador PHP responsable de gestionar la lógica de negocio para el análisis de concentración de deudores en el sistema SARC.

## Archivo: RiskConcentracionDeudoresController.php

```php
<?php

namespace App\Http\Controllers\Risk;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Risk\ConcentracionDeudoresService;

class RiskConcentracionDeudoresController extends Controller
{
    protected $concentracionService;

    public function __construct(ConcentracionDeudoresService $concentracionService)
    {
        $this->concentracionService = $concentracionService;
    }

    /**
     * Obtiene la lista de deudores con su concentración
     */
    public function index(Request $request)
    {
        $filtros = $request->validate([
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'limite_concentracion' => 'numeric|min:0|max:100'
        ]);

        $deudores = $this->concentracionService->obtenerConcentracion($filtros);
        
        return response()->json([
            'success' => true,
            'data' => $deudores,
            'total' => count($deudores)
        ]);
    }

    /**
     * Obtiene el detalle de un deudor específico
     */
    public function show($id)
    {
        $detalle = $this->concentracionService->obtenerDetalleDeudor($id);
        
        if (!$detalle) {
            return response()->json([
                'success' => false,
                'message' => 'Deudor no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $detalle
        ]);
    }

    /**
     * Exporta los datos de concentración
     */
    public function export(Request $request)
    {
        $formato = $request->input('formato', 'excel');
        $filtros = $request->all();

        $archivo = $this->concentracionService->exportarDatos($filtros, $formato);

        return response()->download($archivo);
    }
}
```

## Endpoints

### GET /api/concentracion-deudores
Obtiene la lista de deudores con su concentración.

**Parámetros:**
- `fecha_inicio` (required): Fecha de inicio del período
- `fecha_fin` (required): Fecha de fin del período  
- `limite_concentracion` (optional): Límite de concentración para filtrar

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombreDeudor": "Juan Pérez",
      "identificacion": "12345678",
      "saldo": 50000000,
      "porcentaje": 0.15
    }
  ],
  "total": 1
}
```

### GET /api/concentracion-deudores/{id}
Obtiene el detalle de un deudor específico.

### POST /api/concentracion-deudores/export
Exporta los datos en formato Excel o PDF.