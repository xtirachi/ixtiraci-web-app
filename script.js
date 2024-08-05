let selectedCountry = '';

function promptPassword(country, correctPassword) {
    const storedPassword = localStorage.getItem(country);
    if (storedPassword === correctPassword) {
        navigateToLanguageSelection(country);
    } else {
        const password = prompt("Zəhmət olmasa " + country + " üçün gizli kodu qeyd edin:");
        if (password === correctPassword) {
            localStorage.setItem(country, correctPassword);
            navigateToLanguageSelection(country);
        } else {
            alert("Gizli kodu yanlış qeyd etdiniz. Votsap vasitəsilə bizimlə əlaqə saxlayın!");
        }
    }
}

function navigateToLanguageSelection(country) {
    selectedCountry = country;
    document.getElementById('country-selection').classList.add('hidden');
    document.getElementById('language-selection-page').classList.remove('hidden');
}

function selectLanguage(language) {
    navigateToCountryOptions(language);
}

function navigateToCountryOptions(language) {
    let pageId = selectedCountry + '-options-page-' + language;
    document.getElementById('language-selection-page').classList.add('hidden');
    document.getElementById(pageId).classList.remove('hidden');
}

function navigateToMainPage() {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById('country-selection').classList.remove('hidden');
}

function navigateToLink(url) {
    window.location.href = url;
}

function navigateToLearnCodePage() {
    alert('Bu funksiya kod öyrənmə səhifəsinə yönləndirilməlidir.');
}

document.addEventListener('DOMContentLoaded', () => {
    navigateToMainPage();
});
