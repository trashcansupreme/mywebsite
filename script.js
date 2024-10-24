document.addEventListener('DOMContentLoaded', () => {
    // Event listener for dropdown menu clicks
    document.querySelector('.dropdown-content').addEventListener('click', function(event) {
        const targetId = event.target.getAttribute('href')?.substring(1);
        if (targetId) {
            showSection(targetId);
        }
        if (event.target.id === 'members-login') {
            checkMembership();
        }
    });

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
});
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
