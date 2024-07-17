function showSignUpPage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'block';
}

function showLoginPage() {
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
}

function showAdminPage() {
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('admin-page').style.display = 'block';
}

function showIntroPage() {
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('intro-page').style.display = 'block';
}

function showLanguageOptions(destination) {
    document.getElementById('intro-page').style.display = 'none';
    document.getElementById('language-page').style.display = 'block';
    localStorage.setItem('destination', destination);
}

function showCategoryOptions(language) {
    document.getElementById('language-page').style.display = 'none';
    document.getElementById('category-page').style.display = 'block';
    localStorage.setItem('language', language);
}

function showUploadPage() {
    document.getElementById('category-page').style.display = 'none';
    document.getElementById('upload-page').style.display = 'block';
}

function returnToMainPage() {
    document.getElementById('upload-page').style.display = 'none';
    document.getElementById('intro-page').style.display = 'block';
}

function editIntroPage() {
    alert('Giriş səhifəsini redaktə etmək üçün kodu buraya daxil edin.');
}

function editLanguagePage() {
    alert('Dil seçim səhifəsini redaktə etmək üçün kodu buraya daxil edin.');
}

function editCategoryPage() {
    alert('Kateqoriya seçim səhifəsini redaktə etmək üçün kodu buraya daxil edin.');
}

function editUploadPage() {
    alert('Yükləmə səhifəsini redaktə etmək üçün kodu buraya daxil edin.');
}

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const user = { name, email, password, points: 0, isAdmin: email === 'admin@example.com' };
    localStorage.setItem(email, JSON.stringify(user));

    alert('Qeydiyyatdan uğurla keçdiniz!');
    showLoginPage();
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        localStorage.setItem('currentUser', email);
        alert('Uğurla daxil oldunuz!');
        if (user.isAdmin) {
            showAdminPage();
        } else {
            showIntroPage();
        }
        updateRankings();
    } else {
        alert('Email və ya şifrə yanlışdır.');
    }
});

document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const file = e.target.elements.document.files[0];
    let userId = e.target.elements.userId.value;

    if (!userId) {
        userId = generateUserId();
    }

    if (file && name) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64File = event.target.result.split(',')[1];
            uploadToGoogleSheets(name, userId, file, base64File, file.type);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Zəhmət olmasa adınızı daxil edin və fayl seçin.');
    }
});

function generateUserId() {
    return Math.floor(10010 + Math.random() * 89999).toString();
}

function uploadToGoogleSheets(name, userId, file, base64File, mimeType) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('userId', userId);
    formData.append('fileName', file.name);
    formData.append('file', base64File);
    formData.append('mimeType', mimeType);

    fetch('https://script.google.com/macros/s/AKfycbw1Pmg5Euo2TVlcnr33p8AxVWkpmVZXStQWs2bm3Cb-z1wcJxa13AwYjgd6be4OifdR0g/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Məlumat uğurla yükləndi.');
            updateUserPoints(userId);
            updateRankings();
        } else {
            alert('Məlumatı yükləmək alınmadı: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function updateUserPoints(userId) {
    const email = localStorage.getItem('currentUser');
    const user = JSON.parse(localStorage.getItem(email));
    user.points += 25;
    localStorage.setItem(email, JSON.stringify(user));
}

function updateRankings() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('@')) {
            const user = JSON.parse(localStorage.getItem(key));
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} (ID: ${key}): ${user.points} xal`;
            rankingList.appendChild(listItem);
        }
    }
}

// Initial fetch to populate rankings
updateRankings();
