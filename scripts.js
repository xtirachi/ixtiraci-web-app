let selectedCountry = '';
let selectedLanguage = '';
let selectedPart = '';

const audioFiles = {
    'Azərbaycan dili': {
        'Cultural Heritage and Travel': ['audio_az_cultural1.mp3', 'audio_az_cultural2.mp3'],
        'Art and Creativity': ['audio_az_art1.mp3', 'audio_az_art2.mp3'],
        'STEAM and Innovation': ['audio_az_steam1.mp3', 'audio_az_steam2.mp3'],
        'Experiments and Research': ['audio_az_experiments1.mp3', 'audio_az_experiments2.mp3']
    },
    'Русский': {
        'Cultural Heritage and Travel': ['audio_ru_cultural1.mp3', 'audio_ru_cultural2.mp3'],
        'Art and Creativity': ['audio_ru_art1.mp3', 'audio_ru_art2.mp3'],
        'STEAM and Innovation': ['audio_ru_steam1.mp3', 'audio_ru_steam2.mp3'],
        'Experiments and Research': ['audio_ru_experiments1.mp3', 'audio_ru_experiments2.mp3']
    },
    'English': {
        'Cultural Heritage and Travel': ['audio_en_cultural1.mp3', 'audio_en_cultural2.mp3'],
        'Art and Creativity': ['audio_en_art1.mp3', 'audio_en_art2.mp3'],
        'STEAM and Innovation': ['audio_en_steam1.mp3', 'audio_en_steam2.mp3'],
        'Experiments and Research': ['audio_en_experiments1.mp3', 'audio_en_experiments2.mp3']
    }
};

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
    setAudioFiles();
}

function setAudioFiles() {
    const audioSrc1 = document.getElementById('audio1-src');
    const audioSrc2 = document.getElementById('audio2-src');
    const audio1 = document.getElementById('audio1');
    const audio2 = document.getElementById('audio2');

    const selectedAudioFiles = audioFiles[selectedLanguage][selectedPart];
    audioSrc1.src = `https://example.com/${selectedAudioFiles[0]}`;
    audioSrc2.src = `https://example.com/${selectedAudioFiles[1]}`;

    audio1.load();
    audio2.load();
}

function backToMainPage() {
    document.getElementById('language-selection-page').classList.add('hidden');
    document.getElementById('thematic-options-page').classList.add('hidden');
    document.getElementById('content-page').classList.add('hidden');
    document.getElementById('introduction-page').classList.remove('hidden');
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

        fetch('https://script.google.com/macros/s/AKfycbzVLxxDa5kfl0RigPY9rGIF96ixXS9qvV1XIzNraOVtq6QxDqVUKRsibQUmiTBziE-pJQ/exec', {
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
