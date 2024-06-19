//Installer all built on one page showing and hiding steps these are the number of steps and starting the current step at one
const totalSteps = 5;
let currentStep = 1; 

//variable for currentpath and XHR requests used in AJAX Queries
var currentFolder = window.location.pathname.replace(/[^/]*$/, '');
var xhr = new XMLHttpRequest();

//sql password box called out of function as used in two functions. 
var spbox = document.getElementById("sql-password");
var scpbox = document.getElementById("sql-confirmpassword");

//image upload variables
let profilePictureFile = null;
let siteLogoFile = null;

function showStep(step) {
    const stepDiv = document.getElementById(`step-${step}`);
    if (stepDiv) {
        stepDiv.classList.remove('hidden');
        currentStep = step;
    } else {
        console.error(`Step ${step} not found.`);
    }
}

//Function to hide steps
function hideStep(step) {
    const stepDiv = document.getElementById(`step-${step}`);
    if (stepDiv) {
        stepDiv.classList.add('hidden');
    } else {
        console.error(`Step ${step} not found.`);
    }
}

//Function to show next step
function nextStep() {
    hideStep(currentStep);
    currentStep = (currentStep % totalSteps) + 1; // Increment currentStep, reset to 1 if it exceeds totalSteps
    showStep(currentStep);
}

//function to initialize steps
function initializeSteps() {
    // Hide all steps except the initial step
    for (let step = 2; step <= totalSteps; step++) {
        hideStep(step);
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


