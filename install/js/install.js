addEventListener("DOMContentLoaded", () => {
    //variable for currentpath and XHR requests used in AJAX Queries
    const currentFolder = window.location.pathname.replace(/[^/]*$/, '');
    var xhr = new XMLHttpRequest();
    //sql password box called out of function as used in two functions. 
    const spbox = document.getElementById('sql-password');
    const scpbox = document.getElementById('sql-confirmpassword');
    const formTitle = document.getElementById('form-title');
    const formContainer = document.getElementById('form-container');
    const btnContinue = document.getElementById('btn-continue');
    let currentStep = 0; 
    //Site HTML and Form Object
    const installerObJ ={
        headings: [
            "<h1>Welcome to the siteQL Installer</h1>",
            "<h3>Start With Your SQL Node Information</h3>",
            "<h3>Let's Setup Some Credentials</h3>",
            "<h3>Some Information About You</h3>",
            "<h3>Upload Brand Images</h3>"
        ],
        formHTML: [
            //WELCOME PAGE [0]
            `<p>For Documentation Check-out the GitHub Page</p>
                <div>
                    <a href="https://github.com/asbedb/siteQL" target=”_blank”>
                        <button>
                            GitHub
                        </button>
                    </a>
                </div>`,
            //DATABASE INFORMATION FORM [1]
            `<form id="database-form" name="database-form" action="javascript:void(0);">
                <div class="form-row">
                    <label for="sql-host">Host</label>
                    <input type="text" id="sql-host" name="sql-host"placeholder="Default: localhost" >
                </div>
                <div class="form-row">
                    <label for="sql-user">User</label>
                    <input type="text" id="sql-user" name="sql-user" placeholder="Default: root">
                </div>
                <div class="form-row">
                    <label for="sql-dbname">DB Name</label>
                    <input type="text" id="sql-dbname" name="sql-dbname" placeholder="Default: siteQL">
                </div>
                <div class="form-row">
                    <label for="sql-password">Password</label>
                    <input type="password" id="sql-password" name="sql-password">
                </div>
                <div class="form-row">
                    <label for="sql-confirmpassword">Confirm Password</label>
                    <input type="password" id="sql-confirmpassword" name="sql-confirmpassword">
                </div>
                <div class="form-row">
                <label for="blank-pass">Passsword for SQL Server is Blank (DevOps)</label>
                    <input onclick="blankPass()" id="blank-pass" name="blank-pass" class="checkmark" type="checkbox" value="">
                </div>
                <button id="connection-save" name="connection-save">
                    Save Details
                </button>
            </form>`,
            //DATABASE CREDENTIALS FORM [2]
            `<form id="credentials-form" name="credentials-form" action="javascript:void(0);">
                <div class="form-row">
                    <label for="user-full-name">Full Name</label>
                    <input type="text" id="user-full-name" name="user-full-name">
                </div>
                <div class="form-row">
                    <label for="user-email">Email</label>
                    <input type="email" id="user-email" name="user-email" placeholder="name@email.com">
                </div>
                <div class="form-row">
                    <label for="user-password">Password</label>
                    <input type="password" id="user-password" name="user-password">
                </div>
                <div class="form-row">
                    <label for="user-confirmpassword">Confirm Password</label>
                    <input type="password" id="user-confirmpassword" name="user-confirmpassword">
                </div>
                <button type="button" id="credentials-save" name="credentials-save" >
                    Save Details
                </button>
            </form>`,
            //USER INFORMATION FORM [3]
            `<form id="about-form" name="about-form" action="javascript:void(0);">
                <div class="form-row">
                    <label for="user-location">Location</label>
                    <input type="text" id="user-location" name="user-location" required>
                </div>
                <div class="form-row">
                    <label for="user-ptitle">Professional Title</label>
                    <input type="text" id="user-ptitle" name="user-ptitle" required>
                </div>
                <div class="form-row">
                    <label for="user-sitetitle">Site Title/Name</label>
                    <input type="text" id="user-sitetitle" name="user-sitetitle" required>
                </div>
                <div class="form-row">
                    <label for="user-aboutme">About You</label>
                    <textarea id="user-aboutme" name="user-aboutme" rows="4" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="button" id="about-save" name="about-save" >
                    Save Details
                </button>
            </form>`,
            //USER PROFILE PICTURE FORM [4]
            `<form id="picture-upload" name="picture-upload" onsubmit="return false;">     
                <div class="form-row">
                    <label for="profile-picture">Profile Picture</label>
                    <img name="profile_picture_preview" id="profile_picture_preview" src="img/pfp.png" alt="Profile Picture"/>
                    <div class="form-row">
                        <input  onchange="previewImage('profile-picture-button', 'profile_picture_preview')" name="profile-picture-button" id="profile-picture-button" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept="image/*">
                    </div>
                </div>
                <div class="form-row">
                    <label for="site-logo">Site Logo</label>
                    <img name="site_logo_preview" id="site_logo_preview" src="img/site_logo.png" alt="site-logo"/>
                    <div class="form-row">
                        <input onchange="previewImage('site-logo-button', 'site_logo_preview')" name="site-logo-button" id="site-logo-button" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept="image/*">
                    </div>
                </div>
                <button id="upload-image">
                    Upload
                </button>
                <button id="finish-installation">
                    <span>
                        Finish Installation
                    </span>
                </button>
            </form>`
        ]
    }
    //image upload variables
    let profilePictureFile = null;
    let siteLogoFile = null;
    //Form Event Handler
    siteInitialLoad();
    formContainer.addEventListener('click', (event) => {
        if (event.target.matches('#connection-save')) {
            updateDBConfig();
        } else if (event.target.matches('#credentials-save')) {
            updateCredentials();
        } else if (event.target.matches('#about-save')) {
            updateAbout();
        } else if (event.target.matches('#upload-image')) {
            uploadImage();
        } else if (event.target.matches('#finish-installation')) {
            finishInstallation();
        }
    });
    btnContinue.addEventListener("click", nextStep);
    //Site Form Array Object
    function siteInitialLoad(){
        formTitle.innerHTML = installerObJ.headings[currentStep];
        formContainer.innerHTML = installerObJ.formHTML[currentStep];
        console.log("Hello There! Thanks for Checking this out make sure to go to the github for more information :)");
    }
    //Moves through object
    function nextStep(){
        if(currentStep < installerObJ.headings.length - 1){
            currentStep += 1;
            formTitle.innerHTML = installerObJ.headings[currentStep];
            formContainer.innerHTML = installerObJ.formHTML[currentStep];
            console.log(currentStep);
        }else{
            console.log("nope");
        }
    }
    //Function call to update the SQL Config
    function updateDBConfig() {
        // Get form data
        const formData = new FormData(document.getElementById("database-form"));
        //Get user input passwords and passowrd boxes
        var password = formData.get('sql-password');
        var confirmPassword = formData.get('sql-confirmpassword');

        // Check if passwords match
        if (password !== confirmPassword) {
            //to write new toast notifications system
            alert("Passwords do not match")
            return;
        }else{
            //to write new toast notifications system
            console.log("Passwords match")
        }
        //visual loader trigger start to be written here 

        // Make an AJAX request
        var updateUrl = currentFolder + "/php/updatehost.php";
        xhr.open("POST", updateUrl, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // Handle the response from the server
                if (xhr.status == 200) {
                    // Connection successful
                    var response = xhr.responseText.trim();
                    if (response === "success") {
                        setTimeout(function () {
                            //new toast system needs to be updated here
                            alert("Success - dbconfig.php Created");
                            //visual loader break here
                        }, 3000);
                        
                    } else {
                        setTimeout(function () {
                            //new toast system needs to be updated here
                            alert("Connection Failed, Please Try Again");
                            console.log(xhr.responseText);
                            //visual loader break to be written here
                        }, 3000);
                    }
                } else {
                    // Connection failed - need to write new toast notification system
                    alert("fail")
                }
            
            }
        };

        // Send form data to the server
        xhr.send(formData);
    }
    //function call to update the credentials input
    function updateCredentials(){
        const formData = new FormData(document.getElementById("credentials-form"));
        var password = formData.get('user-password');
        var confirmPassword = formData.get('user-confirmpassword');
        var updateUrl = currentFolder + "php/updatecredentials.php";
        // Check if passwords match
        if (password !== confirmPassword) {
            //to write new toast notifications system
            alert("Passwords do not match")
            return;
        }else{
            //to write new toast notifications system
            console.log("Passwords match")
        }
        //visual loader trigger start to be written here 
        // Make an AJAX request
        console.log('Update URL:', updateUrl);
        xhr.open("POST", updateUrl, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // Handle the response from the server
                if (xhr.status == 200) {
                    // Connection successful
                    var response = xhr.responseText.trim();
                    console.log(response);
                    if (response === "success") {
                        setTimeout(function () {
                            //new toast system needs to be updated here
                            alert("Success - Credentials Updated")
                            //visual loader break here
                        }, 3000);
                        
                    } else {
                        setTimeout(function () {
                            alert("Writing Credentials Failed, Please Try Again");
                            console.log(xhr.responseText);
                            //visual loader break here
                        }, 3000);
                    }
                } else {
                    // Connection failed
                    console.log("Can't Write to DB - Check DB Permissions");
                }
            }
        };
        // Send form data to the server
        xhr.send(formData);
    }
    //function call to update the about input
    function updateAbout(){
        const formData = new FormData(document.getElementById("about-form"));
        var updateUrl = currentFolder + "php/updateabout.php";
        
        //visual loader trigger here

        // Make an AJAX request
        console.log('Update URL:', updateUrl);
        xhr.open("POST", updateUrl, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // Handle the response from the server
                if (xhr.status == 200) {
                    // Connection successful
                    var response = xhr.responseText.trim();
                    console.log(response);
                    if (response === "success") {
                        setTimeout(function () {
                            alert("Success - Information Updated");
                            //visual loader break here
                        }, 3000);
                        
                    } else {
                        setTimeout(function () {
                            console.log("Writing Information Failed, Please Try Again");
                            console.log(xhr.responseText);
                            //visual loader break here
                        }, 3000);
                    }
                } else {
                    // Connection failed
                    console.log("Can't Write to DB - Check DB Permissions");
                    //visual loader break here
                }
            }
        };
        // Send form data to the server
        xhr.send(formData);
    }
    //function call to disable password input for SQL Config
    function blankPass(){
        var bCheck = document.getElementById("blank-pass");
        if(bCheck.checked){
            spbox.disabled = true;
            scpbox.disabled = true;
        }else{
            spbox.disabled = false;
            scpbox.disabled = false;
        }
    }
    //function to update the image preview when uploading images
    function previewImage(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        if (input && preview) {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }
    //function to reload elements after an upload
    function reloadElements() {
        var profilePicturePreview = document.getElementById('profile_picture_preview');
        profilePictureInput.src = profilePictureInput.src;
        profilePicturePreview.src = profilePicturePreview.src;
        var siteLogoPreview = document.getElementById('site_logo_preview');
        siteLogoInput.src = siteLogoInput.src;
        siteLogoPreview.src = siteLogoPreview.src;
    }
    //function to upload an image
    function uploadImage(profilePictureFile, siteLogoFile) {
        const formData = new FormData(document.getElementById("picture-upload"));
        formData.append('profile-picture', profilePictureFile);
        formData.append('site-logo', siteLogoFile);

        //visual loader trigger here

        fetch(currentFolder + 'php/upload.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                //error
            }
            // Handle successful upload
            setTimeout(function () {
                console.log("Success - Image(s) uploaded");
                //visual loader break here
            }, 3000);
            reloadElements();
        })
        .then(data => {
            // Handle any additional response from the server if needed
        })
        .catch(error => {
            // Handle upload error
            //console.error('Error uploading files:', error.message);
        });
    }
    function finishInstallation() {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        var updateUrl = currentFolder + "php/finaliseinstall.php";
        // Set up the AJAX request
        xhr.open("POST", updateUrl, true);
        // Set the content type for the POST request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // Set up the callback function to handle the response
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // Handle the response from the server
                if (xhr.status == 200) {
                    // Connection successful
                    var response = xhr.responseText.trim();
                    console.log(response);
                    if (response === "success") {
                        setTimeout(function () {
                            // Redirect the user after a successful operation
                            window.location.href = "../www/admin";
                        }, 3000);
                    } else {
                        setTimeout(function () {
                            alert("Copying Files Failed. Please ensure adequate write privileges on the server.");
                            console.log(xhr.responseText);
                            restoreOriginalButton(saveButtonLoadWrapper);
                        }, 3000);
                    }
                } else {
                    // Connection failed
                    console.log("Connection to Script Failed");
                }
            }
        };
        // Send the AJAX request
        xhr.send();
    }
});
