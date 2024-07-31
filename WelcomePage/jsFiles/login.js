document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Form submitted');
    console.log('Username:', username);
    console.log('Password:', password);

    // Get stored users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store current user in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to homePage.html if login is successful
        window.location.href = '../../homePage/homePage.html';
    } else {
        alert("Invalid username or password");
    }
});
