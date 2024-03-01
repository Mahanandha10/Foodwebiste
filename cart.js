document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartButton = document.getElementById('cartButton');
    const cartBadge = document.getElementById('cart-badge');
    const cartItemsListModal = document.getElementById('cart-items-modal');
    const cartTotalSpanModal = document.getElementById('cart-total-modal');

    let cartTotal = 0;
    let cartCount = 0;
    let cartItems = [];

    if (cartButton) {
        cartButton.addEventListener('click', function () {
            displayCartSummary();
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemName = this.dataset.name;
            
            const itemPrice = parseInt(this.dataset.price.replace('₹', ''), 10);

            cartItems.push({ name: itemName, price: itemPrice });

            cartTotal += itemPrice;
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
            }

            showItemAddedPopup();
        });
    });

    function displayCartSummary() {
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
    }

    function showItemAddedPopup() {
        Swal.fire({
            icon: 'success',
            title: 'Item added to the cart!',
            showConfirmButton: false,
            timer: 600,
        });
    }
});
