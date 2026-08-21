const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let publicaciones = [];


app.get('/', (req, res) => {
    res.send('¡Hola! El servidor backend de Miiverse está activo.');
});


app.post('/api/posts', (req, res) => {
    const textoDelPost = req.body.contenido;

    if (!textoDelPost) {
        return res.status(400).json({ error: 'El post viene vacío' });
    }

    
    const nuevo = { id: publicaciones.length + 1, contenido: textoDelPost, fecha: new Date() };
    publicaciones.unshift(nuevo);

    console.log(`[¡EXITO!] Post recibido desde la consola/web: "${textoDelPost}"`);

    res.json({ success: true, guardado: nuevo });
});


app.get('/api/posts', (req, res) => {
    res.json(publicaciones);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});