// Removing the need for magic numbers by making the array size a global constant
const globalArraySize = 16;

// Drum Arrays
let kicks = new Array(globalArraySize).fill(false);
let snares = new Array(globalArraySize).fill(false);
let hiHats = new Array(globalArraySize).fill(false);
let rideCymbals = new Array(globalArraySize).fill(false);

// Object for mapping property strings to arrays
// Bypasses the need for switch...case branches for each array by invoking by prop instead, since it is assumed a valid input will be one that matches the name
const drumKit = {
    'kicks': kicks,
    'snares': snares,
    'hiHats': hiHats,
    'rideCymbals': rideCymbals
}

function toggleDrum(drum, index) {
    // Input validation
    if (!isValidInstrument(drum) || !isValidIndex(index)) {
        return null;
    }

    // Invert value for specified instrument
    drumKit[drum][index] = !drumKit[drum][index];
}

function clear(drum) {
    // Input validation
    if (!isValidInstrument(drum)) {
        return null;
    }

    // Reset array to false
    drumKit[drum].fill(false);
}

function invert(drum) {
    // Input validation
    if (!isValidInstrument(drum)) {
        return null;
    }

    // Invert the specified array
    for (element in drumKit[drum]) {
        drumKit[drum][element] = !drumKit[drum][element];
    }
}

// Bonus function - Note offset is a default attribute so we can allow the option for it to be changed if ever needed, but without impeding the function for test purposes.
function getNeighborPads(x, y, size, offset = 1) {
    // Co-ordinate validation
    if (x < 0 || x >= size || y < 0 || y >= size) {
        return [];
    }

    // Create an array with the co-ordinates to test with (top, right, bottom, left)
    const testSet = [
        [x, (y - offset)], 
        [(x + offset), y], 
        [x, (y + offset)], 
        [(x - offset), y]
    ];
    const outputArray = [];

    // Iterate through each test and ensure their values are within constraints. Push the results that pass.
    for (const element of testSet) {
        if (element[0] >= 0 && element[0] < size && element[1] >= 0 && element[1] < size) {
            outputArray.push(element);
        }
    }

    // Return final result
    return outputArray;
}

// Helper function - Checks if the instrument is a valid type or matches the valid instrument list. Returns true if valid, otherwise returns false.
function isValidInstrument(instrument) {
    // Define what instruments are considered 'valid'
    const validInstruments = ['kicks', 'snares', 'hiHats', 'rideCymbals'];

    // Type validation
    if (typeof instrument !== 'string') {
        return false;
    }

    // Check the instrument exists in our array
    if (validInstruments.includes(instrument)) {
        return true;
    }

    // Cascading logic, return false as the default
    return false;
}

// Helper function - Checks if the index is within the acceptable range of the drum array
function isValidIndex(index) {
    // Index value validation
    if (index >= 0 && index < globalArraySize) {
        return true;
    }

    // Cascading logic, return false as the default
    return false;
}