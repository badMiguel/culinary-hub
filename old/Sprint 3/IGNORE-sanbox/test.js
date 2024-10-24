const shareButton = document.getElementById('share-button');
const sharePopup = document.getElementById('share-popup');
const closePopupButton = document.getElementById('close-popup');
const copyLinkButton = document.getElementById('copy-link');

shareButton.addEventListener('click', () => {
    sharePopup.classList.toggle('visible');
});

closePopupButton.addEventListener('click', () => {
    sharePopup.classList.remove('visible');
});

// Implement clipboard.js (or a similar library) to handle copy functionality
// You can include clipboard.js from a CDN or download it locally
// See https://clipboard.js.org/ for usage instructions

// Example usage assuming clipboard.js is loaded:
copyLinkButton.addEventListener('click', () => {
    const clipboard = new ClipboardJS('#copy-link');
    clipboard.on('success', () => {
        alert('Link copied to clipboard!');
    });
    clipboard.on('error', () => {
        alert('Failed to copy link!');
    });
});
