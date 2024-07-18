// script.js

// Store selected adventure, language, and part
let selectedAdventure = '';
let selectedLanguage = '';
let selectedPart = '';

// Function to set selected adventure and show sub-options
function selectAdventure(adventure) {
  selectedAdventure = adventure;
  document.getElementById('intro').style.display = 'none';
  document.getElementById('sub-options').style.display = 'block';
}

// Function to set selected language and show category options
function selectLanguage(language) {
  selectedLanguage = language;
  document.getElementById('sub-options').style.display = 'none';
  document.getElementById('categories').style.display = 'block';
}

// Function to set selected part and show the upload form
function selectPart(part) {
  selectedPart = part;
  document.getElementById('categories').style.display = 'none';
  document.getElementById('upload-form').style.display = 'block';
  document.getElementById('adventure').value = selectedAdventure;
  document.getElementById('language').value = selectedLanguage;
  document.getElementById('part').value = selectedPart;
}

// Function to show the popup
function showPopup(message) {
  document.getElementById('popup-message').innerText = message;
  document.getElementById('popup').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// Add event listener to the file upload form to handle form submission
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('file-upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    showPopup('Yüklənir...');

    // Get the form element and create FormData object
    var form = document.getElementById('file-upload-form');
    var formData = new FormData(form);

    // Perform the AJAX request to submit the form data
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyrPEgeRo-nWBv636Hv18WaCzfwYJk0llKgDmNVKh-Cujw7mSCcc6G_I1Ux39zLS5lf/exec', true);
    
    // Handle the response from the server
    xhr.onload = function() {
      if (xhr.status === 200) {
        showPopup('Fayl uğurla yükləndi');
      } else {
        showPopup('Fayl yüklənmədi: ' + xhr.statusText);
      }
    };
    
    // Send the form data
    xhr.send(formData);
  });
});
