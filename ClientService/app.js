// Importaciones de Firebase (Única vez)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "Tus_datos_de_la_pantalla",
    authDomain: "noguerabeauti.firebaseapp.com",
    projectId: "noguerabeauti",
    storageBucket: "noguerabeautistorage.app",
    messagingSenderId: "310766282869",
    appId: "1:310766282869:web:8ed911aea7e3792026f03c"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


window.enviarFormulario = async function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const servicioSelect = document.getElementById('servicio');
    const servicioTexto = servicioSelect ? servicioSelect.options[servicioSelect.selectedIndex].text : "Tratamiento General";
    const mensaje = document.getElementById('mensaje').value;
    const botonSubmit = document.querySelector('.btn-submit');

    try {
        if (botonSubmit) {
            botonSubmit.disabled = true;
            botonSubmit.textContent = "Enviando solicitud...";
        }


        await addDoc(collection(db, "citas"), {
            nombre: nombre,
            telefono: telefono,
            servicio: servicioTexto,
            mensaje: mensaje,
            fechaCreacion: serverTimestamp(),
            estado: "Pendiente"
        });

        alert("¡Cita solicitada con éxito! Nos pondremos en contacto contigo pronto.");
        document.querySelector('.contact-form').reset();

    } catch (error) {
        console.error("Error al guardar la cita: ", error);
        alert("Hubo un error al enviar tu solicitud. Revisa la consola.");
    } finally {
        if (botonSubmit) {
            botonSubmit.disabled = false;
            botonSubmit.textContent = "Solicitar Cita";
        }
    }
};


const cuerpoTabla = document.getElementById('cuerpoTabla');

if (cuerpoTabla) {
    const q = query(collection(db, "citas"), orderBy("fechaCreacion", "desc"));

    onSnapshot(q, (snapshot) => {
        cuerpoTabla.innerHTML = ""; 
        
        if (snapshot.empty) {
            cuerpoTabla.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px; color: #7f8c8d;">No hay citas registradas todavía.</td></tr>`;
            return;
        }

        snapshot.forEach((doc) => {
            const cita = doc.data();
            const fila = `
                <tr style="border-bottom: 1px solid #ecf0f1;">
                    <td style="padding: 12px;">${cita.nombre}</td>
                    <td style="padding: 12px;"><a href="https://wa.me/52${cita.telefono ? cita.telefono.replace(/\D/g,'') : ''}" target="_blank" style="color: #27ae60; text-decoration: none; font-weight: bold;">${cita.telefono}</a></td>
                    <td style="padding: 12px;">${cita.servicio}</td>
                    <td style="padding: 12px;">${cita.mensaje || 'Sin comentarios'}</td>
                </tr>
            `;
            cuerpoTabla.innerHTML += fila;
        });
    });
}