<?php

function copyDirectory($source, $destination) {
    if (!is_dir($destination)) {
        mkdir($destination, 0777, true);
    }

    $directory = opendir($source);

    while (($file = readdir($directory)) !== false) {
        if ($file != "." && $file != "..") {
            $sourcePath = $source . '/' . $file;
            $destinationPath = $destination . '/' . $file;

            if (is_dir($sourcePath)) {
                copyDirectory($sourcePath, $destinationPath);
            } else {
                copy($sourcePath, $destinationPath);
            }
        }
    }

    closedir($directory);
}

function copyFile($source, $destination) {
    // Ensure the source file exists
    if (!file_exists($source)) {
        return false;
    }

    // Ensure the destination directory exists
    $destinationDir = dirname($destination);
    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0777, true);
    }

    // Copy the file
    return copy($source, $destination);
}

$sourceDirectory = '../www';
$destinationDirectory = '../../www';
$sourceDirectoryImg = '../img';
$destinationDirectoryImg = '../../www/img';
$sourceFileDBConfig = 'dbconfig.php';
$destinationFileDBConfig = '../../www/php/dbconfig.php';

copyDirectory($sourceDirectory, $destinationDirectory);
copyDirectory($sourceDirectoryImg, $destinationDirectoryImg);
copyFile($sourceFileDBConfig, $destinationFileDBConfig);
echo "success"; 

?>