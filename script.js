// Function to prompt for a password
function promptPassword(travelDestination, password) {
    const userInput = prompt(`Please enter the password to access ${travelDestination}:`);
    if (userInput === password) {
        alert(`Welcome to ${travelDestination}!`);
        // Here you can add logic to navigate to the specific page or perform any action
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Function to navigate back to the main page
function navigateToMainPage() {
    // Logic to navigate back to the main page
    alert('Navigating to the main page...');
    // You can replace the alert with actual navigation code
}
