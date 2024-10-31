document.addEventListener('DOMContentLoaded', () => {
    // Event listener for dropdown menu clicks
    document.querySelector('.dropdown-content').addEventListener('click', function(event) {
        const targetId = event.target.getAttribute('href')?.substring(1);

        // Check if the clicked element is a link
        if (targetId) {
            event.preventDefault(); // Prevent default link behavior
            showSection(targetId);
        }

        // Check if the clicked element is the members login
        if (event.target.id === 'members-login') {
            event.preventDefault(); // Prevent default link behavior
            checkMembership();
        }
    });
});

// Video scaling on scroll
const videoSection = document.getElementById('video-section');
const video = document.getElementById('dynamic-video');

window.addEventListener('scroll', () => {
    const sectionRect = videoSection.getBoundingClientRect();
    const sectionHeight = window.innerHeight;

    // Check if the video section is out of view
    if (sectionRect.bottom < 0 || sectionRect.top > sectionHeight) {
        video.style.transform = 'scale(0.8)'; // Shrink when out of view
    } else {
        video.style.transform = 'scale(1)'; // Reset to normal size when in view
    }
});

// Function to show a specific section
function showSection(targetId) {
    const sections = document.querySelectorAll('section'); // Assuming sections are <section> tags
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block'; // Show the target section
    } else {
        console.error(`Section with ID "${targetId}" not found.`);
    }
}

// Placeholder function for membership check
function checkMembership() {
    // Simulate a membership check (you can replace this with your actual logic)
    const isLoggedIn = false; // Change this to true if the user is logged in

    if (isLoggedIn) {
        alert('Welcome back, member!');
    } else {
        const loginPrompt = confirm('You need to log in to access this section. Would you like to log in now?');
        if (loginPrompt) {
            // Redirect to the login page or open the login modal
            window.location.href = 'login.html'; // Change this to your login page
        }
    }
}

    // Event listener for the login form submission
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        handleLogin(email, password);
    });

    // Function to show the appropriate section based on the ID
    function showSection(id) {
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.classList.remove('hidden');
            activeSection.classList.add('active');
        }
    }

    // Function to check membership status
    function checkMembership() {
        const hasMembership = confirm("Do you have a membership? Click 'OK' for Yes and 'Cancel' for No.");
        showSection(hasMembership ? 'members-area' : 'sign-in');
    }

    // Function to handle login logic
    function handleLogin(email, password) {
        if (email && password) {
            // Simulate a successful login
            alert('Login successful!'); 
            showSection('members-area'); // Replace with actual login logic
        } else {
            displayError('Please enter both email and password.');
        }
    }

    // Function to display error messages
    function displayError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.innerText = message;
        errorDiv.style.display = 'block';
    }

    // Load default section on page load
    showSection('home');

function handleLogin(email, password) {
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid email or password');
        }
        return response.json();
    })
    .then(data => {
        alert('Login successful!');
        showSection('members-area');
    })
    .catch(error => displayError(error.message));
}

function handleRegistration(email, password) {
    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('User already exists');
        }
        return response.json();
    })
    .then(data => {
        alert('Registration successful! You can now log in.');
        showSection('sign-in');
    })
    .catch(error => displayRegisterError(error.message));
}

document.addEventListener("DOMContentLoaded", function() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    // Function to show the current testimonial
    function showTestimonial(index) {
        testimonials.forEach((testimonial) => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }

    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    }, 3000); // Change testimonial every 3 seconds

    // Show the first testimonial initially
    showTestimonial(currentIndex);
});

function navigateToModule(moduleId) {
    // Implement your navigation logic here
    // For example, redirect to a specific module page
    switch (moduleId) {
        case 'module1':
            window.location.href = 'module1.html'; // Change to your module 1 page
            break;
        case 'module2':
            window.location.href = 'module2.html'; // Change to your module 2 page
            break;
        case 'module3':
            window.location.href = 'module3.html'; // Change to your module 3 page
            break;
        default:
            console.error('Module not found');
    }
}
