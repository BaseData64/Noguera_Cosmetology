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

// Buscamos el formulario directamente
const form = document.getElementById('bookingForm');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Detiene la recarga de la página

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
            console.error("Error al guardar en Firebase: ", error);
            alert("Hubo un error de conexión. Revisa la consola.");
        } finally {
            btnSubmit.textContent = textoOriginal;
            btnSubmit.disabled = false;
        }
    });
} else {
    console.error("No se encontró el ID 'bookingForm' en el HTML.");
}