import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Función para calcular el puntaje base y aplicar penalizaciones
function calcularPuntaje(datos) {
  let puntaje = 100; // Comenzamos con puntaje perfecto

  // Penalizaciones por tipo de construcción
  if (datos.tipoConstruccion === 'antigua') {
    puntaje -= 20;
  }

  // Penalizaciones por aislación
  if (datos.aislacion === 'mala') {
    puntaje -= 30;
  }

  // Penalizaciones por tipo de ventanas
  if (datos.ventanas === 'simples') {
    puntaje -= 20;
  }

  // Penalizaciones por orientación
  if (datos.orientacion === 'sur') {
    puntaje -= 10;
  }

  return puntaje;
}

// Función para determinar la etiqueta según el puntaje
function determinarEtiqueta(puntaje) {
  if (puntaje > 80) return 'A';
  if (puntaje > 60) return 'B';
  if (puntaje > 40) return 'C';
  return 'D';
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Ruta principal para el cálculo de eficiencia
app.post('/render', (req, res) => {
  const { superficie, tipoConstruccion, orientacion, aislacion, ventanas } = req.body;

  // Verificar que todos los campos requeridos estén presentes
  if (!superficie || !tipoConstruccion || !orientacion || !aislacion || !ventanas) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos' 
    });
  }

  // Calcular puntaje
  const puntaje = calcularPuntaje({
    tipoConstruccion,
    orientacion,
    aislacion,
    ventanas
  });

  // Determinar etiqueta
  const etiqueta = determinarEtiqueta(puntaje);

  // Enviar respuesta
  res.json({
    etiqueta,
    puntaje
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 