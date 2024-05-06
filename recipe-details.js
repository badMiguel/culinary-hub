// Function to create and append recipe cards
function loadRecipes(recipesData) {
    const container = document.getElementById('recipes-container');
    recipesData.forEach(recipe => {
        // First card: Prep time, allergens, cooking time, and ingredients
        const firstCardHtml = `
            <div class="card">
                <div class="caption-container">
                    <div class="image_title">
                        ${recipe.recipe_title}
                    </div>
                    <p>${recipe.recipe_description}</p>
                    <p><strong>Prep Time:</strong> <span>${recipe.prep_time}</span></p>
                    <p><strong>Allergens:</strong> <span>${recipe.allergens.join(', ')}</span></p>
                    <p><strong>Cooking Time:</strong> <span>${recipe.cooking_time}</span></p>
                    <ul><strong>Ingredients:</strong>${recipe.ingredients.map(i => `<li>${i.ingredient_name}: ${i.quantity}</li>`).join('')}</ul>
                </div>
            </div>
        `;

        // Second card: Instructions
        const secondCardHtml = `
            <div class="card">
                <div class="caption-container">
                    <ol><strong>Instructions:</strong>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
                </div>
            </div>
        `;

        // Third card: Nutrition facts and comments
        const thirdCardHtml = `
            <div class="card">
                <div class="caption-container">
                    <ul><strong>Nutrition Facts:</strong>${Object.entries(recipe.nutrition_facts).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}</ul>
                    <ul><strong>Comments:</strong>
                        <li>This recipe is amazing!</li>
                        <li>I made this last night and it was delicious!</li>
                        <!-- Add more comments dynamically if needed -->
                    </ul>
                </div>
            </div>
        `;

        // Append each card to the container
        container.innerHTML += firstCardHtml + secondCardHtml + thirdCardHtml;
    });
}
