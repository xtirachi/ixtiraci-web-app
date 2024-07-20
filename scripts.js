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
            'Mədəni irs və səyahət': 'Mədəni irs və səyahət',
            'İncəsənət və yaradıcılıq': 'İncəsənət və yaradıcılıq',
            'STEAM və innovasiya': 'STEAM və innovasiya',
            'Eksperiment və tədqiqat': 'Eksperiment və tədqiqat'
        },
        'Русский': {
            'Mədəni irs və səyahət': 'Культурное наследие и путешествия',
            'İncəsənət və yaradıcılıq': 'Искусство и творчество',
            'STEAM və innovasiya': 'STEAM и инновации',
            'Eksperiment və tədqiqat': 'Эксперименты и исследования'
        },
        'English': {
            'Mədəni irs və səyahət': 'Cultural Heritage and Travel',
            'İncəsənət və yaradıcılıq': 'Art and Creativity',
            'STEAM və innovasiya': 'STEAM and Innovation',
            'Eksperiment və tədqiqat': 'Experiments and Research'
        }
    };

    const options = translations[selectedLanguage];

    document.getElementById('btn-cultural').textContent = options['Mədəni irs və səyahət'];
    document.getElementById('btn-art').textContent = options['İncəsənət və yaradıcılıq'];
    document.getElementById('btn-steam').textContent = options['STEAM və innovasiya'];
    document.getElementById('btn-experiments').textContent = options['Eksperiment və tədqiqat'];
}

function navigateToContent(part) {
    selectedPart = part;
    document.getElementById('thematic-options-page').classList.add('hidden');
    document.getElementById('content-page').classList.remove('hidden');
    document.getElementById('content-title').textContent = part;
    setAudioPlaylist(part);
}

function setAudioPlaylist(part) {
    const audioFiles = {
        'Mədəni irs və səyahət': {
            'Azərbaycan dili': [
                'https://example.com/az-cultural1.mp3',
                'https://example.com/az-cultural2.mp3'
            ],
            'Русский': [
                'https://example.com/ru-cultural1.mp3',
                'https://example.com/ru-cultural2.mp3'
            ],
            'English': [
                'https://example.com/en-cultural1.mp3',
                'https://example.com/en-cultural2.mp3'
            ]
        },
        'İncəsənət və yaradıcılıq': {
            'Azərbaycan dili': [
                'https://example.com/az-art1.mp3',
                'https://example.com/az-art2.mp3'
            ],
            'Русский': [
                'https://example.com/ru-art1.mp3',
                'https://example.com/ru-art2.mp3'
            ],
            'English': [
                'https://example.com/en-art1.mp3',
                'https://example.com/en-art2.mp3'
            ]
        },
        'STEAM və innovasiya': {
            'Azərbaycan dili': [
                'https://example.com/az-steam1.mp3',
                'https://example.com/az-steam2.mp3'
            ],
            'Русский': [
                'https://example.com/ru-steam1.mp3',
                'https://example.com/ru-steam2.mp3'
            ],
            'English': [
                'https://example.com/en-steam1.mp3',
                'https://example.com/en-steam2.mp3'
            ]
        },
        'Eksperiment və tədqiqat': {
            'Azərbaycan dili': [
                'https://example.com/az-experiment1.mp3',
                'https://example.com/az-experiment2.mp3'
            ],
            'Русский': [
                'https://example.com/ru-experiment1.mp3',
                'https://example.com/ru-experiment2.mp3'
            ],
            'English': [
                'https://example.com/en-experiment1.mp3',
                'https://example.com/en-experiment2.mp3'
            ]
        }
    };

    const selectedAudioFiles = audioFiles[part][selectedLanguage];
    const audioPlaylist = document.getElementById('audio-playlist');

    audioPlaylist.innerHTML = '<h3>Audio Siyahısı</h3>';
    selectedAudioFiles.forEach((audioSrc, index) => {
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.innerHTML = `<source src="${audioSrc}" type="audio/mpeg"> Brauzeriniz audio elementini dəstəkləmir.`;
        audioPlaylist.appendChild(audioElement);
    });
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
                  alert('Fayl uğurla yükləndi!');
              } else {
                  alert('Fayl yüklənərkən xəta baş verdi: ' + data.error);
              }
          }).catch(error => {
              alert('Fayl yüklənərkən xəta baş verdi: ' + error);
          });
    };
    reader.readAsDataURL(fileUpload);
}

function goToMainPage() {
    document.getElementById('language-selection-page').classList.add('hidden');
    document.getElementById('thematic-options-page').classList.add('hidden');
    document.getElementById('content-page').classList.add('hidden');
    document.getElementById('introduction-page').classList.remove('hidden');
}
