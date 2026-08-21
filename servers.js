const express = require('express');
const app = express();
const PORT = 3000;

// Esto le enseña a tu servidor a leer datos en formato JSON
app.use(express.json());

// Una "base de datos" temporal en la memoria RAM para guardar posts de prueba
let publicaciones = [];

// Ruta 1: Ver si el servidor responde (GET)
app.get('/', (req, res) => {
    res.send('¡Hola! El servidor backend de Miiverse está activo.');
});

// Ruta 2: Recibir una publicación nueva (POST)
app.post('/api/posts', (req, res) => {
    const textoDelPost = req.body.contenido;

    if (!textoDelPost) {
        return res.status(400).json({ error: 'El post viene vacío' });
    }

    // Guardamos el post en nuestra lista en memoria
    const nuevo = { id: publicaciones.length + 1, contenido: textoDelPost, fecha: new Date() };
    publicaciones.unshift(nuevo);

    console.log(`[¡EXITO!] Post recibido desde la consola/web: "${textoDelPost}"`);

    res.json({ success: true, guardado: nuevo });
});

// Ruta 3: Ver todos los posts guardados (GET)
app.get('/api/posts', (req, res) => {
    res.json(publicaciones);
});

// Encender el servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});