# API de Eficiencia Energética

API REST para calcular la eficiencia energética de edificaciones basada en diferentes parámetros.

## Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

## Instalación

```bash
npm install
```

## Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
PORT=3001
CORS_ORIGIN=https://tu-frontend.vercel.app
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm start
```

## Endpoints

### POST /render

Calcula la eficiencia energética basada en los parámetros proporcionados.

#### Request Body

```json
{
  "superficie": "100",
  "tipoConstruccion": "moderna",
  "orientacion": "norte",
  "aislacion": "alta",
  "ventanas": "doble"
}
```

#### Response

```json
{
  "etiqueta": "A",
  "puntaje": 85
}
```

### GET /health

Endpoint de verificación de salud del servicio.

#### Response

```json
{
  "status": "OK"
}
```

## Despliegue en Railway

1. Conecta tu repositorio con Railway
2. Railway detectará automáticamente el `Procfile`
3. Configura la variable de entorno `CORS_ORIGIN` con la URL de tu frontend

## Penalizaciones del Cálculo

- Construcción antigua: -20 puntos
- Mala aislación: -30 puntos
- Ventanas simples: -20 puntos
- Orientación sur: -10 puntos

## Etiquetas de Eficiencia

- A: > 80 puntos
- B: > 60 puntos
- C: > 40 puntos
- D: ≤ 40 puntos 