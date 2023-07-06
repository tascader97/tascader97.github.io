// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = currentTheme === 'dark' ? '' : 'dark';
  themeToggle.textContent = currentTheme !== 'dark' ? 'Dark Mode' : 'Light Mode';
});

// Save the theme to localStorage
document.documentElement.addEventListener('change', () => {
  localStorage.setItem('theme', document.documentElement.dataset.theme);
});

// Set initial button text and theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.dataset.theme = currentTheme;
}
themeToggle.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cartItems = [];

addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

function addToCart(e) {
  const button = e.target;
  const card = button.closest('.drink-card');
  const itemName = card.querySelector('.drink-name').textContent;
  const itemPrice = parseFloat(card.querySelector('.drink-price').textContent.slice(1));
  const itemImage = card.querySelector('.drink-image').src;

  cartItems.push({
    name: itemName,
    price: itemPrice,
    image: itemImage
  });

  updateCart();
}

function updateCart() {
  const cartItemsList = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  cartItemsList.innerHTML = '';
  let cartTotal = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <img class="cart-item-image" src="${item.image}" alt="${item.name}">
      <span class="cart-item-name">${item.name}</span>
      <span>1 x $${item.price.toFixed(2)}</span>
    `;
    cartItemsList.appendChild(li);
    
    cartTotal += item.price;

    // Add the .show class with a delay based on the index
    setTimeout(() => {
      li.classList.add('show');
    }, 50 * index);
  });

  cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Read more and close description
document.querySelectorAll(".read-more").forEach(function (button) {
  button.addEventListener("click", function () {
    const cardInner = button.closest(".card-inner");
    cardInner.style.transform = "rotateY(180deg)";
  });
});

document.querySelectorAll(".close-description").forEach(function (button) {
  button.addEventListener("click", function () {
    const cardInner = button.closest(".card-inner");
    cardInner.style.transform = "rotateY(0deg)";
  });
});

// Scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Search functionality
const searchForm = document.querySelector("form[action='/search']");
const searchInput = searchForm.querySelector("input[name='search']");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  filterDrinks(query);
});

function filterDrinks(query) {
  const drinkCards = document.querySelectorAll(".drink-card");
  drinkCards.forEach((card) => {
    const drinkNameElement = card.querySelector(".drink-name");
    const drinkName = drinkNameElement.textContent.toLowerCase();
    if (drinkName.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
document.querySelector('#theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
