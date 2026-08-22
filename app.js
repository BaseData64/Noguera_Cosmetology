import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPnadysSxHbqJVmmoJ6xYQMZn4dtMgD8wg",
    authDomain: "noguerabeauti.firebaseapp.com",
    projectId: "noguerabeauti",
    storageBucket: "noguerabeauti.appspot.com",
    messagingSenderId: "310766282869",
    appId: "1:310766282869:web:ZDI5MWJIMltZDBiOS00MTRhLTM0MdkTMAYTMzOTBiZTIw"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    // Ahora sí encontrará el formulario gracias al nuevo ID
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Evita que la página se recargue
            
            // Capturamos los datos con los IDs correctos que están en tu HTML
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value;
            
            try {
                // 1. Guarda los datos en la base de datos de Firebase
                await addDoc(collection(db, "citas"), {
                    nombre: nombre,
                    telefono: telefono,
                    tratamiento: servicio,
                    comentarios: mensaje,
                    fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    timestamp: serverTimestamp()
                });

                // 2. Prepara y abre el mensaje de WhatsApp automáticamente
                const telefonoClienta = "523334000000"; // Pon aquí tu número
                const textoMensaje = `¡Hola! me llego tu solicitud de cita, podrias confirmarla?%0A%0A*Nombre:* ${nombre}%0A*Teléfono:* ${telefono}%0A*Tratamiento:* ${servicio}%0A*Comentarios:* ${mensaje}`;
                
                window.open(`https://wa.me/${telefonoClienta}?text=${textoMensaje}`, '_blank');

                // 3. Limpia el formulario
                form.reset();

            } catch (error) {
                console.error("Error al guardar la cita: ", error);
                alert("Hubo un error al procesar la cita. Revisa tu conexión.");
            }
        });
    }
});