import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIe6_4rj47XgSWHFVGpk04qB7JgOJIhrI",
    authDomain: "luna-5a497.firebaseapp.com",
    projectId: "luna-5a497",
    storageBucket: "luna-5a497.firebasestorage.app",
    messagingSenderId: "915765095360",
    appId: "1:915765095360:web:689905fc5455bdbb76f625"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuSection = document.getElementById("menu");
const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementsByClassName("close")[0];  // Aquí guardamos el botón de cerrar
const searchBox = document.getElementById("search");
const categoryFilterSelect = document.getElementById("category-filter-select");

let menuItems = [];  // Array para guardar los platos

// Cargar platos desde Firestore
async function loadMenu() {
    const querySnapshot = await getDocs(collection(db, "menu"));
    menuItems = [];
    querySnapshot.forEach((doc) => {
        menuItems.push({ id: doc.id, ...doc.data() });
    });
    renderMenu(menuItems);
}

function renderMenu(items) {
    menuSection.innerHTML = "";  // Limpiar la sección del menú

    items.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Precio: <strong>${item.price}</strong></p>
            <button onclick="goToOrderPage('${item.id}')">Pedir</button>
            <button onclick="showDescription('${item.id}')">Leer más</button>
        `;
        menuSection.appendChild(menuItem);
    });

    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.style.display = "none";
}

window.goToOrderPage = function(id) {
    const selectedItem = menuItems.find(item => item.id === id);
    localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    window.location.href = "order.html";  // Redirigir a la página de pedidos
};

window.showDescription = function(id) {
    const item = menuItems.find(i => i.id === id);
    modalTitle.textContent = item.name;
    modalDescription.textContent = item.description;
    modalImg.src = item.img;
    document.getElementById("orderButton").onclick = () => goToOrderPage(id);
    modal.style.display = "block";
};

// Cerrar el modal cuando se haga clic en la "X"
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";  // Ocultar el modal
});

// Filtrar y buscar platos
function filterMenu() {
    const searchQuery = searchBox.value.toLowerCase();  
    const selectedCategory = categoryFilterSelect.value;  

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);  
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;  
        return matchesSearch && matchesCategory;
    });

    renderMenu(filteredItems);  
}

searchBox.addEventListener("input", filterMenu);   
categoryFilterSelect.addEventListener("change", filterMenu);   

loadMenu();  // Cargar los platos iniciales




document.addEventListener('DOMContentLoaded', function () {
     tsParticles.load("particles-js", {
         "particles": {
             "number": {
                 "value": 150,  // Aumentamos la cantidad de partículas
                 "density": {
                     "enable": true,
                     "value_area": 800
                 }
             },
             "color": {
                 "value": "#ffffff"  // Color blanco
             },
             "shape": {
                 "type": "circle",  // Forma circular
                 "stroke": {
                     "width": 0,
                     "color": "#ffffff"  // Sin borde
                 }
             },
             "opacity": {
                 "value": 0.6,  // Menos opacas para hacerlas más sutiles
                 "random": true,
                 "anim": {
                     "enable": true,
                     "speed": 2,  // Velocidad de la animación de opacidad
                     "opacity_min": 0.1
                 }
             },
             "size": {
                 "value": 2,  // Tamaño más pequeño para las partículas
                 "random": true,
                 "anim": {
                     "enable": true,
                     "speed": 5,  // Aumentamos la velocidad de crecimiento
                     "size_min": 0.5  // Tamaño mínimo de las partículas
                 }
             },
             "move": {
                 "enable": true,
                 "speed": 5,  // Aumentamos la velocidad de movimiento
                 "direction": "none",  // Movimiento aleatorio
                 "random": true,
                 "straight": false,
                 "out_mode": "out",
                 "bounce": false
             }
         }
     });
 });          