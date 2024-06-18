document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const processOrderButton = document.getElementById('process-order');
    let totalPrice = 0;
    let cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productName = productElement.querySelector('h2').innerText;
            const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('Precio: $', ''));
            
            cartItems.push({ name: productName, price: productPrice });

            const cartItem = document.createElement('li');
            cartItem.innerText = `${productName} - $${productPrice.toFixed(2)}`;
            cartItemsList.appendChild(cartItem);

            totalPrice += productPrice;
            totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
        });
    });

    processOrderButton.addEventListener('click', () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        window.location.href = 'order-summary.html';
    });
});
