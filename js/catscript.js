document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load json file
        const recipeData = await loadJSON();
        console.log('Loaded recipe data:', recipeData);
        
        // Select a random recipe
        const randomIndex = Math.floor(Math.random() * recipeData.length);
        const randomRecipe = recipeData[randomIndex];
        console.log('Selected random recipe:', randomRecipe);
        
        // Get data for the random recipe
        const {
            recipe_link,
            recipe_image,
            recipe_title,
            recipe_description,
            prep_time,
            allergens,
            cooking_skill_level,
            cuisine_type,
        } = randomRecipe;

        // Update HTML elements with recipe data
        const recipeLink = document.getElementById('link');
        recipeLink.href = recipe_link;
        
        const recipePicture = document.getElementById('image');
        recipePicture.src = recipe_image;
        recipePicture.style.width = '100%';

        const recipeTitle = document.getElementById('recipe-title').querySelector('a');
        recipeTitle.textContent = recipe_title;
        recipeTitle.href = recipe_link;

        const description = document.getElementById(`description`);
        description.textContent = recipe_description;

        const prepTime = document.getElementById(`prep-time`);
        prepTime.textContent = prep_time;
        
        const recipeAllergens = document.getElementById(`allergens`);
        recipeAllergens.textContent = allergens.join(", ");

        const skillLevel = document.getElementById(`skill-level`);
        skillLevel.textContent = cooking_skill_level;

        const foodCategory = document.getElementById(`cuisine`);
        foodCategory.textContent = cuisine_type;
    } catch (error) {
        console.error('Error:', error);
    }
});

// Load json file in recipe information
async function loadJSON() {
    try {
        const response = await fetch('recipe_data.json');
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error loading JSON file:', error);
        throw error; // Re-throw the error to catch it in the calling code
    }
}




//fuck this, going for another thing. trying recipe choice randomizer. let's hope the group doesn't ignore me and do it anyway. no one is helping me. I am fucked.

// Get reference to the recipes container
//const recipesContainer = document.getElementById('recipes');

// Function to display a recipe
//function displayRecipe(recipe) {
//    const recipeElement = document.createElement('div');
//    recipeElement.classList.add('recipe');
//
//    // HTML structure for the recipe display
//    const html = `
//        <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
//        <h2>${recipe.recipe_title}</h2>
//        <p>${recipe.recipe_description}</p>
//        <!-- Add more recipe details here -->
//    `;
//
//    recipeElement.innerHTML = html;
//    recipesContainer.appendChild(recipeElement);
//}

// Function to fetch recipe data and display recipes
//function fetchRecipeDataAndDisplay() {
//    fetch('recipe_data.json')
//        .then(response => response.json())
//        .then(data => {
//            // Display each recipe
//            data.forEach(recipe => displayRecipe(recipe));
//        })
//        .catch(error => console.error('Error fetching recipe data:', error));
//}

// Call the function to fetch recipe data and display recipes
//fetchRecipeDataAndDisplay();




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