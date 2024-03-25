// Clear localStorage
localStorage.clear();

function saveData() {
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let age = document.getElementById('age').value;

    // Create a string with the form data
    let formDataString = `Full Name: ${fullName}\nEmail: ${email}\nAge: ${age}`;

    // Create a Blob object from the form data string
    let blob = new Blob([formDataString], { type: 'text/plain' });

    // Create a download link and set its attributes
    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'formData.txt';

    // Append the link to the document and simulate a click to trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up by removing the link element from the document
    document.body.removeChild(downloadLink);

    alert('Form data saved as a text file.');
}


// Function to load and display saved form data from localStorage
function displayData() {
    // Retrieve saved form data from localStorage
    let savedDataJSON = localStorage.getItem('formData');

    if (savedDataJSON) {
        // Convert savedDataJSON string to JavaScript object
        let savedData = JSON.parse(savedDataJSON);

        // Display saved form data in the HTML
        document.getElementById('savedFullName').textContent = savedData.fullName;
        document.getElementById('savedEmail').textContent = savedData.email;
        document.getElementById('savedAge').textContent = savedData.age;
    } else {
        // Clear the display if no saved form data is found
        document.getElementById('savedFullName').textContent = '';
        document.getElementById('savedEmail').textContent = '';
        document.getElementById('savedAge').textContent = '';
    }
}

// Call displayData function to load and display saved form data
displayData();