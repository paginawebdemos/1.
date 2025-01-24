import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

const addDishForm = document.getElementById("add-dish-form");
const menuList = document.getElementById("menu-list");
const dishPriceInput = document.getElementById("dish-price");

// Subir imagen a Cloudinary
async function uploadToCloudinary(file) {
    const url = `https://api.cloudinary.com/v1_1/dmlex134e/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        return data.secure_url; // Devuelve la URL segura de la imagen cargada
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
}

// Agregar un nuevo plato (solo para administración)
async function addDish(name, category, price, img, description) {
    await addDoc(collection(db, "menu"), {
        name: name,
        category: category,
        price: `$${price}`, // Asegurarse de que el precio tenga el símbolo de dólar
        img: img,
        description: description
    });
    loadMenu(); // Recargar la lista después de agregar el plato
}

window.deleteDish = async function (id) {
    await deleteDoc(doc(db, "menu", id));
    loadMenu(); // Recargar el menú después de eliminar
};

// Mostrar los platos en el panel de administración
async function loadMenu() {
    const querySnapshot = await getDocs(collection(db, "menu"));
    menuList.innerHTML = ''; // Limpiar la lista antes de mostrarla

    querySnapshot.forEach((doc) => {
        const dish = doc.data();
        const dishDiv = document.createElement("div");
        dishDiv.classList.add("dish-card"); // Se cambió de menu-item a dish-card
        dishDiv.innerHTML = `
            <img src="${dish.img}" alt="${dish.name}" width="100">
            <h5>${dish.name}</h5>
            <p><strong>Precio:</strong> ${dish.price}</p>
            <p><strong>Categoría:</strong> ${dish.category}</p>
            <p><strong>Descripción:</strong> ${dish.description}</p>
            <button onclick="deleteDish('${doc.id}')">Eliminar</button>
        `;
        menuList.appendChild(dishDiv);
    });
}

// Formatear precio con símbolo de dólar automáticamente
dishPriceInput.addEventListener("blur", () => {
    if (dishPriceInput.value && !dishPriceInput.value.startsWith("$")) {
        dishPriceInput.value = `$${dishPriceInput.value.trim()}`;
    }
});

// Enviar el formulario de agregar plato
addDishForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("dish-name").value;
    const category = document.getElementById("dish-category").value;
    const price = dishPriceInput.value.replace("$", "").trim(); // Eliminar el símbolo de dólar antes de guardar
    const fileInput = document.getElementById("dish-img-upload");
    const description = document.getElementById("dish-description").value;

    const file = fileInput.files[0];
    if (!file) {
        alert("Por favor, selecciona una imagen para el plato.");
        return;
    }

    try {
        const imgURL = await uploadToCloudinary(file);
        await addDish(name, category, price, imgURL, description);
        addDishForm.reset(); // Limpia el formulario después de enviar
        alert("Plato agregado correctamente.");
    } catch (error) {
        alert("Error al agregar el plato. Inténtalo nuevamente.");
    }
});

// Cargar los platos iniciales
loadMenu();

loadMenu();
// Cargar los platos iniciales
loadMenu();

loadMenu();