
    document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cartTotal = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.dataset.id;
            const itemName = this.dataset.name;
            const itemPrice = parseInt(this.dataset.price);

            
            const cartItem = document.createElement('li');
            cartItem.textContent = `${itemName} - ₹${itemPrice}`;
            cartItemsList.appendChild(cartItem);

          
            cartTotal += itemPrice;
            cartTotalSpan.textContent = cartTotal;
            showItemAddedPopup();

            checkoutBtn.disabled = false;
        });
    });

   
    const paymentButton = document.getElementById('rzp-button1');
    paymentButton.addEventListener('click', function () {
        // Add your payment processing logic here
       
       
    });
    checkoutBtn.addEventListener('click', function () {
        
        alert(`Checkout - Total: ₹${cartTotal}`);

   
    cartItemsList.innerHTML = '';
    cartTotal = 0;
    cartTotalSpan.textContent = cartTotal;
    checkoutBtn.disabled = true;
    });
  });

function showItemAddedPopup() {
    Swal.fire({
        icon: 'success',
        title: 'Item added to the cart!',
        showConfirmButton: false,
        timer: 600,
    });
}

