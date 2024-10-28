const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkOutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCounter = document.getElementById('cart-count');
const addressInput = document.getElementById('address');
const addressWarning = document.getElementById('address-warn');
const dateSpan = document.getElementById("date-span")

let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener('click', function () {
    updateCartModal();
    cartModal.style.display = 'flex';
});

// Fechar o modal do carrinho clicando fora
cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Fechar o modal do carrinho pelo botão
closeModalBtn.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Pegando o nome e preço do produto clicado
menu.addEventListener('click', function (event) {
    let parentBtn = event.target.closest(".add-to-cart-btn");

    if (parentBtn) {
        const name = parentBtn.getAttribute("data-name");
        const price = parseFloat(parentBtn.getAttribute("data-price"));
        addToCart(name, price);
    };
});


// Função para adicionar no carrinho e atualizar ele
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        // Se o item já existe ele aumentará sua quantia
        existingItem.quantity += 1;

    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    };
    updateCartModal();
}


function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-6", "flex-col")
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-from-cart-btn" data-name="${item.name}">
                    remover
                </button>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
};

// Função para remover item do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    };
});

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        };
        cart.splice(index, 1);
        updateCartModal();
    };
};

addressInput.addEventListener("input", function(event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarning.classList.add("hidden")
    };
});

// Finalizar pedido
checkOutBtn.addEventListener("click", function() {

    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
        Toastify({
            text: "Sinto muito, o restaurante não está aberto no momento.",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        return;
    }
    
    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarning.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    };

// Enviar o pedido para a  API no whatsapp
    const cartItems = cart.map((item) => {
        return (
            `Nome: ${item.name} Quantidade: ${item.quantity} Preço: ${item.price} |`
        )
    }).join("");
    const message = encodeURIComponent(cartItems)
    const phone = "67991733123"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");

    cart = [];
    updateCartModal();
})

// Verificar se o horário do restaurante está aberto
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
};

const isOpen = checkRestaurantOpen();

if (isOpen) {
    dateSpan.classList.remove("bg-red-500");
    dateSpan.classList.add("bg-green-600");
}else{
    dateSpan.classList.remove("bg-green-600");
    dateSpan.classList.add("bg-red-500");
}