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
  const basePrice = 2.49;
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
