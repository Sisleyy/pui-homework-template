// Assuming rollsData.js is structured correctly and included before this script

// Define price adaptations for each glazing option
const glazingOptions = {
  "Keep original": 0.0,
  "Sugar milk": 0.0,
  "Vanilla milk": 0.5,
  "Double chocolate": 1.5,
};

// Define price multipliers for each pack size option
const packSizeOptions = {
  1: 1,
  3: 3,
  6: 5,
  12: 10,
};

// Initialize or retrieve cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener("DOMContentLoaded", function () {
  // Attempt to retrieve the cart from local storage
  populateDropdown("glazingOptions", glazingOptions);
  populateDropdown("packsizeOptions", packSizeOptions);
  updateCartNumber();
  updatePageContent();
});

function updatePageContent() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const rollType = params.get("roll");
  
  if (!rolls[rollType]) {
    console.error("Roll type is not found.");
    return;
  }

  const info = rolls[rollType];
  const headerElement = document.querySelector(".heading");
  const cinnamonImage = document.querySelector(".detailpic");

  headerElement.innerText = `${rollType} cinnamon roll`;
  cinnamonImage.src = "../assets/products/" + info.imageFile;
  updatePrice("Keep original", 1); // Default selections
}

function updatePrice(glazing, packSize) {
  const rollType = new URLSearchParams(window.location.search).get("roll");
  const info = rolls[rollType];
  const basePrice = info.basePrice;
  const glazingPrice = glazingOptions[glazing];
  const packMultiplier = packSizeOptions[packSize];
  const newPrice = (basePrice + glazingPrice) * packMultiplier;
  document.getElementById("price").textContent = `$${newPrice.toFixed(2)}`;
}

function populateDropdown(selectElementId, options) {
  const selectElement = document.getElementById(selectElementId);
  for (const optionName in options) {
    let option = document.createElement("option");
    option.value = optionName;
    option.textContent = optionName;
    selectElement.appendChild(option);
  }
}

// Use the corrected Roll class as per your requirement



document.getElementById("addtocart").addEventListener("click", function() {
  const rollType = new URLSearchParams(window.location.search).get("roll");
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("packsizeOptions");
  const newRoll = new Roll(rollType, glazingSelect.value, packSizeSelect.value, rolls[rollType].basePrice);
  
  cart.push(newRoll);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  updateCartNumber();
  console.log('Cart:', cart);
});

function updateCartNumber() {
  const cartNumberElement = document.querySelector('.cart-number');
  cartNumberElement.textContent = cart.length;
}

// Corrected Roll class definition to match requirement
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}
