const productos = [
    { id: 1, nombre: "Short lycra Aura", precio: 13200, imagenes: ["img/shortlycra.png", "img/shortlycradetalles.png"], tela: "Lycra costura reforzada. Desliza para más info", talles: ["2", "3", "4"] },
    { id: 2, nombre: "Catsuit Hero", precio: 21800, imagenes: ["img/catsuit.png", "img/catsuitdetalles.png"], tela: "lycra.Desliza para más info", talles: ["S", "L"] },
    { id: 3, nombre: "Calza Recta Linear", precio: 17690, imagenes: ["img/calzarectalinear.png", "img/calzarectalineardetalles.png"], tela: "lycra costura reforzada.Desliza para más info", talles: ["2", "3","4"] },
    { id: 4, nombre: "Buzo Reset Beige", precio: 17589, imagenes: ["img/buzoresetbeige.png", "img/buzoresetdetalles.png"], tela: "Lanilla soft.Desliza para más info", talles: [3] },
    { id: 5, nombre: "Térmica black", precio: 14868, imagenes: ["img/termicablack.png", "img/termicadetalles.png"], tela: "algodón.Desliza para más info", talles: ["2"] },
    { id: 6, nombre: "Buzo Reset Black", precio: 17589, imagenes: ["img/buzoresetblack.png", "img/buzoresetdetalles.png"], tela: "Lanilla soft.Desliza para más info", talles: ["3"] },
    { id: 7, nombre: "Palazzo Nan", precio: 26320, imagenes: ["img/pantalonNan.png", "img/pantalonNandetalles.png"], tela: "Algodón frizado.Desliza para más info", talles: ["L"] },
    { id: 8, nombre: "Short Pollera Pulse", precio: 17569, imagenes: ["img/shortpollerapulse.png", "img/shortpolleradetalles.png"], tela: "Lycra costura reforzada.Desliza para más info", talles: ["1", "2"] },
    { id: 9, nombre: "Top Ju", precio: 13248, imagenes: ["img/topJu.png", "img/topJudetalles.png"], tela: "Lycra.Desliza para más info", talles: ["1", "5"] },
    { id: 10, nombre: "Top Aura", precio: 12520, imagenes: ["img/topaura.png", "img/topauaradetalles.png"], tela: "Lycra costura reforzada.Desliza para más info", talles: ["1", "2", "3","4", "5"] },
    { id: 11, nombre: "Top Core", precio: 12780, imagenes: ["img/topcore.png", "img/topcoredetalles.png"], tela: "Lycra.Desliza para más info", talles: ["2",] },
    { id: 12, nombre: "Polera Bruma", precio: 13520, imagenes: ["img/polerablancabruma.png", "img/polerablancadetalles.png"], tela: "Algodón.Desliza para más info", talles: ["talle único"] },
    { id: 13, nombre: "Polera Unit", precio: 13520, imagenes: ["img/poleragrisunit.png", "img/poleragrisunitdetalles.png"], tela: "Algodón.Desliza para más info", talles: ["talle único"] },
    { id: 14, nombre: "Palazzo storm", precio: 17560, imagenes: ["img/palazzostorm.png", "img/palazzostormdetalles.png"], tela: "Waffle frizado.Desliza para más info", talles: ["talle único"] },
    { id: 15, nombre: "Pantalón c/puño White", precio: 26320, imagenes: ["img/pantalonpuñowhite.png", "img/pantalonpuñodetalles.png"], tela: "Rustico frizado.Desliza para más info", talles: ["único"] },
    { id: 16, nombre: "Top sand", precio: 13800, imagenes: ["img/topsand.png", "img/topsanddetalles.png"], tela: "Modal y algodón.Desliza para más info", talles: ["único"] },
    { id: 17, nombre: "Manga corta ink", precio: 13520, imagenes: ["img/mangacortaink.png", "img/mangacortainkdetalles.png"], tela: "Modal y algodón.Desliza para más info", talles: ["talle único"] },
    { id: 18, nombre: "Manga corta nude", precio: 13520, imagenes: ["img/mangacortanude.png", "img/mangacortanudedetalles.png"], tela: "Modal y algodón.Desliza para más info", talles: ["talle único"] }
];

