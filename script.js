let selectedCountry = '';
let codeCounter = 1000;
const passwordLog = {};

function promptPassword(country, correctPassword) {
    const today = new Date().toLocaleDateString();
    if (passwordLog[country] && passwordLog[country].date === today) {
        navigateToCountryOptions(country);
    } else {
        const password = prompt("Zəhmət olmasa " + country + " üçün gizli kodu qeyd edin:");
        if (password === correctPassword) {
            passwordLog[country] = { date: today };
            navigateToCountryOptions(country);
        } else {
            alert("Gizli kodu yanlış qeyd etdiniz. Votsap vasitəsilə bizimlə əlaqə saxlayın!");
        }
    }
}

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

function showLearnCodePage() {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById('learn-code-page').classList.remove('hidden');
}

function generateInventorCode(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;

    checkPhoneNumber(phoneNumber).then(existingCode => {
        if (existingCode) {
            createPDF(fullName, phoneNumber, existingCode, true);
        } else {
            codeCounter++;
            const code = codeCounter.toString().padStart(4, '0');

            // Log to Google Sheet
            const formData = new FormData();
            formData.append('full-name', fullName);
            formData.append('phone-number', phoneNumber);
            formData.append('code', code);

            fetch('https://script.google.com/macros/s/AKfycbxas0tBoiOliiqqoCQOUlG3aRcHZ1bMA2Vor_zMvSnJmnhfUc0KKgw2UGRPGcsqkT234w/exec', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
              .then(data => {
                  if (data.result === 'success') {
                      createPDF(fullName, phoneNumber, code, false);
                  } else {
                      alert('Kod yaratmaqda xəta baş verdi: ' + data.error);
                  }
              }).catch(error => {
                  alert('Kod yaratmaqda xəta baş verdi: ' + error);
              });

            navigateToIntroductionPage();
        }
    });
}

function checkPhoneNumber(phoneNumber) {
    return fetch(`https://script.google.com/macros/s/AKfycbxas0tBoiOliiqqoCQOUlG3aRcHZ1bMA2Vor_zMvSnJmnhfUc0KKgw2UGRPGcsqkT234w/exec?phone=${phoneNumber}`)
        .then(response => response.json())
        .then(data => data.code || null);
}

function createPDF(fullName, phoneNumber, code, existing) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`Ad Soyad Ata adı: ${fullName}`, 10, 10);
    doc.text(`Telefon Nömrəsi: ${phoneNumber}`, 10, 20);
    doc.text(`İxtiraçı Kod: ${code}`, 10, 30);

    if (existing) {
        doc.text(`Bu kodu artıq istəmisiniz. Bu sizin kodunuzdur, fəaliyyətlərdə istifadə edəcəyinizdən əmin olun.`, 10, 40);
    } else {
        doc.text(`Bu kodu fəaliyyətlərdə istifadə edəcəyinizdən əmin olun.`, 10, 40);
    }

    doc.save(`Ixtiraci-Kod-${code}.pdf`);
}
