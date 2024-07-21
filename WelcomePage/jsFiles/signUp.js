document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if all fields are filled
    if (!username || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Load existing users from Local Storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        alert("Username already exists. Please choose another username.");
        return;
    }

    // Save the new user to Local Storage
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to the home page
    window.location.href = '../../homePage/homePage.html'; // Adjust the relative path as needed
});
