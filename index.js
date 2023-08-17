const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsContainer = document.getElementById("cartItems");
const cartItems = [];
let totalPrice = 0;

function addToCart(event) {
  const item = event.target.getAttribute("data-item");
  const price = parseFloat(event.target.getAttribute("data-price"));
  cartItems.push({ item, price }); // Store item and its price as an object
  totalPrice += price;
  updateCart();
}

function removeCartItem(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  totalPrice -= removedItem.price;
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = ""; // Clear previous cart items
  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.textContent = `${item.item} - €${item.price}`;
    
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => removeCartItem(index));
    
    cartItemElement.appendChild(removeButton);
    cartItemsContainer.appendChild(cartItemElement);
  });

  const totalElement = document.createElement("div");
  totalElement.textContent = `Amount to pay : €${totalPrice}`;
  cartItemsContainer.appendChild(totalElement);
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

///////////////



function showCreditCardForm() {
  const creditCardForm = document.getElementById("creditCardForm");
  creditCardForm.style.display = "block";
}

function hideCreditCardForm() {
  const creditCardForm = document.getElementById("creditCardForm");
  creditCardForm.style.display = "none";
}



function payByCreditCard(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const creditCardNumberInput = document.getElementById("creditCardNumber");

  const name = nameInput.value.trim();
  const creditCardNumber = creditCardNumberInput.value.trim();

  if (name === "" || creditCardNumber === "") {
    alert("Please fill in all the required fields.");
    return;
  }

  if (!/^\d{16}$/.test(creditCardNumber)) {
    alert("Invalid credit card number. Please enter a 16-digit credit card number.");
    return;
  }

  alert(`Payment Successful! ${name}, you have paid €${totalPrice.toFixed(2)} with your credit card ending in ${creditCardNumber.slice(-4)}.`);
  hideCreditCardForm();
}


function applyDiscount() {
  const discountAmount = 5; // Example discount amount, you can change this as needed
  totalPrice -= discountAmount;
  updateCart();
}


