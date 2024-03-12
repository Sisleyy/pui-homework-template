
// Function to append a cart item to the page
function appendCartItemToPage(roll, index) {
    const cartGrid = document.querySelector('.cartgrid');
    const template = document.getElementById('cart-item-template').content;
    console.log('Template:', template);

    // Clone template
    const cartItem = template.cloneNode(true);
    cartItem.querySelector('.cart-item').setAttribute('data-index', index); // Set data-index attribute

    // Populate cart item details
    cartItem.querySelector('.product-pic img').src = `../assets/products/${roll.type.toLowerCase().replace(' ', '-')}-cinnamon-roll.jpg`;
    cartItem.querySelector('.product-description p:nth-child(1)').textContent = `${roll.type} Cinnamon Roll`; // Display the full name
    cartItem.querySelector('.product-description p:nth-child(2)').textContent = `Glazing: ${roll.glazing}`;
    cartItem.querySelector('.product-description p:nth-child(3)').textContent = `Pack Size: ${roll.packSize}`;
    cartItem.querySelector('.product-price p').textContent = `$${roll.calculatePrice().toFixed(2)}`;

    // Add remove button event listener
    cartItem.querySelector('.remove-item').addEventListener('click', () => {
        removeItemFromCart(roll);
    });
    cartGrid.appendChild(cartItem);
}


// Function to remove an item from the cart
function removeItemFromCart(roll) {
    const index = cart.findIndex(item => item.type === roll.type && item.glazing === roll.glazing && item.packSize === roll.packSize && item.basePrice === roll.basePrice);
    if (index !== -1) {
        // Remove the roll from the cart
        cart.splice(index, 1);
        updateTotalPrice();
        // Remove the  item from the DOM
        const cartItem = document.querySelector(`.cart-item[data-index="${index}"]`);
        if (cartItem) {
            cartItem.remove();
        }
    }
}


// Display cart items
cart.forEach((roll, index) => {
    appendCartItemToPage(roll, index);
});

// Update total price
function updateTotalPrice() {
    const totalPrice = cart.reduce((total, roll) => total + roll.calculatePrice(), 0).toFixed(2);
    document.querySelector('#price').textContent = `$${totalPrice}`;
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded.');
    populateCart();
    updateCartNumber();
});