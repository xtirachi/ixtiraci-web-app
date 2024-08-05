
function promptPassword(country, correctPassword) {
    const password = prompt("Zəhmət olmasa " + country + " üçün gizli kodu qeyd edin:");
    if (password === correctPassword) {
        navigateToLanguageSelection(country);
    } else {
        alert("Gizli kodu yanlış qeyd etdiniz. Votsap vasitəsilə bizimlə əlaqə saxlayın!");
    }
}

function navigateToLanguageSelection(country) {
    selectedCountry = country;
    document.getElementById('introduction-page').classList.add('hidden');
    document.getElementById('language-selection-page').classList.remove('hidden');
}

// Function to navigate back to the main page
function navigateToMainPage() {
    // Logic to navigate back to the main page
    alert('Navigating to the main page...');
    // You can replace the alert with actual navigation code
}
