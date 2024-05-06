// load json file in recipe information
async function loadJSON() {
    try {
        const response = await fetch('recipe_data.json');
        const jsonData = await response.json();
        return jsonData
    } catch (error) {
        console.error('Error loading JSON file:', error)
    }
}
const recipes = [
    {
        // Recipe 1 data
    },
    {
        // Recipe 2 data
    },
    // More recipe objects...
];

// Function to render recipe cards
function renderRecipes() {
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

// Call the function to render recipe cards
renderRecipes();
