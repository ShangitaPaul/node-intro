const fs = require('fs');
const axios = require('axios');
//Can exclude if preferred 
const process = require('process');

/**
 * Handles output: writes to file if 'out' argument is provided, else prints to console.
 * @param {string} text - The text to be written to file or printed.
 * @param {string} out - The file path to write the text to, if provided.
 */
function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

/**
 * Reads the content of a file asynchronously and prints it out or writes it to a file if 'out' argument is provided.
 * @param {string} path - The path to the file to be read.
 * @param {string} out - The file path to write the content to, if provided.
 */
function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

/**
 * Fetches the content of a URL and prints it out or writes it to a file if 'out' argument is provided.
 * @param {string} url - The URL to fetch content from.
 * @param {string} out - The file path to write the content to, if provided.
 */
async function webCat(url, out) {
    try {
        let response = await axios.get(url);
        handleOutput(response.data, out);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error}`);
        process.exit(1);
    }
}

let path;
let out;

// Check if the '--out' flag is provided in the command-line arguments
if (process.argv[2] === '--out') {
    // Extract the output file path and input file path from the command-line arguments
    out = process.argv[3];
    path = process.argv[4];
} else {
    // If '--out' flag is not provided, extract the input file path from the command-line arguments
    path = process.argv[2];
}

// Check if the input file path starts with "http" to determine if it's a URL
if (path.startsWith('http')) {
    // If it's a URL, call the webCat function
    webCat(path, out);
} else {
    // If it's not a URL, call the cat function
    cat(path, out);
}
