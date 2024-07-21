document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Perform your validation logic here
    if (password !== confirmPassword) {
        alert("Passwords do not match");
    } else if (username && password && confirmPassword) {
        window.location.href = '../WelcomePage/htmlFiles/login.html';
       //window.location.href = 'file:///C:/Users/pazit/Desktop/fullStack2/homePage/homePage.html';
    } else {
        alert("Please fill in all fields");
    }
});
