// Importaciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCPnadysSxHbqJVmmoJ6xYQMZn4dtMgD8wg",
    authDomain: "noguerabeauti.firebaseapp.com",
    projectId: "noguerabeauti",
    storageBucket: "noguerabeauti.appspot.com",
    messagingSenderId: "310766282869",
    appId: "1:310766282869:web:ZDI5MWJIMltZDBiOS00MTRhLTM0MdkTMAYTMzOTBiZTIw"
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            // ESTO BLOQUEA CUALQUIER REDIRECCIÓN
            e.preventDefault(); 
            
            // Cambiamos el texto del botón mientras se guarda
            const btnSubmit = form.querySelector('.btn-submit');
            const textoOriginal = btnSubmit.textContent;
            btnSubmit.textContent = "Enviando...";
            btnSubmit.disabled = true;
            
            try {
                // Guarda en la base de datos "citas"
                await addDoc(collection(db, "citas"), {
                    nombre: document.getElementById('nombre').value,
                    telefono: document.getElementById('telefono').value,
                    tratamiento: document.getElementById('servicio').value,
                    comentarios: document.getElementById('mensaje').value,
                    estado: "pendiente",
                    timestamp: serverTimestamp()
                });

                // MUESTRA EL MENSAJE DE ÉXITO AL CLIENTE
                alert("¡Tu agenda fue recibida exitosamente! Nos pondremos en contacto contigo.");
                
                // Limpia el formulario
                form.reset();

            } catch (error) {
                console.error("Error al guardar: ", error);
                alert("Hubo un error de conexión, por favor intenta de nuevo.");
            } finally {
                // Restaura el botón
                btnSubmit.textContent = textoOriginal;
                btnSubmit.disabled = false;
            }
        });
    }
});