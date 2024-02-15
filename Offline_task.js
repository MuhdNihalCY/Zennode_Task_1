function findValidNumber() {

    // input numbers
    let minimumNumber = parseInt(prompt('Enter Minimum Number: '));
    let maximumNumber = parseInt(prompt('Enter Maximum Number: '));
    let disabledNumberCount = parseInt(prompt('Enter Disabled Number Count: '));
    let disabledNumber = [];

    // input disabled number
    for (i = 1; i <= disabledNumberCount; i++) {
        var Number = parseInt(prompt(`Enter Disabled Number ${i}: `));
        if (parseInt(Number)) {
            disabledNumber.push(Number);
        }
    }

    // input test number
    let testNumber = parseInt(prompt('Enter Test number: '));

    // check if test number is integer
    if (testNumber) {
        checkTestNumber(testNumber);
        function checkTestNumber(number) {
            // check if test number is between minimum number and maximum number
            if (testNumber >= minimumNumber && testNumber <= maximumNumber) {
                // check if test number present in disabled number
                if (disabledNumber.includes(number)) {
                    testNumber += 1;
                    checkTestNumber(testNumber);
                } else {
                    // valid test Number
                    console.log("Valid Number : ", number)
                }

            } else {
                // test number is invalid
                console.log("Inavlid Input - test number - not between minimum and maximum number");
            }
        }
    } else {
        // test number not integer
        console.log('Inavlid Input - test number')
    }

}

findValidNumber(); 