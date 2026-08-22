import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCPnadysSxHbqJVmmoJ6xYQMZn4dtMgD8wg",
    authDomain: "noguerabeauti.firebaseapp.com",
    projectId: "noguerabeauti",
    storageBucket: "noguerabeauti.appspot.com",
    messagingSenderId: "310766282869",
    appId: "1:310766282869:web:..." // Asegúrate de poner tu appId completo de NogueraBeauti
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const tratamiento = document.getElementById('tratamiento').value;
            
            try {
                await addDoc(collection(db, "citas"), {
                    nombre, telefono, tratamiento,
                    fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    timestamp: serverTimestamp()
                });
                alert("¡Cita enviada con éxito!");
                form.reset();
            } catch (error) {
                console.error("Error al guardar: ", error);
                alert("Hubo un error al enviar.");
            }
        });
    }
});