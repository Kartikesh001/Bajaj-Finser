// Simple test cases to verify API functionality
const testCases = [
    {
        name: "Example A",
        data: ["a","1","334","4","R", "$"],
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334","4"],
            alphabets: ["A","R"],
            special_characters: ["$"],
            sum: "339"
        }
    },
    {
        name: "Example B", 
        data: ["2","a", "y", "4", "&", "-", "*", "5","92","b"],
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2","4","92"],
            alphabets: ["A", "Y", "B"],
            special_characters: ["&", "-", "*"],
            sum: "103"
        }
    },
    {
        name: "Example C",
        data: ["A","ABcD","DOE"],
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A","ABCD","DOE"],
            special_characters: [],
            sum: "0"
        }
    }
];

// Function to simulate API logic for testing
function simulateAPI(data) {
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;

    // Helper functions
    function isNumber(char) {
        return !isNaN(char) && !isNaN(parseFloat(char));
    }

    function isAlphabet(char) {
        return /^[a-zA-Z]$/.test(char);
    }

    function isSpecialCharacter(char) {
        return !isNumber(char) && !isAlphabet(char);
    }

    // Process each item
    data.forEach(item => {
        const itemStr = String(item);
        
        if (isNumber(itemStr)) {
            const num = parseInt(itemStr);
            sum += num;
            
            if (num % 2 === 0) {
                evenNumbers.push(itemStr);
            } else {
                oddNumbers.push(itemStr);
            }
        }
        else if (itemStr.split('').every(char => isAlphabet(char))) {
            alphabets.push(itemStr.toUpperCase());
        }
        else if (itemStr.split('').every(char => isSpecialCharacter(char))) {
            specialCharacters.push(itemStr);
        }
        else if (itemStr.split('').some(char => isAlphabet(char))) {
            alphabets.push(itemStr.toUpperCase());
        }
        else {
            specialCharacters.push(itemStr);
        }
    });

    return {
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: sum.toString()
    };
}

// Run tests
console.log("Running API Logic Tests...\n");

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`Input: ${JSON.stringify(testCase.data)}`);
    
    const result = simulateAPI(testCase.data);
    
    console.log("Expected:", JSON.stringify(testCase.expected, null, 2));
    console.log("Got:", JSON.stringify(result, null, 2));
    
    // Simple comparison
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
    console.log(`Result: ${passed ? "PASS" : "FAIL"}\n`);
});

console.log("Test completed!");