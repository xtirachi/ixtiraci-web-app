let selectedCountry = '';
let selectedLanguage = '';
let selectedPart = '';

function navigateToLanguageSelection(country) {
    selectedCountry = country;
    document.getElementById('introduction-page').classList.add('hidden');
    document.getElementById('language-selection-page').classList.remove('hidden');
}

function selectLanguage(language) {
    selectedLanguage = language;
    document.getElementById('language-selection-page').classList.add('hidden');
    document.getElementById('thematic-options-page').classList.remove('hidden');
    setThematicOptions();
}

function setThematicOptions() {
    const translations = {
        'Azərbaycan dili': {
            'Cultural Heritage and Travel': 'Mədəni irs və səyahət',
            'Art and Creativity': 'İncəsənət və yaradıcılıq',
            'STEAM and Innovation': 'STEAM və innovasiya',
            'Experiments and Research': 'Eksperiment və tədqiqat'
        },
        'Русский': {
            'Cultural Heritage and Travel': 'Культурное наследие и путешествия',
            'Art and Creativity': 'Искусство и творчество',
            'STEAM and Innovation': 'STEAM и инновации',
            'Experiments and Research': 'Эксперименты и исследования'
        },
        'English': {
            'Cultural Heritage and Travel': 'Cultural Heritage and Travel',
            'Art and Creativity': 'Art and Creativity',
            'STEAM and Innovation': 'STEAM and Innovation',
            'Experiments and Research': 'Experiments and Research'
        }
    };

    const options = translations[selectedLanguage];

    document.getElementById('btn-cultural').textContent = options['Cultural Heritage and Travel'];
    document.getElementById('btn-art').textContent = options['Art and Creativity'];
    document.getElementById('btn-steam').textContent = options['STEAM and Innovation'];
    document.getElementById('btn-experiments').textContent = options['Experiments and Research'];
}

function navigateToContent(part) {
    selectedPart = part;
    document.getElementById('thematic-options-page').classList.add('hidden');
    document.getElementById('content-page').classList.remove('hidden');
    document.getElementById('content-title').textContent = part;
}

function uploadFile(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const fileUpload = document.getElementById('file-upload').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const formData = new FormData();
        formData.append('full-name', fullName);
        formData.append('phone-number', phoneNumber);
        formData.append('file-upload', e.target.result.split(',')[1]); // base64 encoded content
        formData.append('country', selectedCountry);
        formData.append('language', selectedLanguage);
        formData.append('part', selectedPart);
        formData.append('mimeType', fileUpload.type);
        formData.append('fileName', fileUpload.name);

        fetch('https://script.google.com/macros/s/AKfycbzqdlXIDI2mMaJkZZ5vgtVMQedauJvxzyWy1lVD88c5p5S9lPGci_L6MkoqKlNleOtCxw/exec', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
              if (data.result === 'success') {
                  alert('File uploaded successfully!');
              } else {
                  alert('Error uploading file: ' + data.error);
              }
          }).catch(error => {
              alert('Error uploading file: ' + error);
          });
    };
    reader.readAsDataURL(fileUpload);
}
