<?php
error_reporting(E_ALL);
// Retrieve form data
$DATABASE_HOST = !empty($_POST['sql-host']) ? $_POST['sql-host'] : 'localhost';
$DATABASE_USER = !empty($_POST['sql-user']) ? $_POST['sql-user'] : 'root';
$DATABASE_PASS = !empty($_POST['sql-password']) ? $_POST['sql-password'] : '';
$DATABASE_NAME = !empty($_POST['sql-dbname']) ? $_POST['sql-dbname'] : 'devfolio';

// Update the database connection and check if credentials are correct
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS);

if (!$con) {
    // Connection failed
    exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}

$checkDatabaseQuery = 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "' . $DATABASE_NAME . '"';
$result = mysqli_query($con, $checkDatabaseQuery);

if (!$result) {
    // Connection failed
    exit('Failed to check if database exists: ' . mysqli_error($con));
}

if (mysqli_num_rows($result) == 0) {
    // Database doesn't exist, create it
    $createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS ' . $DATABASE_NAME;

    if (!mysqli_query($con, $createDatabaseQuery)) {
        exit('Failed to create database: ' . mysqli_error($con));
    }
}

$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);

if (!$con) {
    // Connection failed
    exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}

// Create the user_account table if it doesn't exist
$createTableQuery = 'CREATE TABLE IF NOT EXISTS user_account (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    user_location VARCHAR(255),
    ptitle VARCHAR(255),
    site_title VARCHAR(255),
    about VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)';

if (!mysqli_query($con, $createTableQuery)) {
    exit('Failed to create table: ' . mysqli_error($con));
}

mysqli_close($con);

// Write form data to a configuration file
$config = "<?php\n";
$config .= "session_start();\n";
$config .= "session_regenerate_id();\n";
$config .= "\$DATABASE_HOST = '$DATABASE_HOST';\n";
$config .= "\$DATABASE_USER = '$DATABASE_USER';\n";
$config .= "\$DATABASE_PASS = '$DATABASE_PASS';\n";
$config .= "\$DATABASE_NAME = '$DATABASE_NAME';\n";
$config .= "// Try and connect using the info above.\n";
$config .= "\$con = mysqli_connect(\$DATABASE_HOST, \$DATABASE_USER, \$DATABASE_PASS, \$DATABASE_NAME);\n";
$config .= "if (mysqli_connect_errno()) {\n";
$config .= "    // If there is an error with the connection, stop the script and display the error.\n";
$config .= "    exit('Failed to connect to MySQL: ' . mysqli_connect_error());\n";
$config .= "}\n";
$config .= "?>";

file_put_contents(__DIR__ . '/dbconfig.php', $config);
// Send a success response (important for XHR)
echo "success"; 
?>
