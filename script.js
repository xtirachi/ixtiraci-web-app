function showPage(pageId) {
  const pages = ['introductionPage', 'signupPage', 'loginPage', 'profilePage', 'ixtiracilarPage'];
  pages.forEach(page => {
    document.getElementById(page).classList.add('hidden');
  });
  document.getElementById(pageId).classList.remove('hidden');
}

function selectCountry(country) {
  localStorage.setItem('selectedCountry', country);
  alert('Seçilmiş ölkə: ' + country);
  // Redirect to language selection page or next step
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  google.script.run.withSuccessHandler(function(userId) {
    localStorage.setItem('userId', userId);
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('profileBtn').classList.remove('hidden');
    showPage('profilePage');
  }).registerUser(name, email, password);
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  google.script.run.withSuccessHandler(function(userId) {
    if (userId) {
      localStorage.setItem('userId', userId);
      document.getElementById('loginBtn').classList.add('hidden');
      document.getElementById('profileBtn').classList.remove('hidden');
      showPage('profilePage');
    } else {
      alert('Yanlış e-poçt və ya şifrə');
    }
  }).loginUser(email, password);
});

document.addEventListener('DOMContentLoaded', function() {
  var userId = localStorage.getItem('userId');
  if (userId) {
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('profileBtn').classList.remove('hidden');
    google.script.run.withSuccessHandler(function(user) {
      document.getElementById('userName').innerText = user.name;
      var uploadsHtml = '';
      user.uploads.forEach(function(upload) {
        uploadsHtml += '<div>' + upload.fileName + ' - ' + (upload.visibility ? 'İctimai' : 'Özəl') + '</div>';
      });
      document.getElementById('uploads').innerHTML = uploadsHtml;
    }).getUserProfile(userId);
  }
});
