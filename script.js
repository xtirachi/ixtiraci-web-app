function navigateTo(destination) {
    // Store the selected destination and navigate to language selection page
    localStorage.setItem('destination', destination);
    window.location.href = 'language.html';
}
function selectLanguage(language) {
    // Store the selected language and navigate to thematic options page
    localStorage.setItem('language', language);
    window.location.href = 'thematic.html';
}
function selectTheme(theme) {
    // Store the selected theme and navigate to content page
    localStorage.setItem('theme', theme);
    window.location.href = 'content.html';
}
document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const uploadFile = document.getElementById('uploadFile').files[0];

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('uploadFile', uploadFile);

    fetch('upload_endpoint', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const audioFiles = [
        {
            title: 'Sample Audio 1',
            url: 'https://www.sample-videos.com/audio/mp3/wave.mp3'
        },
        {
            title: 'Sample Audio 2',
            url: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3'
        }
    ];

    const audioPlaylist = document.getElementById('audioPlaylist');
    audioFiles.forEach(file => {
        const audioElement = document.createElement('div');
        audioElement.innerHTML = `
            <h3>${file.title}</h3>
            <audio controls>
                <source src="${file.url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        audioPlaylist.appendChild(audioElement);
    });
});
