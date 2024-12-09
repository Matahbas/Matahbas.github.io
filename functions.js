function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);


const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const questions = {
        q1: parseInt(document.querySelector('input[name="q1"]:checked')?.value),
        q2: parseInt(document.querySelector('input[name="q2"]:checked')?.value),
        q3: parseInt(document.querySelector('input[name="q3"]:checked')?.value),
        q4: parseInt(document.querySelector('input[name="q4"]:checked')?.value),
        q5: parseInt(document.querySelector('input[name="q5"]:checked')?.value)
    };

    if (!questions.q1 || !questions.q2 || !questions.q3 || !questions.q4 || !questions.q5) {
        alert('Please answer all rating questions.');
        return; 
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const phoneRegex = /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    if (address.trim() === '') {
        alert('Please enter a valid address.');
        return; 
    }

    const averageRating = (
        (questions.q1 + questions.q2 + questions.q3 + questions.q4 + questions.q5) / 5
    ).toFixed(2);

    let averageColor = '';
    if (averageRating >= 7) {
        averageColor = 'green'; 
    } else if (averageRating >= 4) {
        averageColor = 'orange';
    } else {
        averageColor = 'red'; 
    }

    const userData = `
        Name: ${firstName} ${lastName} (${email})
        Phone: ${phone}
        Address: ${address}
        Average Rating: ${averageRating}
        Questions:
        1. How satisfied are you with our service? ${questions.q1}
        2. How likely are you to recommend us? ${questions.q2}
        3. How would you rate the quality of our services? ${questions.q3}
        4. How easy was it to navigate our website? ${questions.q4}
        5. Overall, how satisfied are you? ${questions.q5}
    `;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <p><strong>Name:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Average Rating:</strong> <span style="color: ${averageColor};">${averageRating}</span></p>
        <p><strong>Questions:</strong></p>
        <ul>
            <li>How satisfied are you with our service? ${questions.q1}</li>
            <li>How likely are you to recommend us? ${questions.q2}</li>
            <li>How would you rate the quality of our services? ${questions.q3}</li>
            <li>How easy was it to navigate our website? ${questions.q4}</li>
            <li>Overall, how satisfied are you? ${questions.q5}</li>
        </ul>
    `;
});
