$(document).ready(function() {
    // Show Introduction Page on load
    showPage('introductionPage');

    // Event listeners for page navigation
    $('#loginButton').click(function() {
        showPage('profilePage');
    });

    $('#profileButton').click(function() {
        showPage('profilePage');
    });

    $('#kidInventorsButton').click(function() {
        showPage('ixtirachilarPage');
    });

    $('.option').click(function() {
        showPage('languagePage');
    });

    $('.language').click(function() {
        showPage('categoryPage');
    });

    $('.category').click(function() {
        showPage('uploadPage');
        $('#selectedLanguage').val($(this).attr('id'));
        $('#selectedCategory').val($(this).attr('id'));
    });

    // Handle form submission for file upload
    $('#uploadForm').submit(function(event) {
        event.preventDefault();
        $('#popup').show();
        
        var formData = new FormData(this);

        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycby3lnAcoXWIxHPZugHBDB1Xka2DOhfXQ-NR2Wwb4XwcSJAW1su1saGwlMGlne7Kgy4XHw/exec',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert(response);
                $('#popup').hide();
                showPage('ixtirachilarPage');
            },
            error: function(response) {
                alert('Error uploading file: ' + response.responseText);
                $('#popup').hide();
            }
        });
    });

    // Fetch public uploads and display them
    fetchPublicUploads();

    // Function to show a specific page
    function showPage(pageId) {
        $('.page').hide();
        $('#' + pageId).show();
    }

    // Function to fetch public uploads
    function fetchPublicUploads() {
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycby3lnAcoXWIxHPZugHBDB1Xka2DOhfXQ-NR2Wwb4XwcSJAW1su1saGwlMGlne7Kgy4XHw/exec',
            type: 'GET',
            data: { action: 'getPublicUploads' },
            success: function(response) {
                var uploads = JSON.parse(response);
                var publicUploadsContainer = $('#publicUploads');
                publicUploadsContainer.empty();

                uploads.forEach(function(upload) {
                    var uploadItem = `
                        <div class="uploadItem">
                            <img src="${upload.fileUrl}" alt="${upload.fileName}">
                            <div class="details">
                                <p><strong>File Name:</strong> ${upload.fileName}</p>
                                <p><strong>User ID:</strong> ${upload.userId}</p>
                                <p><strong>Points:</strong> ${upload.points}</p>
                            </div>
                            <div class="actions">
                                <button class="likeButton">Like</button>
                                <button class="commentButton">Comment</button>
                            </div>
                        </div>
                    `;
                    publicUploadsContainer.append(uploadItem);
                });
            },
            error: function(response) {
                alert('Error fetching public uploads: ' + response.responseText);
            }
        });
    }
});
