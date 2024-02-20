// Define price adaptations for each glazing option.
const glazingOptions = {
  "Keep original": 0.0,
  "Sugar milk": 0.0,
  "Vanilla milk": 0.5,
  "Double chocolate": 1.5,
};

// Define price multipliers for each pack size option.
const packSizeOptions = {
  1: 1,
  3: 3,
  6: 5,
  12: 10,
};

//update and compute price
function updatePrice(glazing, packSize) {
  const basePrice = info.basePrice;
  const glazingPrice = glazingOptions[glazing];
  const packMultiplier = packSizeOptions[packSize];
  const newPrice = (basePrice + glazingPrice) * packMultiplier;
  document.getElementById("price").textContent = `$${newPrice.toFixed(2)}`;
}

//update glazing
function glazingChange(element) {
  const glazing = element.value;
  const packSizeSelect = document.getElementById("packsizeOptions");
  const packSize = packSizeSelect.value;

  updatePrice(glazing, packSize); // Calls updatePrice with the new pack size.
}

//update packsize
function packSizeChange(element) {
  const packSize = element.value;
  const glazingSelect = document.getElementById("glazingOptions");
  const glazing = glazingSelect.value;

  updatePrice(glazing, packSize);
}

//populate dropdown
function populateDropdown(selectElementId, options) {
  const selectElement = document.getElementById(selectElementId);
  const optionNames = Object.keys(options);
  for (let i = 0; i < optionNames.length; i++) {
    let optionName = optionNames[i];
    let option = document.createElement("option");
    option.value = optionName;
    option.textContent = optionName;
    selectElement.appendChild(option);
  }
}

//
document.addEventListener("DOMContentLoaded", function () {
  populateDropdown("glazingOptions", glazingOptions);
  populateDropdown("packsizeOptions", packSizeOptions);
  updatePrice("Keep original", "1");
});

// Retrieve the roll type from the URL parameters and update the page content
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");
console.log(rollType);
const headerElement = document.querySelector(".heading");
headerElement.innerText = rollType + " cinnamon roll";
const info = rolls[rollType];
const cinnamonImage = document.querySelector(".detailpic");
cinnamonImage.src = "../assets/products/" + info.imageFile;

// Define the Roll class for creating objects
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }
}
//create empty cart array
let cart = [];

// Add event listener for the "Add to Cart" button.
document.getElementById("addtocart").addEventListener("click", addToCart);

function addToCart() {
  const rollType = params.get("roll");
  const glazingSelect = document.getElementById("glazingOptions");
  const rollGlazing = glazingSelect.value;
  const packSizeSelect = document.getElementById("packsizeOptions");
  const packSize = packSizeSelect.value;
  const basePrice = info.basePrice;

  // Create a new Roll object with the current selections
  const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);

  // Add the new Roll object to the cart array.
  cart.push(newRoll);

  console.log(cart);
}
