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

            fetch('https://script.google.com/macros/s/AKfycby1krMc6flS5at_5Lj6Q38DC9aOuLnLVUnbHsidvY4SdDWr02fFgCaq1Yrmx9mh3Sh3eQ/exec', {
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
    return fetch(`https://script.google.com/macros/s/AKfycby1krMc6flS5at_5Lj6Q38DC9aOuLnLVUnbHsidvY4SdDWr02fFgCaq1Yrmx9mh3Sh3eQ/exec?phone=${phoneNumber}`)
        .then(response => response.json())
        .then(data => data.code || null);
}

function createPDF(fullName, phoneNumber, code, existing) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const imgData = 'https://i.ibb.co/7XNQPGC/logo.png'; // Logo image URL

    // Adding the logo
    doc.addImage(imgData, 'PNG', 10, 10, 50, 50);

    // Adding text
    doc.setFontSize(20);
    doc.text('İxtiraçı Kod Məlumatı', 70, 30);

    doc.setFontSize(14);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Ad Soyad Ata adı:`, 10, 70);
    doc.setFont('Helvetica', 'normal');
    doc.text(fullName, 60, 70);

    doc.setFont('Helvetica', 'bold');
    doc.text(`Telefon Nömrəsi:`, 10, 80);
    doc.setFont('Helvetica', 'normal');
    doc.text(phoneNumber, 60, 80);

    doc.setFont('Helvetica', 'bold');
    doc.text(`İxtiraçı Kod:`, 10, 90);
    doc.setFont('Helvetica', 'normal');
    doc.text(code, 60, 90);

    if (existing) {
        doc.setFont('Helvetica', 'bold');
        doc.text(`Qeyd:`, 10, 100);
        doc.setFont('Helvetica', 'normal');
        doc.text(`Bu kodu artıq istəmisiniz. Bu sizin kodunuzdur, fəaliyyətlərdə istifadə edəcəyinizdən əmin olun.`, 10, 110, { maxWidth: 180 });
    } else {
        doc.setFont('Helvetica', 'bold');
        doc.text(`Qeyd:`, 10, 100);
        doc.setFont('Helvetica', 'normal');
        doc.text(`Bu kodu fəaliyyətlərdə istifadə edəcəyinizdən əmin olun.`, 10, 110, { maxWidth: 180 });
    }

    doc.save(`Ixtiraci-Kod-${code}.pdf`);
}
