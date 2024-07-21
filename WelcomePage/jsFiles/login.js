document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // If login is successful, redirect to the home page
    window.location.href = 'file:///C:/Users/pazit/Desktop/fullStack2/homePage/homePage.html';
});
