const fs = require('fs');
const axios = require('axios');
//Can exclude for clarity if prefferred . 
const process = require('process');

/**
 * Reads the content of a file asynchronously and prints it to the console.
 * @param {string} path - The path to the file to be read.
 */
function cat(path) {
    // Read the file asynchronously
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
}

/**
 * Fetches the content of a URL and prints it to the console.
 * @param {string} url - The URL to fetch content from.
 */
async function webCat(url) {
    try {
        // Make a GET request to the URL using Axios
        let response = await axios.get(url);
        // Print the response data to the console
        console.log(response.data);
    } catch (error) {
        // Handle errors if there's an issue fetching the URL
        console.error(`Error fetching ${url}: ${error}`);
        process.exit(1);
    }
}

// Extract the file path or URL from command-line arguments
let path = process.argv[2];

// Check if the argument starts with "http" to determine if it's a URL
if (path.startsWith('http')) {
    // If it's a URL, call the webCat function
    webCat(path);
} else {
    // Otherwise, assume it's a file path and call the cat function
    cat(path);
}
