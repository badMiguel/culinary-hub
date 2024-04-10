const likeButton = document.querySelector('.card-icons-button');
const likeCount = document.querySelector('.card-icons-count');

const bookmarkButton = document.getElementById('bookmarkButton');

let currentLikeCount = 0; // Initialize like count

likeButton.addEventListener('click', function() {
  this.parentElement.classList.toggle('card-icons-selected');

  if (this.parentElement.classList.contains('card-icons-selected')) {
    currentLikeCount++;
  } else {
    currentLikeCount = Math.max(currentLikeCount - 1, 0); // Ensure count doesn't go below 0
  }

  likeCount.textContent = currentLikeCount;
});

bookmarkButton.addEventListener('click', function() {
  this.parentElement.classList.toggle('card-icons-selected'); // Toggle selected class for bookmark icon

  if (this.parentElement.classList.contains('card-icons-selected')) {
    // Change bookmark icon color to yellow
    this.style.color = '#ffdf00';
  } else {
    this.style.color = '#555555'; // Reset bookmark icon color to default grey
  }

});
