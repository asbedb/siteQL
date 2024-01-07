//Installer all build on one page showing and hiding steps these are the number of steps and starting the current step at one
const totalSteps = 5;
let currentStep = 1; 

//html variable for capturing an original button
let originalButtonHTML;

// variable for toast notifications and toast text
var successtoast = document.getElementById("toast-success");
var successTextElement = successtoast.querySelector('.ms-3');
var failtoast = document.getElementById("toast-fail");
var failTextElement = failtoast.querySelector('.ms-3');

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

// Function to show the loading spinner inside a section
function showLoadingSpinnerButton(section) {
    // Save the original button HTML if it's not already saved
    if (!originalButtonHTML) {
        originalButtonHTML = section.innerHTML;
    }

    // Replace the button with the loading spinner
    section.innerHTML = `
        <button disabled type="button" class="flex justify-center w-full py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 items-center">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            Loading...
        </button>
    `;
}

// Function to show the form has been saved
function contentSavedButton(section) {
    // Replace the button with the greyed out Saved Button
    section.innerHTML = `
        <button disabled type="button" class="flex justify-center w-full py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 items-center">
            Saved - Please Continue
        </button>
    `;
}

//Function to restore an original button after clicking a "save"
function restoreOriginalButton(section) {
    if (originalButtonHTML) {
        section.innerHTML = originalButtonHTML;
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
        failtoast.classList.remove("hidden");
        failTextElement.textContent = "Passwords Don't Match - Try Again";
        //light mode
        spbox.classList.replace("bg-gray-50", "bg-red-50");
        scpbox.classList.replace("bg-gray-50", "bg-red-50");
        //dark mode
        spbox.classList.replace("dark:bg-gray-700", "dark:bg-red-500");
        scpbox.classList.replace("dark:bg-gray-700", "dark:bg-red-500");
        return;
    }else{
        //light mode
        spbox.classList.replace("bg-gray-50", "bg-green-300");
        scpbox.classList.replace("bg-gray-50", "bg-green-300");
        //dark mode
        spbox.classList.replace("dark:bg-gray-700", "dark:bg-green-500");
        scpbox.classList.replace("dark:bg-gray-700", "dark:bg-green-500");
        //check if previous attempt failed
        if (spbox.classList.contains("dark:bg-red-500")) {
            //dark mode
            spbox.classList.replace("dark:bg-red-500", "dark:bg-green-500");
            scpbox.classList.replace("dark:bg-red-500", "dark:bg-green-500"); 
        }else{
            //dark mode
            spbox.classList.replace("dark:bg-red-500", "dark:bg-green-500");
            scpbox.classList.replace("dark:bg-red-500", "dark:bg-green-500");
        }
    }

    var saveButtonLoadWrapper = document.getElementById("button-load-wrapper-sql");
    showLoadingSpinnerButton(saveButtonLoadWrapper);

    // Make an AJAX request
    var updateUrl = currentFolder + "php/updatehost.php";
    xhr.open("POST", updateUrl, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // Handle the response from the server
            if (xhr.status == 200) {
                // Connection successful
                var response = xhr.responseText.trim();
                if (response === "success") {
                    setTimeout(function () {
                        successtoast.classList.remove("hidden");
                        successTextElement.textContent = "Success - dbconfig.php Created"
                        contentSavedButton(saveButtonLoadWrapper);
                    }, 3000);
                    
                } else {
                    setTimeout(function () {
                        alert("Connection Failed, Please Try Again");
                        console.log(xhr.responseText);
                        restoreOriginalButton(saveButtonLoadWrapper);
                    }, 3000);
                }
            } else {
                // Connection failed
                failtoast.classList.remove("hidden");
                failTextElement.textContent = "Can't Write to Serer - Check Permissions and Server Config";
            }
        
        }
    };

    // Send form data to the server
    xhr.send(formData);
}

