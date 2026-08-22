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

console.log("¡El script de Firebase está conectado correctamente!");

// Esperamos a que todo cargue para evitar fallos
window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('bookingForm');
    
    if (!form) {
        console.error("¡ERROR! No se encontró el formulario con id 'bookingForm'");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Formulario interceptado, intentando guardar...");

        const btnSubmit = form.querySelector('.btn-submit');
        const textoOriginal = btnSubmit.textContent;
        btnSubmit.textContent = "Guardando...";
        btnSubmit.disabled = true;

        try {
            await addDoc(collection(db, "citas"), {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                tratamiento: document.getElementById('servicio').value,
                comentarios: document.getElementById('mensaje').value,
                estado: "pendiente",
                timestamp: serverTimestamp()
            });

            alert("¡Tu agenda fue recibida exitosamente! Nos pondremos en contacto contigo.");
            form.reset();
        } catch (error) {
            console.error("Error crítico al guardar:", error);
            alert("Hubo un error al guardar. Revisa la consola (F12).");
        } finally {
            btnSubmit.textContent = textoOriginal;
            btnSubmit.disabled = false;
        }
    });
});