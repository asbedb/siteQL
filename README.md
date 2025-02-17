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

### Connections
- [checkInstallation](#checkInstallation)
- [createDatabase](#createDatabase)
- [createTable](#createTable)
- [finalInstallCheck]
- [login]
- [siteDataRender]
- [sqlServicePing]
- [updateCredentials]
- [updateDatabase]

### Config
- [imageUploader]


#### checkInstallation
abc


#### createDatabase


#### createTable