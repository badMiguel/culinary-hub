document.addEventListener('DOMContentLoaded', function() {
    
    const recipes = [
        {
            recipe_link: "full_details.html",
            recipe_image: "Images/Baked-Mushroom-Rice.webp",
            recipe_title: "One-pan Garlic Mushroom Rice Bake",
            recipe_description: "Quick rice dish with garlic, soy sauce, and mushrooms.",
            prep_time: "30 minutes",
            allergens: ["yeast", "celery", "soybean"],
            cooking_skill_level: "Intermediate",
            cuisine_type: "Asian",
            other_categories: ["Main Dish", "Mushroom", "Baking"],
            ingredients: [
                { ingredient_name: "vegetable oil", quantity: "2 tbs" },
                { ingredient_name: "mushrooms, sliced", quantity: "375g" },
                { ingredient_name: "rice vinegar", quantity: "2 tbs" },
                { ingredient_name: "ABC Sweet Soy Sauce", quantity: "1 1/2 tbs, plus extra to serve" }
            ],
            instructions: [
                "Heat half of the vegetable oil in a large flameproof baking dish over medium-high heat.",
                "Cook the sliced mushrooms in the heated oil, stirring occasionally, for 5 minutes or until just starting to soften.",
                "Add rice vinegar and 1 1/2 tablespoons of ABC Sweet Soy Sauce to the mushrooms. Cook for 1 minute or until mushrooms are just tender.",
                "Transfer the cooked mushrooms and sauce to a heatproof bowl. Set aside."
            ],
            nutrition_facts: {
                Calories: "300 calories",
                Total_Fat: "10g",
                Sodium: "800mg",
                Total_Carbohydrate: "45g",
                Protein: "8g"
            }
        }
        // Additional recipes can be added here
    ];

    // Function to load and display a specific recipe
    function loadRecipe(index) {
        const recipe = recipes[index];

        document.getElementById('recipe-title').textContent = recipe.recipe_title;
        document.getElementById('recipe-image').src = recipe.recipe_image;
        document.getElementById('recipe-image').alt = recipe.recipe_title;
        document.getElementById('recipe-description').textContent = recipe.recipe_description;

        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = ''; // Clear existing ingredients
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = `${ingredient.quantity} of ${ingredient.ingredient_name}`;
            ingredientsList.appendChild(li);
        });

        const instructionsList = document.getElementById('instructions-list');
        instructionsList.innerHTML = ''; // Clear existing instructions
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });
    }

    // Load the first recipe on page load
    loadRecipe(0);

    // Optionally, you could add event listeners to navigate between recipes
    // document.getElementById('next-button').addEventListener('click', function() {
    //     currentIndex = (currentIndex + 1) % recipes.length;
    //     loadRecipe(currentIndex);
    // });

    // document.getElementById('prev-button').addEventListener('click', function() {
    //     currentIndex = (currentIndex - 1 + recipes.length) % recipes.length;
    //     loadRecipe(currentIndex);
    // });
});
