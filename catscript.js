// Get reference to the recipes container
const recipesContainer = document.getElementById('recipes');

// Function to display a recipe
function displayRecipe(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');

    // HTML structure for the recipe display
    const html = `
        <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
        <h2>${recipe.recipe_title}</h2>
        <p>${recipe.recipe_description}</p>
        <!-- Add more recipe details here -->
    `;

    recipeElement.innerHTML = html;
    recipesContainer.appendChild(recipeElement);
}

// Function to fetch recipe data and display recipes
function fetchRecipeDataAndDisplay() {
    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => {
            // Display each recipe
            data.forEach(recipe => displayRecipe(recipe));
        })
        .catch(error => console.error('Error fetching recipe data:', error));
}

// Call the function to fetch recipe data and display recipes
fetchRecipeDataAndDisplay();




//var coll = document.getElementsByClassName("collapsible");
//var i;

//for (i = 0; i < coll.length; i++) {
//  coll[i].addEventListener("click", function() {
//    this.classList.toggle("active");
//    var content = this.nextElementSibling;
//    if (content.style.display === "block") {
//      content.style.display = "none";
//    } else {
//      content.style.display = "block";
//    }
//  });
//}