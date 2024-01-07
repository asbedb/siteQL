//setting up dependencies (This requires an npm install prior to use)
const fs = require('fs');
const { exec } = require('child_process');

//copy flowbite.js to js folder
fs.copyFile('node_modules/flowbite/dist/flowbite.js', 'install/www/js/flowbite.js', (err) => {
  if (err) throw err;
  console.log('flowbite.js was copied to install/www/js/ folder');
});

// Copy flowbite.min.css to css folder
const readStream = fs.createReadStream('node_modules/flowbite/dist/flowbite.min.css');
const writeStream = fs.createWriteStream('install/www/css/flowbite.min.css');

readStream.pipe(writeStream);

readStream.on('close', () => {
  console.log('flowbite.min.css was copied to install/www/css/ folder');
});

//execute tailwind npm compile (can be re-run with "npm css" command later)
exec("npx tailwindcss -i tailwind/input.css -o install/www/css/theme.css", (err, stdout, stderr) => {
  if (err) {
    console.error();
    console.error("Error Compiling CSS - Make Sure tailwind.config.js is present and pointed to the right directories (if file does nto exist ensure tailwindcss is installed via node [npm i tailwindcss]):");
    console.error(err);
    console.error();
  }
  console.log(stdout);
  console.error(stderr);
});