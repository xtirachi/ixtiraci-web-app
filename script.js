document.addEventListener('DOMContentLoaded', (event) => {
    // Elements
    const loginButton = document.getElementById('login-button');
    const profileButton = document.getElementById('profile-button');
    const introPage = document.getElementById('intro-page');
    const languagePage = document.getElementById('language-page');
    const categoryPage = document.getElementById('category-page');
    const uploadPage = document.getElementById('upload-page');
    const signupPage = document.getElementById('signup-page');
    const loginPage = document.getElementById('login-page');
    const profilePage = document.getElementById('profile-page');
    const ixtiracilarPage = document.getElementById('ixtiracilar-page');
    const uploadForm = document.getElementById('upload-form');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // Event Listeners
    signupForm.addEventListener('submit', handleSignup);
    loginForm.addEventListener('submit', handleLogin);
    uploadForm.addEventListener('submit', handleUpload);

    loginButton.addEventListener('click', () => showPage(loginPage));
    profileButton.addEventListener('click', () => showPage(profilePage));

    // Show the appropriate page based on user's action
    function showPage(page) {
        const pages = [
            introPage, languagePage, categoryPage, uploadPage,
            signupPage, loginPage, profilePage, ixtiracilarPage
        ];
        pages.forEach(p => p.style.display = 'none');
        page.style.display = 'block';
    }

    // Handle Signup
    function handleSignup(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        const formData = new FormData();
        formData.append('action', 'register');
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        fetch('https://script.google.com/macros/s/AKfycbyJW4oRQyyms_w00g5400RYTqbbrf9cgrEOq4BTT6VAB6qVGHwDLqcyRn9cOitL-_aK/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Qeydiyyatdan uğurla keçdiniz! ID: ' + data.userId);
                showPage(loginPage);
            } else {
                alert('Qeydiyyat zamanı xəta baş verdi: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Handle Login
    function handleLogin(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        const formData = new FormData();
        formData.append('action', 'login');
        formData.append('email', email);
        formData.append('password', password);

        fetch('https://script.google.com/macros/s/AKfycbyJW4oRQyyms_w00g5400RYTqbbrf9cgrEOq4BTT6VAB6qVGHwDLqcyRn9cOitL-_aK/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Uğurla daxil oldunuz!');
                localStorage.setItem('currentUser', email);
                loginButton.style.display = 'none';
                profileButton.style.display = 'block';
                showPage(introPage);
                updateRankings();
            } else {
                alert('Email və ya şifrə yanlışdır: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Handle Upload
    function handleUpload(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const file = event.target.elements.document.files[0];
        const isPublic = event.target.elements.public.checked ? 'yes' : 'no';
        let userId = localStorage.getItem('currentUser');

        if (file && name) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64File = event.target.result.split(',')[1];
                uploadToGoogleSheets(name, userId, file, base64File, file.type, isPublic);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Zəhmət olmasa adınızı daxil edin və fayl seçin.');
        }
    }

    function uploadToGoogleSheets(name, userId, file, base64File, mimeType, isPublic) {
        const formData = new FormData();
        formData.append('action', 'upload');
        formData.append('name', name);
        formData.append('userId', userId);
        formData.append('fileName', file.name);
        formData.append('file', base64File);
        formData.append('mimeType', mimeType);
        formData.append('public', isPublic);

        fetch('https://script.google.com/macros/s/AKfycbyJW4oRQyyms_w00g5400RYTqbbrf9cgrEOq4BTT6VAB6qVGHwDLqcyRn9cOitL-_aK/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Məlumat uğurla yükləndi.');
                updateUserPoints(userId);
                updateRankings();
                showPage(profilePage);
            } else {
                alert('Məlumatı yükləmək alınmadı: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function updateUserPoints(userId) {
        // Fetch current user points and update them
        // You need to implement this function
    }

    function updateRankings() {
        fetch('https://script.google.com/macros/s/AKfycbyJW4oRQyyms_w00g5400RYTqbbrf9cgrEOq4BTT6VAB6qVGHwDLqcyRn9cOitL-_aK/exec?action=getRankings')
        .then(response => response.json())
        .then(data => {
            const rankingList = document.getElementById('ranking-list');
            rankingList.innerHTML = '';
            data.rankings.forEach(ranking => {
                const listItem = document.createElement('div');
                listItem.innerHTML = `
                    <h3>${ranking.name} (ID: ${ranking.userId}): ${ranking.points} xal</h3>
                    ${ranking.publicUploads.map(upload => `<img src="${upload.fileUrl}" alt="${upload.fileName}" />`).join('')}
                `;
                rankingList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Utility functions to show pages
    function showLanguageOptions(destination) {
        localStorage.setItem('destination', destination);
        showPage(languagePage);
    }

    function showCategoryOptions(language) {
        localStorage.setItem('language', language);
        showPage(categoryPage);
    }

    function showUploadPage() {
        showPage(uploadPage);
    }

    function showSignUpPage() {
        showPage(signupPage);
    }

    function showLoginPage() {
        showPage(loginPage);
    }

    function showProfilePage() {
        showPage(profilePage);
        loadUserUploads();
    }

    function showIxtiracilarPage() {
        showPage(ixtiracilarPage);
        loadRankings();
    }

    function returnToMainPage() {
        showPage(introPage);
    }

    function loadUserUploads() {
        fetch('https://script.google.com/macros/s/AKfycbyJW4oRQyyms_w00g5400RYTqbbrf9cgrEOq4BTT6VAB6qVGHwDLqcyRn9cOitL-_aK/exec?action=getUploads')
        .then(response => response.json())
        .then(data => {
            const userUploads = document.getElementById('user-uploads');
            userUploads.innerHTML = '';
            data.uploads.forEach(upload => {
                if (upload.userId === localStorage.getItem('currentUser') || upload.public === 'yes') {
                    const uploadItem = document.createElement('div');
                    uploadItem.className = 'upload-item';
                    uploadItem.innerHTML = `
                        <h3>${upload.name}</h3>
                        <img src="${upload.fileUrl}" alt="${upload.fileName}" />
                    `;
                    userUploads.appendChild(uploadItem);
                }
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Initial setup
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        loginButton.style.display = 'none';
        profileButton.style.display = 'block';
        showPage(introPage);
    } else {
        loginButton.style.display = 'block';
        profileButton.style.display = 'none';
        showPage(introPage);
    }
});