let carrito = [];
let talleSeleccionado = "";
function cargarProductos() {
    const grid = document.getElementById('productos-grid');
    if (!grid) return;
    grid.innerHTML = productos.map(prod => `
        <div class="tarjeta">
            <img src="${prod.imagenes[0]}" onclick="verDetalle(${prod.id})" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio.toLocaleString('es-AR')}</p>
            <button onclick="verDetalle(${prod.id})" class="btn-ver">VER DETALLES</button>
        </div>
    `).join('');
}

function verDetalle(id) {
    const prod = productos.find(p => p.id === id);
    const detalleInfo = document.getElementById('detalle-info');
    talleSeleccionado = "";

    detalleInfo.innerHTML = `
        <div class="detalle-flex">
            <div class="galeria-detalles">
                ${prod.imagenes.map(img => `<img src="${img}" class="img-galeria">`).join('')}
            </div>
            <h2 style="text-transform:uppercase;">${prod.nombre}</h2>
            <p style="font-size:12px; color:#666;"><strong>TELA:</strong> ${prod.tela}</p>
            <p style="font-size:18px; font-weight:bold;">$${prod.precio.toLocaleString('es-AR')}</p>
            <div class="talles-container">
                ${prod.talles.map(t => `<button class="talle-btn" onclick="seleccionarTalle(this, '${t}')">${t}</button>`).join('')}
            </div>
            <button class="btn-confirmar" onclick="confirmarAgregar(${prod.id})">AGREGAR AL CARRITO</button>
        </div>
    `;
    abrirModal('detalle');
}

function seleccionarTalle(btn, talle) {
    document.querySelectorAll('.talle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    talleSeleccionado = talle;
}

function confirmarAgregar(id) {
    if (!talleSeleccionado) return alert("Por favor, selecciona un talle.");
    const prod = productos.find(p => p.id === id);
    
    carrito.push({
        nombre: prod.nombre,
        precio: Number(prod.precio),
        talle: talleSeleccionado
    });

    actualizarCarrito();
    cerrarModal('modal-detalle');
    abrirModal('carrito');
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalTxt = document.getElementById('total-precio');
    const contador = document.getElementById('contador-carrito');

    if (!lista) return;

    lista.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<li style="text-align:center; padding:10px;">Tu carrito está vacío.</li>';
        totalTxt.innerText = '0';
        contador.innerText = '0';
        return;
    }

    carrito.forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `
            <li style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
                <div>
                    <p style="margin:0; font-weight:bold; font-size:14px;">${item.nombre}</p>
                    <p style="margin:0; font-size:12px; color:#666;">Talle: ${item.talle}</p>
                </div>
                <div style="text-align:right;">
                    <p style="margin:0; font-weight:bold;">$${item.precio.toLocaleString('es-AR')}</p>
                    <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:12px;">Quitar</button>
                </div>
            </li>
        `;
    });

    totalTxt.innerText = total.toLocaleString('es-AR');
    contador.innerText = carrito.length;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    if(confirm("¿Vaciar todo el carrito?")) {
        carrito = [];
        actualizarCarrito();
    }
}

function abrirModal(tipo) {
    const m = document.getElementById('modal-' + tipo);
    if(m) m.style.display = 'block';
}

function cerrarModal(id) {
    const m = document.getElementById(id);
    if(m) m.style.display = 'none';
}

function finalizarCompra() {
    if (carrito.length === 0) return alert("El carrito está vacío");
    const texto = carrito.map(p => `- ${p.nombre} (Talle ${p.talle})`).join('%0A');
    const total = carrito.reduce((s, p) => s + p.precio, 0);
    window.location.href(`https://wa.me/543388411810?text=Hola! Quiero realizar un pedido:%0A${texto}%0A%0ATOTAL: $${total}`);
}

window.onclick = (e) => { if (e.target.className === 'modal') e.target.style.display = "none"; }
window.onload = cargarProductos;
