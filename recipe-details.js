document.addEventListener('DOMContentLoaded', function() {
    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => {
            renderRecipes(data);
        })
        .catch(error => console.error('Error loading recipes:', error));
});

function renderRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    recipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
            </div>
            <div class="recipe-info">
                <h3>${recipe.recipe_title}</h3>
                <p>${recipe.recipe_description}</p>
                <button onclick="showDetails(${index})">View Recipe</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function showDetails(index) {
    const recipe = recipes[index]; // Assuming 'recipes' is accessible globally
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = `
        <h1>${recipe.recipe_title}</h1>
        <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
        <p><strong>Description:</strong> ${recipe.recipe_description}</p>
        <p><strong>Prep Time:</strong> ${recipe.prep_time}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.quantity} of ${ingredient.ingredient_name}</li>`).join('')}</ul>
        <p><strong>Instructions:</strong></p>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
        <p><strong>Nutrition Facts:</strong></p>
        <ul>
            <li>Calories: ${recipe.nutrition_facts.Calories}</li>
            <li>Total Fat: ${recipe.nutrition_facts.TotalFat}</li>
            <li>Protein: ${recipe.nutrition_facts.Protein}</li>
        </ul>
    `;
    // Show the details view, for example by changing CSS classes
    detailsContainer.style.display = 'block';
}
