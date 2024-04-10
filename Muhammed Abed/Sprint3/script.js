// document.querySelectorAll(".post").forEach(post => {
// 	const postId = post.dataset.postId;
// 	const ratings = post.querySelectorAll(".card-icons");
// 	const likeRating = ratings[0];

// 	ratings.forEach(rating => {
// 		const button = rating.querySelector(".card-icons-button");
// 		const count = rating.querySelector(".card-icons-count");

// 		button.addEventListener("click", async () => {
// 			if (rating.classList.contains("card-icons-selected")) {
// 				return;
// 			}

// 			count.textContent = Number(count.textContent) + 1;

// 			ratings.forEach(rating => {
// 				if (rating.classList.contains("card-icons-selected")) {
// 					const count = rating.querySelector(".card-icons-count");

// 					count.textContent = Math.max(0, Number(count.textContent) - 1);
// 					rating.classList.remove("card-icons-selected");
// 				}
// 			});

// 			rating.classList.add("card-icons-selected");

// 			const likeOrDislike = likeRating === rating ? "like" : "dislike";
// 			const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
// 			const body = await response.json();
// 		});
// 	});
// });

// // Select the favorite button element
// const favoriteButton = document.querySelector('.card-icons-selected .material-icons');

// // Add a click event listener to the button
// favoriteButton.addEventListener('click', function() {
//   // Toggle the class 'card-icons-selected' which controls the color
//   this.parentElement.classList.toggle('card-icons-selected');
// });
// const favoriteButton = document.querySelector('.card-icons-button');

// favoriteButton.addEventListener('click', function() {
//   this.parentElement.classList.toggle('card-icons-selected');
// });

// const favoriteButton = document.querySelector('.card-icons-button');
// const favoriteCount = document.querySelector('.card-icons-count');

// let currentCount = 0; // Initialize favorite count

// favoriteButton.addEventListener('click', function() {
//   this.parentElement.classList.toggle('card-icons-selected');

//   if (this.parentElement.classList.contains('card-icons-selected')) {
//     currentCount++;
//   } else {
//     currentCount = Math.max(currentCount - 1, 0); // Ensure count doesn't go below 0
//   }

//   favoriteCount.textContent = currentCount;
// });
const favoriteButton = document.querySelector('.card-icons-button');
const favoriteCount = document.querySelector('.card-icons-count');

const bookmarkButton = document.getElementById('bookmarkButton');

let currentFavoriteCount = 0; // Initialize favorite count

favoriteButton.addEventListener('click', function() {
  this.parentElement.classList.toggle('card-icons-selected');

  if (this.parentElement.classList.contains('card-icons-selected')) {
    currentFavoriteCount++;
  } else {
    currentFavoriteCount = Math.max(currentFavoriteCount - 1, 0); // Ensure count doesn't go below 0
  }

  favoriteCount.textContent = currentFavoriteCount;
});

bookmarkButton.addEventListener('click', function() {
  this.parentElement.classList.toggle('card-icons-selected'); // Toggle selected class for bookmark icon

  if (this.parentElement.classList.contains('card-icons-selected')) {
    // Change bookmark icon color to yellow (similar to favorite icon)
    this.style.color = '#ffdf00';
  } else {
    this.style.color = '#555555'; // Reset bookmark icon color to default grey
  }

  // Removed reference to bookmarkCount as it's not required anymore
});
