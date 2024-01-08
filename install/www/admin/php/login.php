<?php
require_once '../../php/dbconfig.php';

// Function to handle errors and store error message in session
function handle_error($error_message) {
    // Start or resume the session
    session_start();

    // Store the error message in a session variable
    $_SESSION['error_message'] = $error_message;

    // Redirect to the index page
    header('Location: ../index.php');
    exit(); // Ensure that no further code is executed after the redirect
}



if (isset($_POST['login-email'], $_POST['login-password'])) {
    $email = $_POST['login-email'];
    $password = $_POST['login-password'];

    // Check if the user exists in the database
    $stmt = $con->prepare('SELECT user_id, user_password, full_name FROM user_account WHERE user_email = ?');
    $stmt->bind_param('s', $email);
    if ($stmt->execute()) {
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $hashed_password, $full_name);
            $stmt->fetch();
            
            // Verify the password
            if (password_verify($password, $hashed_password)) {
                // Password is correct, create sessions
                $_SESSION['loggedin'] = true;
                $_SESSION['user_id'] = $id;
                $_SESSION['full_name'] = $full_name;
                echo 'success';
                exit();
            } else {
                handle_error('Incorrect username and/or password!');
            }
        } else {
            handle_error('Incorrect username and/or password!');
        }
    } else {
        handle_error('Database error: ' . $con->error);
    }
    $stmt->close();
} else {
    handle_error('Please fill both the username and password fields!');
}


?>
