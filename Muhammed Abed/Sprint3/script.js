// Sample recipe data which can be updated as new recipes added
const recipes = [
    { title: "Pasta Primavera",
     image: "pasta.jpg" , //Image source: https://www.thereciperebel.com/wp-content/uploads/2023/04/pasta-primavera-TRR-17-of-19.jpg
     prepTime: 30, 
     cookingSkill: "Beginner",
     allergens: [] }, 
];

// Function to generate recipe cards
function generateRecipeCards() {
    const recipeContainer = document.getElementById("recipe-container");

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        const image = document.createElement("img");
        image.src = `images/${recipe.image}`;
        image.alt = recipe.title;
        card.appendChild(image);

        const title = document.createElement("h2");
        title.textContent = recipe.title;
        card.appendChild(title);

        const prepTime = document.createElement("p");
        prepTime.textContent = `Prep Time: ${recipe.prepTime} minutes`;
        card.appendChild(prepTime);

        const cookingSkill = document.createElement("p");
        cookingSkill.textContent = `Cooking Skill: ${recipe.cookingSkill}`;
        card.appendChild(cookingSkill);

        if (recipe.allergens.length > 0) {
            const allergens = document.createElement("p");
            allergens.textContent = `Allergens: ${recipe.allergens.join(", ")}`;
            card.appendChild(allergens);
        }
        else {
            // Display "Allergens: None" if no allergens are present
            const allergens = document.createElement("p");
            allergens.textContent = "Allergens: None";
            card.appendChild(allergens);
        }
        recipeContainer.appendChild(card);
    });
}

// Call the function to generate recipe cards when the page loads
window.addEventListener("load", generateRecipeCards);
