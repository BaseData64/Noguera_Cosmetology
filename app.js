// Importaciones desde el CDN oficial de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Credenciales de tu proyecto NogueraBeauti
const firebaseConfig = {
    apiKey: "AIzaSyCPnadysSxHbqJVmmoJ6xYQMZn4dtMgD8wg",
    authDomain: "noguerabeauti.firebaseapp.com",
    projectId: "noguerabeauti",
    storageBucket: "noguerabeauti.appspot.com",
    messagingSenderId: "310766282869",
    appId: "1:310766282869:web:ZDI5MWJIMltZDBiOS00MTRhLTM0MdkTMAYTMzOTBiZTIw"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Esperar a que el HTML cargue por completo
document.addEventListener("DOMContentLoaded", () => {
    // Conectamos con el ID exacto de tu formulario
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            // ¡CRÍTICO! Esto evita que la página intente recargarse o redirigir
            e.preventDefault(); 
            
            // Recolectamos la información usando los IDs de tu HTML
            const nombreCliente = document.getElementById('nombre').value;
            const telefonoCliente = document.getElementById('telefono').value;
            const servicioSolicitado = document.getElementById('servicio').value;
            const comentariosAdicionales = document.getElementById('mensaje').value;
            
            try {
                // Enviamos los datos a la colección "citas" para tu panel de admin
                await addDoc(collection(db, "citas"), {
                    nombre: nombreCliente,
                    telefono: telefonoCliente,
                    tratamiento: servicioSolicitado,
                    comentarios: comentariosAdicionales,
                    estado: "pendiente", // Etiqueta útil para que la administres luego
                    fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    timestamp: serverTimestamp()
                });

                // Confirmación visual de éxito
                alert("¡Cita registrada con éxito en el sistema!");
                
                // Limpiamos el formulario para el siguiente cliente
                form.reset();

            } catch (error) {
                console.error("Error al guardar la cita en la base de datos: ", error);
                alert("Hubo un error al procesar la cita. Revisa tu conexión a internet.");
            }
        });
    }
});