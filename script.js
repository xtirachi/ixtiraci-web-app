document.addEventListener('DOMContentLoaded', (event) => {
    // Elements
    const loginButton = document.getElementById('login-button');
    const profileButton = document.getElementById('profile-button');
    const userIdDisplay = document.getElementById('user-id');
    const pages = document.querySelectorAll('.page');

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const uploadForm = document.getElementById('upload-form');

    // Event Listeners
    signupForm.addEventListener('submit', handleSignup);
    loginForm.addEventListener('submit', handleLogin);
    uploadForm.addEventListener('submit', handleUpload);

    loginButton.addEventListener('click', showLoginPage);
    profileButton.addEventListener('click', showProfilePage);

    // Show the appropriate page based on user's action
    function showPage(pageId) {
        pages.forEach(page => page.style.display = 'none');
        document.getElementById(pageId).style.display = 'block';
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

        fetch('https://script.google.com/macros/s/AKfycbxZmc5h0jg4iASQoxg6EGpsKHRjlN08gRcM4eoDhgV2lQPDKqpV4U60iAXBMPIe3Ei_-g/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(`Qeydiyyatdan uğurla keçdiniz! ID: ${data.userId}`);
                userIdDisplay.textContent = `Sizin ID: ${data.userId}`;
                userIdDisplay.style.display = 'block';
                showPage('login-page');
            } else {
                alert(`Qeydiyyat zamanı xəta baş verdi: ${data.message}`);
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

        fetch('https://script.google.com/macros/s/AKfycbxZmc5h0jg4iASQoxg6EGpsKHRjlN08gRcM4eoDhgV2lQPDKqpV4U60iAXBMPIe3Ei_-g/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Uğurla daxil oldunuz!');
                localStorage.setItem('currentUser', email);
                localStorage.setItem('currentUserId', data.userId);
                userIdDisplay.textContent = `Sizin ID: ${data.userId}`;
                userIdDisplay.style.display = 'block';
                loginButton.style.display = 'none';
                profileButton.style.display = 'block';
                showPage('intro-page');
                updateRankings();
            } else {
                alert(`Email və ya şifrə yanlışdır: ${data.message}`);
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
        const userId = localStorage.getItem('currentUserId');
        const language = localStorage.getItem('selectedLanguage');
        const category = localStorage.getItem('selectedCategory');

        if (file && name) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64File = event.target.result.split(',')[1];
                uploadToGoogleSheets(name, userId, file, base64File, file.type, isPublic, language, category);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Zəhmət olmasa adınızı daxil edin və fayl seçin.');
        }
    }

    function uploadToGoogleSheets(name, userId, file, base64File, mimeType, isPublic, language, category) {
        const formData = new FormData();
        formData.append('action', 'upload');
        formData.append('name', name);
        formData.append('userId', userId);
        formData.append('fileName', file.name);
        formData.append('file', base64File);
        formData.append('mimeType', mimeType);
        formData.append('public', isPublic);
        formData.append('language', language);
        formData.append('category', category);

        fetch('https://script.google.com/macros/s/AKfycbxZmc5h0jg4iASQoxg6EGpsKHRjlN08gRcM4eoDhgV2lQPDKqpV4U60iAXBMPIe3Ei_-g/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Məlumat uğurla yükləndi.');
                updateUserPoints(userId);
                updateRankings();
                showPage('profile-page');
            } else {
                alert(`Məlumatı yükləmək alınmadı: ${data.message}`);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function updateUserPoints(userId) {
        // Function to fetch current user points and update them in the Google Sheet
    }

    function updateRankings() {
        // Function to fetch rankings from Google Sheets and update the DOM
        fetch('https://script.google.com/macros/s/AKfycbxZmc5h0jg4iASQoxg6EGpsKHRjlN08gRcM4eoDhgV2lQPDKqpV4U60iAXBMPIe3Ei_-g/exec?action=getRankings')
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
        showPage('language-page');
    }

    function showCategoryOptions(language) {
        localStorage.setItem('selectedLanguage', language);
        showPage('category-page');
    }

    function showUploadPage() {
        const category = event.target.innerText;
        localStorage.setItem('selectedCategory', category);
        showPage('upload-page');
    }

    function showSignUpPage() {
        showPage('signup-page');
    }

    function showLoginPage() {
        showPage('login-page');
    }

    function showProfilePage() {
        showPage('profile-page');
        loadUserUploads();
    }

    function showIxtiracilarPage() {
        showPage('ixtiracilar-page');
        loadRankings();
    }

    function returnToMainPage() {
        showPage('intro-page');
    }

    function loadUserUploads() {
        fetch('https://script.google.com/macros/s/AKfycbxZmc5h0jg4iASQoxg6EGpsKHRjlN08gRcM4eoDhgV2lQPDKqpV4U60iAXBMPIe3Ei_-g/exec?action=getUploads')
        .then(response => response.json())
        .then(data => {
            const userUploads = document.getElementById('user-uploads');
            userUploads.innerHTML = '';
            data.uploads.forEach(upload => {
                if (upload.userId === localStorage.getItem('currentUserId') || upload.public === 'yes') {
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
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUser) {
        loginButton.style.display = 'none';
        profileButton.style.display = 'block';
        userIdDisplay.textContent = `Sizin ID: ${currentUserId}`;
        userIdDisplay.style.display = 'block';
        showPage('intro-page');
    } else {
        loginButton.style.display = 'block';
        profileButton.style.display = 'none';
        showPage('signup-page');
    }
});
