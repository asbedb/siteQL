<?php
include 'dbconfig.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $location = $_POST['user-location'];
    $ptitle = $_POST['user-ptitle'];
    $sitetitle = $_POST['user-sitetitle'];
    $aboutme = $_POST['user-aboutme'];
    $tableName = 'user_account';
    $userIdToUpdate = 1; // Change this to the desired user_id

    // Update data for user_id 1
    $updateStmt = mysqli_prepare($con, "UPDATE $tableName SET user_location = ?, ptitle = ?, site_title= ?, about=? WHERE user_id = ?");
    
    // Check if the prepare statement was successful
    if ($updateStmt) {
        mysqli_stmt_bind_param($updateStmt, 'ssssi', $location, $ptitle, $sitetitle, $aboutme, $userIdToUpdate);
        mysqli_stmt_execute($updateStmt);

        // Check if update was successful
        if (mysqli_stmt_affected_rows($updateStmt) > 0) {
            echo "success";
        } else {
            // No rows affected, user_id 1 might not exist
            exit('User with user_id 1 not found or no changes were made.');
        }

        mysqli_stmt_close($updateStmt);
    } else {
        // An error occurred in preparing the statement
        exit('Failed to prepare statement: ' . mysqli_error($con));
    }
}

// Close the database connection
mysqli_close($con);
?>
