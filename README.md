# siteQL

[![GitHub issues](https://img.shields.io/github/issues/asbedb/devfolio.svg)](https://github.com/asbedb/siteQL/issues)
[![GitHub stars](https://img.shields.io/github/stars/asbedb/devfolio.svg)](https://github.com/asbedb/siteQL/stargazers)

siteQL is my first major undertaking to build a full-stack web application using NextJS, TypeScript and various libraries associated. 

The application is built to be a modular SQL database/website aplication installer with credentials created and hashed for first user login. 

The installer goes through a guided form and finalises with a database configuration and reroute. 

## Table of Contents
- [Prerequisites](#Prerequisites)
- [Installation](#installation)
- [API's](#API's)



## Prerequisites
To run siteQL locally you will need to [install NodeJS](https://nodejs.org/en/download) alongside a SQL service of your choice. I recommend either a predefined docker image focused on the LAMP stack or the [XAMPP stack](https://www.apachefriends.org/download.html) 

In addition whilst not required a front end tool such as [phpMyAdmin](https://www.phpmyadmin.net/downloads/) would be useful in visually validating SQL data structures during the installation process.

## Installation
To install siteQL locally
### 1. Make sure you have completed the [prerequisites](#prerequisites).

### 2. (Optional) [Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) the repository as your own repo if you wish to build a project on top of siteQL.

### 3. Clone the forked repository to your local machine
First, navigate to the folder where you want to store the project on your local machine using the terminal. Then run this command to clone your fork:
```sh
git clone https://github.com/<YOUR_GITHUB_ACCOUNT_NAME>/siteQL.git 
```
Ensure to Replace <YOUR_GITHUB_ACCOUNT_NAME> with your actual GitHub username. This command creates a copy of the repository on your computer where you can make changes.

### 4. Navigate to the project directory
After cloning is complete, change your current directory to the newly created project folder:
```sh
cd siteQL
```
This command opens the project folder where you'll find all the source code and project files. Note that the directory name is case-sensitive, so make sure to use the exact same capitalization as shown in the previous step.

### 5. Install the required node package dependencies
Run the following command in your terminal to install all the necessary packages defined in the project's package.json file:
```sh
npm i
```
This command (shorthand for npm install) will automatically download and set up all required Node.js packages, including the NextJS framework and other dependencies needed for the front-end. The installation process may take several minutes depending on your internet connection speed.

### 10. Start your SQL database service
Before running the application, ensure your SQL database service is active and running:

* If using XAMPP: Open the XAMPP Control Panel and click the "Start" button next to the MySQL service. The status indicator should turn green when the service is running.
* If using a standalone SQL Server: Verify that the service is running in your system's Services management console.
* If using a cloud-hosted SQL database: No action needed, as the service should be continuously available.

This step is crucial because siteQL requires an active database connection to function properly. Without a running SQL service, you may encounter connection errors when trying to start the application.

### 11. Start the NextJS frontend server

   ```sh
   npm run dev
   ```
Open your browser and visit <http://localhost:3000> to see the application running.

## API's

#### Connection API's
- [checkInstallation](#checkInstallation)
- [createDatabase](#createDatabase)
- [createTable](#createTable)
- [finalInstallCheck](#finalinstallcheck)
- [login](#login)
- [siteDataRender](#sitedatarender)
- [sqlServicePing](#sqlserviceping)
- [updateCredentials](#updatecredentials)
- [updateDatabase](#updatedatabase)

#### Config API's
- [imageUploader]


### checkInstallation
Request Type: GET()
Primary Function:
The checkInstallation API endpoint verifies the application's connection status to the SQL backend database. It examines local environment variables (accessed through process.env) and returns:

1. The current connection status to the database
2. A list of environment variables, indicating which are configured and which are missing or unconfigured

This endpoint is served through a popover component to help quickly identify configuration issues during setup or troubleshooting. It enables verification that all required database connection parameters are properly set before attempting to use the application's data-dependent features.


### createDatabase
Request Type: POST()
Primary Function:
The createDatabase API endpoint initializes the application's database infrastructure by:

1. Creating a Primary database for the application.
2. Establishing a ``main`` table within this databse with the following schema:

```
Table Name: main
Table Fields:
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    location VARCHAR(255),
    app_title VARCHAR(255),
    about_app VARCHAR(255),
    pfp_image VARCHAR(255),
    app_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

Upon successful creation of both the database and table, this endpoint automatically updates the application's environment variables by writing the validated database connection details to an ENV file. 

### createTable
Request Type: POST()
Primary Function:
The createTable API endpoint handles the creation and management of database tables based on validated POST data from the application. Its key functions include:

1. Validating the table specification data received in the POST request
2. Determining whether a requested table already exists
3. Creating new tables when they don't exist, using the validated specifications
4. Updating existing tables according to the provided schema when modifications are needed

### finalInstallCheck
Request Type: GET() POST()
Primary Function:
The finalInstallCheck API endpoint serves a dual purpose through bouth GET and POST requests.

1. GET() Request:

* Performs validation of database connectivity by executing SQL queries
* Evaluates each environment variable against relevant test cases to verify proper configuration
* Returns detailed diagnostics about the success or failure of each test, providing actionable feedback for troubleshooting

The results of this request are rendered by the FinaliseInstallation component. 


2. POST Request:

Upon receiving confirmation that all tests have passed successfully the POST() request writes a final environment variable that signals installation completion this enables the application to transition from setup mode to full operational functionality.

### login
Request Type: POST()
Primary Function:
The login API endpoint processes authentication requests from the LoginForm component by:

* Accepting user credentials (typically email/username and password) from the form submission
* Validating these credentials against user records stored in the ``main`` database
* Employing bcrypt to securely handle password verification through cryptographic comparison instead of plain text matching
* Generating and returning appropriate authentication tokens or session information upon successful validation

### siteDataRender
Request Type: GET()
Primary Function:
The siteDataRender API endpoint retrieves information from the ``main`` database to render on relevant components. The current implementation returns:

* user_email
* full_name
* location
* app_title
* about_app
* pfp_image
* app_image

### sqlServicePing
Request Type: GET()
Primary Function:
The sqlServicePing API endpoint essentially pings the SQL Server (based on details in env file) and returns a status of success or fail which in turn can be rendered in various ways. Currently it is being utlised to render the ServicePing component. 

### updateCredentials
Request Type: POST()
Primary Function:
The updateCredentails API endpoint is used to create and store credentials (full name, user email, password) within the ``main`` database allowing the user to login post installation. Should the user already exist the API will overwrite the current username and password with the updated details. 

### updateDatabase
Request Type: POST()
Primary Function:
The updateDatabse API endpoint is used to create and store information associated with the application in the ``main`` database (location, app title, about app). Should information already exist the endpoint will overwrite details accordingly

### imageUploader
Request Type: POST()
Primary Function:
The image uploader API endpoint ensures that images are stored in the ``public/img folder``. It categorizes and datestamps each image to maintain a history for future reference. This system serves the most recently uploaded image as the primary profile picture for both users and applications, while also keeping previous versions accessible