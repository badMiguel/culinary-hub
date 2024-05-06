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
            <h2>${recipe.title}</h2>
            <p>${recipe.description}</p>
            <!-- Add more content as needed -->
        `;
        const secondCardContent = `
            <h3>Instructions</h3>
            <ol>
                ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ol>
        `;
        const thirdCardContent = `
            <h3>Nutrition Facts</h3>
            <ul>
                <li>Calories: ${recipe.nutrition.calories}</li>
                <li>Fat: ${recipe.nutrition.fat}</li>
                <!-- Add more nutrition facts as needed -->
            </ul>
        `;
        
        // Append content to respective cards
        recipeCard.innerHTML = firstCardContent + secondCardContent + thirdCardContent;
        
        // Append the recipe card to the container
        recipesContainer.appendChild(recipeCard);
    });
}

// Call the fetchRecipes function on window load
window.onload = fetchRecipes;
