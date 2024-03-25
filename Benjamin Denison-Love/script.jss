let savedDataJSON = localStorage.getItem('formData');
let savedData = savedDataJSON ? JSON.parse(savedDataJSON) : {};

document.getElementById('fullName').value = savedData.fullName || '';
document.getElementById('email').value = savedData.email || '';
document.getElementById('age').value = savedData.age || '';
document.getElementById('reason').value = savedData.reason || '';
document.getElementById('subscribe').checked = savedData.subscribe || false;

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveData() {
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let age = document.getElementById('age').value;
    let reason = document.getElementById('reason').value;
    let subscribe = document.getElementById('subscribe').checked;

    // what is a good number? cdu's number only has 6. that should work.
    let userNumber = generateRandomNumber(1, 999999);

    let subscriptionStatus = subscribe ? 'chose to subscribe' : 'did not choose to subscribe';
    let formDataText = `Full Name: ${fullName}\nEmail: ${email}\nAge: ${age}\nReason: ${reason}\nSubscription Status: User ${subscriptionStatus}.\nUser Number: ${userNumber}`;

    let blob = new Blob([formDataText], { type: 'text/plain' });

    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'formData.txt';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);

    alert('Form data saved as a text file.');
}