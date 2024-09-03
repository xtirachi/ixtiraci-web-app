let selectedCountry = '';

function promptPassword(country, correctPassword) {
    const storedPassword = localStorage.getItem(country);
    if (storedPassword === correctPassword) {
        navigateToCountryOptions(country);
    } else {
        const password = prompt("Zəhmət olmasa " + country + " üçün gizli kodu qeyd edin:");
        if (password === correctPassword) {
            localStorage.setItem(country, correctPassword);
            navigateToCountryOptions(country);
        } else {
            alert("Gizli kodu yanlış qeyd etdiniz. Votsap vasitəsilə bizimlə əlaqə saxlayın!");
        }
    }
}



function navigateToLanguageSelection(country) {
    selectedCountry = country;
    window.location.href = `language-selection.html?country=${country}`;
}

function selectLanguage(language) {
    const urlParams = new URLSearchParams(window.location.search);
    const country = urlParams.get('country');
    navigateToCountryOptions(country, language);

}

function navigateToCountryOptions(country) {
    window.location.href = `${country}-options-page-az.html`;
}

function navigateToMainPage() {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById('introduction-page').classList.remove('hidden');
}

function navigateToLink(url) {
    window.location.href = url;
}

function navigateToLearnCodePage() {
    alert('Bu funksiya kod öyrənmə səhifəsinə yönləndirilməlidir.');
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('language-selection.html')) {
        // Handle the language selection page logic
    } else {
        navigateToMainPage();
    }
});
