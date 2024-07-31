document.getElementById('logout').addEventListener('click', function() {
    alert("Logging out...");
    localStorage.removeItem('currentUser'); // Clear current user data from local storage
    window.location.href = '../WelcomePage/htmlFiles/login.html';
});
