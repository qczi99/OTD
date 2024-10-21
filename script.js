
document.addEventListener('DOMContentLoaded', function () {
    // Funkcja do animacji przewijania
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        const start = window.scrollY || window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Ogranicza postęp do 1

            window.scrollTo(0, start + (targetPosition - start) * progress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Dodanie event listenerów do każdego linku
    document.querySelectorAll('.nav-links a, .about a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Zapobiega domyślnemu działaniu linku

            const target = this.getAttribute('href');
            smoothScroll(target, 500); // Wywołanie funkcji z czasem trwania 500 ms
        });
    });
});

/*------------Responsywność navbara-------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
});


const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');

// Klonujemy elementy, aby wypełnić kontener
items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
});



// Pokaż formularz po kliknięciu przycisku
document.querySelector(".contact-btn").addEventListener("click", function () {
    var form = document.getElementById("kontaktForm");
    form.classList.add("show");
    this.style.display = "none"; // Ukryj przycisk po kliknięciu
});

// AJAX do wysyłania danych na serwer
document.getElementById("kontaktForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Zatrzymaj domyślne wysłanie formularza

    // Zbierz dane z formularza
    var formData = new FormData(this);

    // Wyślij dane na serwer przez AJAX
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            if (response.ok) {
                // Ukryj formularz i pokaż komunikat z podziękowaniem
                var form = document.getElementById("kontaktForm");
                var message = document.getElementById("thankYouMessage");
                form.style.display = "none";
                message.style.display = "block";
            } else {
                alert('Wystąpił problem z wysłaniem formularza. Proszę spróbować ponownie.');
            }
        })
        .catch(function (error) {
            alert('Błąd połączenia z serwerem.');
        });
});

