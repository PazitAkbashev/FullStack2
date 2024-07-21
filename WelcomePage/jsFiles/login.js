document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Form submitted');
    console.log('Username:', username);
    console.log('Password:', password);

    // Perform your validation logic here
    if (username === "testuser" && password === "password123") {
        window.location.href = 'file:///C:/Users/pazit/Desktop/fullStack2/homePage/homePage.html';
    } else {
        alert("Invalid username or password");
    }
});
