import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Inicializa Firebase Authentication
const auth = getAuth();

// Verifica el estado de autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Si el usuario no está autenticado, redirige al login
    window.location.href = "login.html";
  }
});