document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Form submitted');
    console.log('Username:', username);
    console.log('Password:', password);

    // Get stored credentials from local storage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
        // Check if the entered credentials match the stored credentials
        if (username === storedUsername && password === storedPassword) {
            // Redirect to homePage.html if login is successful
            window.location.href = '../../homePage/homePage.html';
        } else {
            alert("Invalid username or password");
        }
    } else {
        // No credentials are stored, prompt the user to sign up
        alert("No user found in the system. Please sign up first.");
    }
});
