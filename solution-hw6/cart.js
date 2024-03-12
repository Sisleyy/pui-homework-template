const glazingOptions = {
  "Keep original": 0.0,
  "Sugar milk": 0.0,
  "Vanilla milk": 0.5,
  "Double chocolate": 1.5,
};

const packSizeOptions = {
  1: 1,
  3: 3,
  6: 5,
  12: 10,
};

class Roll {
  constructor(rollType, rollGlazing, packSize, rollPrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = rollPrice;
  }

  calculatePrice() {
    const glazingPrice = glazingOptions[this.glazing];
    const packMultiplier = packSizeOptions[this.size];
    return (this.basePrice + glazingPrice) * packMultiplier;
  }
}

// Retrieve cart data from local storage and initialize or update cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart = cart.map(
  (item) => new Roll(item.type, item.glazing, item.size, item.basePrice)
);
const template = document.getElementById("cart-item-template");
const cartGrid = document.querySelector(".cartgrid");

function populateCart() {
  cartGrid.innerHTML = ""; // Clear the cart grid before repopulating
  if (!cartGrid || !template) {
    console.error("Required elements not found.");
    return;
  }
  // Clone the template content
  cart.forEach((roll, index) => {
    const clone = document.importNode(template.content, true);
    clone.querySelector(".product-pic img").src = `../assets/products/${roll.type.toLowerCase().replace(/\s+/g, "-")}-cinnamon-roll.jpg`;
    clone.querySelector(".product-description p:nth-child(1)").textContent = `${roll.type} Cinnamon Roll`;
    clone.querySelector(".product-description p:nth-child(2)").textContent = `Glazing: ${roll.glazing}`;
    clone.querySelector(".product-description p:nth-child(3)").textContent = `Pack Size: ${roll.size}`;
    clone.querySelector(".product-price p").textContent = `$${roll.calculatePrice().toFixed(2)}`;

    // Set a data attribute on the cart item for the index
    const cartItem = clone.querySelector(".cart-item");
    cartItem.setAttribute("data-index", index);

    // Add remove button event listener
    const removeButton = clone.querySelector(".remove-item");
    removeButton.addEventListener("click", function () {
      removeItemFromCart(index);
    });

    cartGrid.appendChild(clone);
  });

  updateTotalPrice();
  updateCartNumber();
}

// Remove an item from the cart based on its index in the cart array
function removeItemFromCart(indexToRemove) {
  cart.splice(indexToRemove, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
  populateCart(); // Repopulate the cart with updated data
  updateTotalPrice();
  updateCartNumber();
}

function updateTotalPrice() {
  const totalPriceElement = document.getElementById("price");
  const totalPrice = cart.reduce(
    (total, roll) => total + roll.calculatePrice(),
    0
  );
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function updateCartNumber() {
  const cartNumberElement = document.querySelector(".cart-number");
  cartNumberElement.textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", () => {
  populateCart();
});
