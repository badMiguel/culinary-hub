document.addEventListener('DOMContentLoaded', async function() {
    const recipeData = await loadJSON() // load data from json
    
    const urlParams = new URLSearchParams(window.location.search);
    const recipeType = urlParams.get('recipe');

    if (recipeType === 'One-pan Garlic Mushroom Rice Bake') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'One-pan Garlic Mushroom Rice Bake'))
    } else if (recipeType === 'Cheesy Meatballs and Mushrooms') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'Cheesy Meatballs and Mushrooms'))
    } else if (recipeType === 'Healthy Chicken with Mushrooms') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'Healthy Chicken with Mushrooms'))
    } else if (recipeType === 'One-pan Vegetarian Paella') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'One-pan Vegetarian Paella'))
    } else if (recipeType === 'Satay Noodles with Tofu') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'Satay Noodles with Tofu'))
    } else if (recipeType === 'Breakfast Beans on Toast') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'Breakfast Beans on Toast'))
    } else if (recipeType === 'Keto Pancakes Breakfast Recipe') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'Keto Pancakes Breakfast Recipe'))
    } else if (recipeType === 'Ultimate Vegan Breakfast Wrap') {
        loadRecipeDetails(recipeData.find(item => item.recipe_title === 'Ultimate Vegan Breakfast Wrap'))
    }

    // hides and shows the menu when clicked
    const header = document.querySelector('header')
    const hamburgerIcon = document.querySelector('.hamburger-menu')
    const navigationMenu = document.querySelector('.nav-link-list')
    const topPartBurger = document.querySelector('.burger-top-part') 
    const middlePartBurger = document.querySelector('.burger-middle-part') 
    const bottomPartBurger = document.querySelector('.burger-bottom-part') 
    hamburgerIcon.addEventListener('click', function(){
        navigationMenu.classList.toggle('show')
        topPartBurger.classList.toggle('close')
        middlePartBurger.classList.toggle('close')
        bottomPartBurger.classList.toggle('close')
        header.classList.toggle('show')
    })
    const navigationLinks = document.querySelectorAll('.nav-link')    
    navigationLinks.forEach(links => {
        if (links.textContent != 'Home')
            links.addEventListener('click', ()=>{
                navigationMenu.classList.toggle('show')
                topPartBurger.classList.toggle('close')
                middlePartBurger.classList.toggle('close')
                bottomPartBurger.classList.toggle('close')
                header.classList.toggle('show')
            }
        )
    });

    // simple scroll transition for aesthetics
    const hamburgerIconParts = hamburgerIcon.querySelectorAll('.burger-part')
    const headerLinks = header.querySelectorAll('a')
    window.addEventListener('scroll', function(){
        if (window.scrollY > 20){
            header.style.backgroundColor = '#3C6DC5'
            header.style.boxShadow = '0 1px 10px rgba(0,0,0,0.5)'
            headerLinks.forEach(link => {
                link.style.color = '#FBFBFD'
            });
            hamburgerIconParts.forEach(part => {
                part.style.backgroundColor = '#FBFBFD'                
            });
        } else {
            header.style.backgroundColor = '#F2F4FA'
            header.style.boxShadow = ''
            headerLinks.forEach(link => {
                link.style.color = '#0B0D10'
            })
            hamburgerIconParts.forEach(part => {
                part.style.backgroundColor = '#0B0D10'                
            });
        }
    })

});

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

function loadRecipeDetails(recipe) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = ''; // Clear previous content

    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
        <img src="${recipe.recipe_image}" alt="Image of ${recipe.recipe_title}" class="recipe-image">
        <div class='title-caption-container'>
            <h2>${recipe.recipe_title}</h2>
            <p>${recipe.recipe_description}</p>
        </div>
        <div class="recipe-details">
            <span><strong>Prep Time:</strong> ${recipe.prep_time}</span>
            <span><strong>Allergens:</strong> ${recipe.allergens.join(', ')}</span>
            <span><strong>Skill Level:</strong> ${recipe.cooking_skill_level}</span>
        </div>
    `;
    recipesContainer.appendChild(recipeCard);

    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    recipeCard.appendChild(tabs);

    const ingredientsTab = createTabButton('Ingredients', recipe, recipeCard);
    const preparationTab = createTabButton('Preparation', recipe, recipeCard);
    const nutritionTab = createTabButton('Nutrition', recipe, recipeCard);

    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    toggleTabs(ingredientsTab, recipe, recipeCard); // Default to show ingredients first
}

function createTabButton(tabName, recipe, container) {
    const tabButton = document.createElement('button');
    tabButton.innerText = tabName;
    tabButton.className = 'tab-button';
    tabButton.onclick = () => toggleTabs(tabButton, recipe, container);
    return tabButton;
}

function toggleTabs(selectedTab, recipe, container) {
    const detailContainer = container.querySelector('.detail-container') || document.createElement('div');
    detailContainer.className = 'detail-container';
    container.appendChild(detailContainer); // Ensure the container is appended only once

    const tabs = container.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    selectedTab.classList.add('active');

    // Decide which content to display based on the active tab
    switch (selectedTab.innerText) {
        case 'Ingredients':
            showIngredients(recipe, detailContainer);
            break;
        case 'Preparation':
            showPreparation(recipe, detailContainer);
            break;
        case 'Nutrition':
            showNutrition(recipe, detailContainer);
            break;
    }
}

function showIngredients(recipe, container) {
    container.innerHTML = `<h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>`;
}

function showPreparation(recipe, container) {
    container.innerHTML = `<h3>Preparation</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>`;
}

function showNutrition(recipe, container) {
    let nutritionHTML = '<h3>Nutrition Facts</h3><ul>';
    Object.keys(recipe.nutrition_facts).forEach(key => {
        nutritionHTML += `<li>${key}: ${recipe.nutrition_facts[key]}</li>`;
    });
    nutritionHTML += '</ul>';
    container.innerHTML = nutritionHTML;
}
