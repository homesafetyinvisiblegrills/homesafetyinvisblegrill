const contactForm = document.querySelector('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const message = document.querySelector('#message').value.trim();

        if (!/^\+?[0-9\s-]{10,15}$/.test(phone)) {
            window.alert('Please enter a valid phone number.');
            return;
        }

        const whatsappMessage = `Hello, I need a safety solution.\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;

        window.location.href = `https://wa.me/919576951751?text=${encodeURIComponent(whatsappMessage)}`;
    });
}
