document.addEventListener('DOMContentLoaded', () => {
    const orderItemsList = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    const whatsappLink = document.getElementById('whatsapp-link');
    const downloadLink = document.getElementById('download-link');
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let totalPrice = 0;

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        orderItemsList.appendChild(listItem);
        totalPrice += item.price;
    });

    orderTotalElement.innerText = totalPrice.toFixed(2);

    // Reemplaza '000000000000' con tu número de WhatsApp (sin espacios ni caracteres especiales)
    const phoneNumber = ''; 
    const whatsappMessage = `Hola, me gustaría ordenar los siguientes productos:%0A%0A`;
    let whatsappProducts = '';
    cartItems.forEach(item => {
        whatsappProducts += `${item.name} - $${item.price.toFixed(2)}%0A`;
    });
    const whatsappUrl = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(whatsappMessage + whatsappProducts)}`;
    whatsappLink.href = whatsappUrl;

    // Generar el archivo de resumen para descargar
    const downloadData = `Resumen del Pedido:%0A%0A${whatsappMessage}${whatsappProducts}Total: $${totalPrice.toFixed(2)}`;
    const downloadBlob = new Blob([downloadData], { type: 'text/plain' });
    downloadLink.href = URL.createObjectURL(downloadBlob);
});
