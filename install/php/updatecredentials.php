<?php
include 'dbconfig.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = $_POST['user-full-name'];
    $email = $_POST['user-email'];
    $password = password_hash($_POST['user-password'], PASSWORD_BCRYPT);
    $tableName = 'user_account';
    $userIdToUpdate = 1; // Change this to the desired user_id

    // Update data for user_id 1
    $updateStmt = mysqli_prepare($con, "UPDATE $tableName SET full_name = ?, user_email = ?, user_password = ? WHERE user_id = ?");
    
    // Check if the prepare statement was successful
    if ($updateStmt) {
        mysqli_stmt_bind_param($updateStmt, 'sssi', $fullName, $email, $password, $userIdToUpdate);
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
