const products = [
    { id: 1, title: 'ARTICHOKE DISHES',dataprice: '60', image: '15.jpg' },
    { id: 2, title: 'EGGPLANT CAVIAR', price: '130', image: '17.jpg' },
    { id: 3, title: 'ROASTED SOUP', price: '90', image: '2.jpg' },
    { id: 4, title: 'CHHENA DISHES', price: '70', image: '2.jpg' },
    { id: 5, title: 'YET ANOTHER CAVIAR', price: '150', image: '15.jpg' },
    { id: 6, title: 'ANOTH SOUP', price: '250', image: '2.jpg' },
];

const cartButton = document.getElementById('cartButton');
const cartBadge = document.getElementById('cart-badge');
const cartItemsListModal = document.getElementById('cart-items-modal');
const cartTotalSpanModal = document.getElementById('cart-total-modal');

let cartTotal = 0;
let cartCount = 0;
let cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Add event listeners to the "Add Cart" buttons
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            addToCart(event.target);
        }
    });

    if (cartButton) {
        cartButton.addEventListener('click', displayCartSummary);
    }
});

const addToCart = (button) => {
    const itemId = button.dataset.id;
    const itemName = button.dataset.name;
    // Remove '₹' symbol and parse the numeric part as an integer
    const itemPrice = parseInt(button.dataset.price.replace('₹', ''), 10);

    cartItems.push({ id: itemId, name: itemName, price: itemPrice });

    cartTotal += itemPrice;
    cartCount++;

    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }

    showItemAddedPopup();
};




const displayCartSummary = () => {
    cartItemsListModal.innerHTML = '';

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${item.name} - ₹${item.price}`));

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '&nbsp; &#10006;';
        removeButton.classList.add('btn', 'btn-outline', 'remove-from-cart');
        removeButton.dataset.index = index; 
        removeButton.addEventListener('click', function () {
            const removedItemIndex = parseInt(this.dataset.index);
            const removedItemPrice = cartItems[removedItemIndex].price;
            cartItems.splice(removedItemIndex, 1);
            cartTotal -= removedItemPrice;
            cartCount--;

            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }
            displayCartSummary();
        });

        li.appendChild(removeButton);
        cartItemsListModal.appendChild(li);
    });

    if (cartTotalSpanModal) {
        cartTotalSpanModal.textContent = cartTotal;
    }

    $('#cartModal').modal('show');
};




const showItemAddedPopup = () => {
    Swal.fire({
        icon: 'success',
        title: 'Item added to the cart!',
        showConfirmButton: false,
        timer: 600,
    });
};

// Initial display of products
const displayItem = (items) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = items.map((item) => {
        return `
        <div class="col-lg-4 col-md-4 col-12 mt-3">
          <div class="card">
            <img src="${item.image}" class="card-img-top" alt="Product Image ${item.id}">
            <div class="card-body text-center">
              <h5 class="card-title">${item.title}</h5>
              <p>Price: ₹${item.price}</p>
              <button class="btn signin add-to-cart" data-id="${item.id}" data-name="${item.title}" data-price="${item.price}">Add Cart</button>
            </div>
          </div>
        </div>`;
    }).join('');
};


const filterItems = (searchTerm) => {
    const searchData = searchTerm.toLowerCase();
    const filteredProducts = products.filter((item) => {
        return item.title.toLowerCase().includes(searchData);
    });
    displayItem(filteredProducts);
};

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById('searchBar').value;
        filterItems(searchTerm);
    });

    // Initial display of products
  // displayItem(products);
});
