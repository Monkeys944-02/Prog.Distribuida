const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const IP = "192.168.56.1";
const PUBLIC_DIR = path.join(__dirname, 'public'); // Carpeta donde guardas tus archivos estáticos

// Crear el servidor
http.createServer((req, res) => {
    // Si la solicitud es para un archivo CSS u otro archivo estático
    if (req.url.startsWith('/styles.css')) {
        const cssPath = path.join(PUBLIC_DIR, 'styles.css');
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar el archivo CSS');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    }
    // Si la solicitud es para la página principal
    else if (req.url === '/') {
        const htmlPath = path.join(PUBLIC_DIR, 'index.html');
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar la página');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        // Si la solicitud es a una ruta no definida
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Archivo no encontrado');
    }
}).listen(PORT, IP, () => {
    console.log(`Servidor corriendo en http://${IP}:${PORT}`);
});