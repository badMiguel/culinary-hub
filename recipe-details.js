// Function to fetch recipes from the local JSON file and render recipe cards
function fetchRecipes() {
    fetch('recipe_data.json')
        .then(response => response.json())  // Parse the JSON from the response
        .then(data => {
            // Assuming the JSON structure is an array of recipe objects
            const recipes = data;  // Store the parsed JSON data in the 'recipes' array
            renderRecipes(recipes);  // Pass the 'recipes' array to the rendering function
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

// Function to render recipe cards
function renderRecipes(recipes) {
    const recipesContainer = document.getElementById("recipes-container");
    
    // Clear previous content
    recipesContainer.innerHTML = "";
    
    // Loop through each recipe
    recipes.forEach(recipe => {
        // Create recipe cards for each recipe
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        
        // Populate content into respective cards
        const firstCardContent = `
            <!-- Content for recipe card 1 -->
        `;
        const secondCardContent = `
            <!-- Content for recipe card 2 -->
        `;
        const thirdCardContent = `
            <!-- Content for recipe card 3 -->
        `;
        
        // Append content to respective cards
        recipeCard.innerHTML = firstCardContent;
        recipeCard.querySelector(".instructions").innerHTML = secondCardContent;
        recipeCard.querySelector(".nutrition-facts").innerHTML = thirdCardContent;
        
        // Append the recipe card to the container
        recipesContainer.appendChild(recipeCard);
    });
}

// Call the fetchRecipes function on window load
window.onload = fetchRecipes;