//function call to update the credentials input
function updateCredentials(){
    const formData = new FormData(document.getElementById("credentials-form"));
    var pbox = document.getElementById("user-password");
    var cpbox = document.getElementById("user-confirmpassword");
    var password = formData.get('user-password');
    var confirmPassword = formData.get('user-confirmpassword');
    var saveButtonLoadWrapper = document.getElementById("button-load-wrapper-credentials");
    showLoadingSpinnerButton(saveButtonLoadWrapper);
    var updateUrl = currentFolder + "php/updatecredentials.php";




    // Check if passwords match
    if (password !== confirmPassword) {
        failtoast.classList.remove("hidden");
        failTextElement.textContent = "Passwords Don't Match - Try Again";
        //light mode
        pbox.classList.replace("bg-gray-50", "bg-red-50");
        cpbox.classList.replace("bg-gray-50", "bg-red-50");
        //dark mode
        pbox.classList.replace("dark:bg-gray-700", "dark:bg-red-500");
        cpbox.classList.replace("dark:bg-gray-700", "dark:bg-red-500");
        return;
    }else{
        //light mode
        pbox.classList.replace("bg-gray-50", "bg-green-50");
        cpbox.classList.replace("bg-gray-50", "bg-green-50");
        //dark mode
        pbox.classList.replace("dark:bg-gray-700", "dark:bg-green-500");
        cpbox.classList.replace("dark:bg-gray-700", "dark:bg-green-500");
        //check if previous attempt failed
        if (pbox.classList.contains("dark:bg-red-500")) {
            console.log("red detected");
            //dark mode
            pbox.classList.replace("dark:bg-red-500", "dark:bg-green-500");
            cpbox.classList.replace("dark:bg-red-500", "dark:bg-green-500"); 
        }else{
            //light mode
            pbox.classList.replace("bg-red-50", "bg-green-50");
            cpbox.classList.replace("bg-red-50", "bg-green-50");  
        }
    }

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
                        successtoast.classList.remove("hidden");
                        successTextElement.textContent = "Success - Credentials Updated"
                        contentSavedButton(saveButtonLoadWrapper);
                    }, 3000);
                    
                } else {
                    setTimeout(function () {
                        alert("Writing Credentials Failed, Please Try Again");
                        console.log(xhr.responseText);
                        restoreOriginalButton(saveButtonLoadWrapper);
                    }, 3000);
                }
            } else {
                // Connection failed
                failtoast.classList.remove("hidden");
                failTextElement.textContent = "Can't Write to DB - Check DB Permissions";
            }
        }
    };
    // Send form data to the server
    xhr.send(formData);
}

//function call to update the about input
function updateAbout(){
    const formData = new FormData(document.getElementById("about-form"));
    var saveButtonLoadWrapper = document.getElementById("button-load-wrapper-about");
    showLoadingSpinnerButton(saveButtonLoadWrapper);
    var updateUrl = currentFolder + "php/updateabout.php";
    
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
                        successtoast.classList.remove("hidden");
                        successTextElement.textContent = "Success - Information Updated"
                        contentSavedButton(saveButtonLoadWrapper);
                    }, 3000);
                    
                } else {
                    setTimeout(function () {
                        alert("Writing Information Failed, Please Try Again");
                        console.log(xhr.responseText);
                        restoreOriginalButton(saveButtonLoadWrapper);
                    }, 3000);
                }
            } else {
                // Connection failed
                failtoast.classList.remove("hidden");
                failTextElement.textContent = "Can't Write to DB - Check DB Permissions";
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
        //light mode
        spbox.classList.replace("bg-gray-50", "bg-blue-50");
        scpbox.classList.replace("bg-gray-50", "bg-blue-50");
        //darkmode
        spbox.classList.replace("dark:bg-gray-700", "dark:bg-blue-800");
        scpbox.classList.replace("dark:bg-gray-700", "dark:bg-blue-800");
    }else{
        spbox.disabled = false;
        scpbox.disabled = false;
        spbox.classList.replace("bg-blue-50", "bg-gray-50");
        scpbox.classList.replace("bg-blue-50", "bg-gray-50");
        spbox.classList.replace("dark:bg-blue-800", "dark:bg-gray-700");
        scpbox.classList.replace("dark:bg-blue-800", "dark:bg-gray-700");
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
    var saveButtonLoadWrapper = document.getElementById("button-load-wrapper-upload");
    showLoadingSpinnerButton(saveButtonLoadWrapper);
    formData.append('profile-picture', profilePictureFile);
    formData.append('site-logo', siteLogoFile);

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
            successtoast.classList.remove("hidden");
            successTextElement.textContent = "Success - Image(s) uploaded"
            restoreOriginalButton(saveButtonLoadWrapper);
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
    var saveButtonLoadWrapper = document.getElementById("button-load-wrapper-finish");
    showLoadingSpinnerButton(saveButtonLoadWrapper);
    
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
                failtoast.classList.remove("hidden");
                failTextElement.textContent = "Connection to Script Failed";
            }
        }
    };

    // Send the AJAX request
    xhr.send();
}


