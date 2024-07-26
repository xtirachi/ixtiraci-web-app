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

function navigateToLearnCodePage() {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById('learn-code-page').classList.remove('hidden');
}

function navigateToIntroductionPage() {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById('introduction-page').classList.remove('hidden');
}

function generateInventorCode(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;

    codeCounter++;
    const code = codeCounter.toString().padStart(4, '0');

    // Log to Google Sheet
    const formData = new FormData();
    formData.append('full-name', fullName);
    formData.append('phone-number', phoneNumber);
    formData.append('code', code);

    fetch('https://script.google.com/macros/s/AKfycbw-heNN1_DtrwZsCTDfLq1nmLGX9rXeBWLgNTNApYAc-_mjr54j6q0Ycv-HwsIcRzVxLw/exec', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if (data.result === 'success') {
              alert(`İxtiraçı kodunuz: ${code}`);
              generatePDF(fullName, phoneNumber, code);
          } else {
              alert('Kod yaratmaqda xəta baş verdi: ' + data.error);
          }
      }).catch(error => {
          alert('Kod yaratmaqda xəta baş verdi: ' + error);
      });

    navigateToIntroductionPage();
}

function generatePDF(fullName, phoneNumber, code) {
    const doc = new jsPDF();
    doc.text(20, 20, `Tam Ad: ${fullName}`);
    doc.text(20, 30, `Telefon Nömrəsi: ${phoneNumber}`);
    doc.text(20, 40, `İxtiraçı Kodu: ${code}`);
    doc.text(20, 50, 'Bu kodu fəaliyyətlər zamanı istifadə edə bilərsiniz.');

    doc.save(`ixtiraci_kodu_${code}.pdf`);
}
