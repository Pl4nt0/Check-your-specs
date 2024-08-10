function findSpecs() {
    const make = document.getElementById('make').value;
    const year = document.getElementById('year').value;
    const resultDiv = document.getElementById('result');

    if (make === '' || year === '') {
        resultDiv.innerHTML = 'Please enter both the make and year.';
        return;
    }

    // Make the API request to your Glitch backend
    fetch('https://glitch.com/edit/#!/fuchsia-fanatical-lip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ make: make, year: year })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultDiv.innerHTML = 'Error: ' + data.error;
        } else {
            // Display the specs
            let specsHtml = '<h3>Specifications</h3>';
            specsHtml += '<p><strong>Make:</strong> ' + make + '</p>';
            specsHtml += '<p><strong>Year:</strong> ' + year + '</p>';
            specsHtml += '<p><strong>Model:</strong> ' + data.model + '</p>';
            specsHtml += '<p><strong>Frame Material:</strong> ' + data.frame_material + '</p>';
            specsHtml += '<p><strong>Wheel Size:</strong> ' + data.wheel_size + '</p>';
            // Add other specs as needed

            resultDiv.innerHTML = specsHtml;
        }
    })
    .catch(error => {
        resultDiv.innerHTML = 'An error occurred: ' + error.message;
    });
}
