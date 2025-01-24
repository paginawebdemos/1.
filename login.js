import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCk5ewxEc66qZ_z2twDZxuy7IiCsZxw0fI",
  authDomain: "iniciar-976bb.firebaseapp.com",
  projectId: "iniciar-976bb",
  storageBucket: "iniciar-976bb.firebasestorage.app",
  messagingSenderId: "197984073992",
  appId: "1:197984073992:web:b595961df52cd60f0494bd"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Establecer persistencia LOCAL para que la sesión persista después de la recarga
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Selecciona el formulario y elementos
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    // Función para iniciar sesión
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value;
      const password = passwordInput.value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Si el login es exitoso, redirige al administrador
          window.location.href = "admin.html";
        })
        .catch((error) => {
          // Muestra el mensaje de error si la autenticación falla
          errorMessage.style.display = "block";
        });
    });
  })
  .catch((error) => {
    console.error("Error al establecer persistencia:", error);
  });
