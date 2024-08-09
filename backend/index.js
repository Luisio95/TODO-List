import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js';

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500'  // Reemplaza con el dominio desde donde harás la solicitud
}));

app.use(express.json());
app.use('/api', authRouter);

app.listen(5000, () => console.log("🔥http://localhost:5000"));
