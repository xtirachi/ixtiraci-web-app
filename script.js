let selectedCountry = '';
let codeCounter = 1000;

function navigateToCountryOptions(country) {
    selectedCountry = country;
    document.getElementById('introduction-page').classList.add('hidden');
    document.getElementById(`${country}-options-page`).classList.remove('hidden');
}

function navigateToLink(url) {
    window.location.href = url;
}

function navigateToIntroductionPage() {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById('introduction-page').classList.remove('hidden');
}

function navigateToCodePage() {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById('code-generation-page').classList.remove('hidden');
}

function generateCode(event) {
    event.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;

    codeCounter += 1;
    const code = codeCounter;
    alert(`Kodunuz: ${code}`);
}
