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

function updatePrice(glazing, packSize) {
  const basePrice = info.basePrice;
  const glazingPrice = glazingOptions[glazing];
  const packMultiplier = packSizeOptions[packSize];
  const newPrice = (basePrice + glazingPrice) * packMultiplier;
  document.getElementById("price").textContent = `$${newPrice.toFixed(2)}`;
}

function glazingChange(element) {
  const glazing = element.value;
  const packSizeSelect = document.getElementById("packsizeOptions");
  const packSize = packSizeSelect.value;

  updatePrice(glazing, packSize);
}

function packSizeChange(element) {
  const packSize = element.value;
  const glazingSelect = document.getElementById("glazingOptions");
  const glazing = glazingSelect.value;

  updatePrice(glazing, packSize);
}

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

document.addEventListener("DOMContentLoaded", function () {
  populateDropdown("glazingOptions", glazingOptions);
  populateDropdown("packsizeOptions", packSizeOptions);
  updatePrice("Keep original", "1");
});

//Index
//update page according to url
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");
console.log(rollType);
const headerElement = document.querySelector(".heading");
headerElement.innerText = rollType + " cinnamon roll";
const info = rolls[rollType];
const cinnamonImage = document.querySelector(".detailpic");
cinnamonImage.src = "../assets/products/" + info.imageFile;
//create cart array


class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

let cart = [];

document.getElementById('addtocart').addEventListener('click', addToCart);

function addToCart() {
  const rollType = params.get('roll'); 
  const glazingSelect = document.getElementById('glazingOptions');
  const rollGlazing = glazingSelect.value;
  const packSizeSelect = document.getElementById('packsizeOptions');
  const packSize = packSizeSelect.value;
  const basePrice = info.basePrice; 

  const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
  cart.push(newRoll);

  console.log(cart); 
}
