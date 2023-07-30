// Obtener referencias a elementos del DOM
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

// Evento para mostrar/ocultar el carrito al hacer clic en el ícono del carrito
btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

// Obtener referencias a elementos del DOM
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items'); // Lista de todos los contenedores de productos
let allProducts = []; // Variable de arreglo para almacenar los productos en el carrito

// Referencias a elementos del DOM relacionados con el carrito
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Evento para agregar productos al carrito al hacer clic en el botón "Agregar al carrito"
productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		// Obtener información del producto desde el elemento padre del botón
		const product = e.target.parentElement;
		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		// Verificar si el producto ya existe en el carrito
		const exists = allProducts.some(product => product.title === infoProduct.title);

		// Si el producto ya existe, aumentar la cantidad, de lo contrario, agregarlo al arreglo de productos del carrito
		if (exists) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		// Mostrar la información actualizada en el carrito
		showHTML();
	}
});

// Evento para eliminar un producto del carrito al hacer clic en el ícono de "cerrar"
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		// Filtrar el producto a eliminar del arreglo de productos del carrito
		allProducts = allProducts.filter(product => product.title !== title);

		showHTML();
	}
});

// Función para mostrar el contenido del carrito en el DOM
const showHTML = () => {
	if (!allProducts.length) {
		// Si no hay productos en el carrito, mostrar el mensaje de carrito vacío y ocultar otras secciones
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		// Si hay productos en el carrito, mostrar el carrito y los detalles de compra
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar el contenido HTML del elemento donde se muestra el carrito
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		// Crear elementos HTML para mostrar los productos en el carrito
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		// Calcular el total a pagar y la cantidad total de productos en el carrito
		total = total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	// Mostrar el total a pagar y la cantidad total de productos en el carrito
	valorTotal.innerText = `Q${total}`;
	countProducts.innerText = totalOfProducts;
};

