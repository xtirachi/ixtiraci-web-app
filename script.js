// script.js

// Function to show sub-options when a main option is clicked
function showSubOptions(option) {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('sub-options').style.display = 'block';
}

// Function to show category options when a language option is clicked
function showCategoryOptions() {
  document.getElementById('sub-options').style.display = 'none';
  document.getElementById('categories').style.display = 'block';
}

// Function to show the upload form when a category option is clicked
function showUploadForm() {
  document.getElementById('categories').style.display = 'none';
  document.getElementById('upload-form').style.display = 'block';
}

// Add event listener to the file upload form to handle form submission
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('file-upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form element and create FormData object
    var form = document.getElementById('file-upload-form');
    var formData = new FormData(form);

    // Perform the AJAX request to submit the form data
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyrPEgeRo-nWBv636Hv18WaCzfwYJk0llKgDmNVKh-Cujw7mSCcc6G_I1Ux39zLS5lf/exec', true);
    
    // Handle the response from the server
    xhr.onload = function() {
      if (xhr.status === 200) {
        document.getElementById('upload-status').innerText = 'File uploaded successfully';
      } else {
        document.getElementById('upload-status').innerText = 'File upload failed: ' + xhr.statusText;
      }
    };
    
    // Send the form data
    xhr.send(formData);
  });
});
