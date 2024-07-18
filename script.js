document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const introPage = document.getElementById('intro-page');
    const adminPage = document.getElementById('admin-page');
    const languagePage = document.getElementById('language-page');
    const categoryPage = document.getElementById('category-page');
    const uploadPage = document.getElementById('upload-page');
    const profilePage = document.getElementById('profile-page');
    const ixtiracilarPage = document.getElementById('ixtiracilar-page');

    const loginBtn = document.getElementById('login-btn');
    const profileBtn = document.getElementById('profile-btn');
    const ixtiracilarBtn = document.getElementById('ixtiracilar-btn');
    const uploadForm = document.getElementById('upload-form');

    let currentUser = null;

    // Event listeners
    loginBtn.addEventListener('click', showLoginPage);
    profileBtn.addEventListener('click', showProfilePage);
    ixtiracilarBtn.addEventListener('click', showIxtiracilarPage);

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => showLanguagePage(option.dataset.destination));
    });

    document.querySelectorAll('.language').forEach(language => {
        language.addEventListener('click', () => showCategoryPage(language.dataset.language));
    });

    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', () => showUploadPage(category.dataset.category));
    });

    uploadForm.addEventListener('submit', uploadFile);

    // Functions to handle page navigation
    function showLoginPage() {
        // Implement login logic
        alert('Login functionality to be implemented.');
    }

    function showProfilePage() {
        hideAllPages();
        profilePage.style.display = 'block';
        loadUserUploads();
    }

    function showIxtiracilarPage() {
        hideAllPages();
        ixtiracilarPage.style.display = 'block';
        loadPublicUploads();
    }

    function showLanguagePage(destination) {
        hideAllPages();
        languagePage.style.display = 'block';
    }

    function showCategoryPage(language) {
        hideAllPages();
        categoryPage.style.display = 'block';
    }

    function showUploadPage(category) {
        hideAllPages();
        uploadPage.style.display = 'block';
    }

    function hideAllPages() {
        introPage.style.display = 'none';
        adminPage.style.display = 'none';
        languagePage.style.display = 'none';
        categoryPage.style.display = 'none';
        uploadPage.style.display = 'none';
        profilePage.style.display = 'none';
        ixtiracilarPage.style.display = 'none';
    }

    // Function to upload file
    function uploadFile(event) {
        event.preventDefault();

        const fileInput = document.getElementById('file-upload');
        const nameInput = document.getElementById('name');
        const userIdInput = document.getElementById('user-id');
        const visibilityInput = document.getElementById('visibility');

        if (!fileInput.files.length || !nameInput.value || !userIdInput.value) {
            alert('Please fill in all fields.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = function() {
            const base64Data = reader.result.split(',')[1];
            const payload = JSON.stringify({
                data: base64Data,
                fileName: fileInput.files[0].name,
                userId: userIdInput.value,
                isPublic: visibilityInput.checked
            });

            console.log('Payload:', payload); // Debug: Log the payload

            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycby1HB3b0MHvouNh3sHRqLkztXxvR64UrsOg_K6mjhK9_A7pIvy9GFyJKMX6hM8OP4B4sQ/exec',
                method: 'POST',
                contentType: 'application/json', // Ensure the content type is set to JSON
                data: payload,
                success: function(response) {
                    console.log('Response:', response); // Debug: Log the response
                    alert('File uploaded successfully.');
                    uploadForm.reset();
                    showProfilePage();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Upload failed:', textStatus, errorThrown); // Debug: Log the error details
                    alert('File upload failed: ' + textStatus + ' ' + errorThrown);
                }
            });
        };
        reader.onerror = function(error) {
            console.error('FileReader error:', error); // Debug: Log FileReader error
            alert('Error reading file: ' + error);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }

    // Function to load user uploads
    function loadUserUploads() {
        // Implement the logic to load user uploads from the backend
        alert('Load user uploads functionality to be implemented.');
    }

    // Function to load public uploads
    function loadPublicUploads() {
        // Implement the logic to load public uploads from the backend
        alert('Load public uploads functionality to be implemented.');
    }

    // Initialize
    hideAllPages();
    introPage.style.display = 'block';
});
