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

        fetch('https://script.google.com/macros/s/AKfycbzqdlXIDI2mMaJkZZ5vgtVMQedauJvxzyWy1lVD88c5p5S9lPGci_L6MkoqKlNleOtCxw/exec', {
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
