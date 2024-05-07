// Function to extract the recipe ID from the URL
function getRecipeIdFromURL(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('id');
}

// Sample JSON data containing recipe objects
const recipes = [
    {
        "recipe_link": "full_details.html?id=123",
        // Other recipe properties...
    },
    // Other recipe objects...
];

// Iterate through each recipe and extract the ID from the URL
recipes.forEach(recipe => {
    const recipeId = getRecipeIdFromURL(recipe.recipe_link);
    console.log(`Recipe ID: ${recipeId}`);
});
