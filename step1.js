const fs = require('fs');
const process = require('process');

/**
 * Reads the content of a file synchronously and prints it to the console.
 * @param {string} path - The path to the file to be read.
 */
function cat(path) {
    try {
        // Read the file synchronously
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                // Handle errors if the file doesn't exist or cannot be read
                console.error(`Error reading ${path}: ${err}`);
                process.exit(1);
            } else {
                // Print the contents to the console
                console.log(data);
            }
        });
    } catch (error) {
        // Handle errors during file reading
        console.error(`Error reading ${path}: ${error}`);
        process.exit(1);
    }
}

/**
 * Extracts the file path from command-line arguments and calls the cat function.
 */
function main() {
    // Extract the file path from command-line arguments
    const filePath = process.argv[2];

    // Call the cat function with the file path obtained from command-line arguments
    cat(filePath);
}

// Call the main function to start the script execution
main();
