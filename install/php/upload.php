<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Specify the destination folder for uploaded files
    $uploadFolder = "../img/";

    // Function to handle file upload
    function handleFileUpload($file, $destination) {
        if ($file["error"] == UPLOAD_ERR_OK) {
            move_uploaded_file($file["tmp_name"], $destination);
            return true;
        } else {
            return false;
        }
    }

    $profilePictureFile = $_FILES["profile-picture-button"] ?? null;
    $siteLogoFile = $_FILES["site-logo-button"] ?? null;

    $profilePictureDestination = $uploadFolder . "pfp.png";
    $siteLogoDestination = $uploadFolder . "site_logo.png";

    $profilePictureUploaded = handleFileUpload($profilePictureFile, $profilePictureDestination);
    $siteLogoUploaded = handleFileUpload($siteLogoFile, $siteLogoDestination);

    if ($profilePictureUploaded || $siteLogoUploaded) {
        echo "Files uploaded successfully.";
    } else {
        echo "No files were uploaded or an error occurred during upload.";
    }
} else {
    echo "Invalid request method.";
}
?>
