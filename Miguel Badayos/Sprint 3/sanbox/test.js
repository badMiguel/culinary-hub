const showMoreButton = document.querySelector('.show-more');
const moreContent = document.querySelector('.more-content');

if (showMoreButton && moreContent) { // Check if elements exist
  showMoreButton.addEventListener('click', () => {
    moreContent.classList.toggle('show');
    if (moreContent.classList.contains('show')) {
      showMoreButton.textContent = 'Show Less';
    } else {
      showMoreButton.textContent = 'Show More';
    }
  });
} else {
  console.error("Error: Elements not found!"); // Log error if elements not found
}
