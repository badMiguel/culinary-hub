document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load json file
        const recipeData = await loadJSON();
        // console.log('Loaded recipe data:', recipeData);

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
        
        // Select a random recipe
        const randomIndex = Math.floor(Math.random() * recipeData.length);
        const randomRecipe = recipeData[randomIndex];
        // console.log('Selected random recipe:', randomRecipe);
        
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
        
        const recipePictureContainer = document.getElementById(`recipe-image`)
        const recipeImageSource = recipePictureContainer.querySelectorAll('source')
        const recipeImage = recipePictureContainer.querySelector('img')
        recipeImageSource.forEach(source =>{
            const mediaQuery = source.getAttribute('media')
    
            if (mediaQuery === "(min-width: 582px)") {
                source.scrset = recipe_image
            } else if (mediaQuery === "(max-width: 581px)") {
                source.scrset = recipe_image
            }
        })
        recipeImage.src = recipe_image

        const recipeTitle = document.getElementById('recipe-title').querySelector('a');
        recipeTitle.textContent = recipe_title;
        recipeTitle.href = recipe_link;

        const description = document.getElementById(`description`);
        description.textContent = recipe_description;

        const prepTime = document.getElementById(`prep-time`);
        prepTime.textContent = prep_time;
        
        const recipeAllergens = document.getElementById(`allergens`);
        recipeAllergens.textContent = allergens.map(allergen => `${capitaliseFirstLetter(allergen)}`).join(", ");

        const skillLevel = document.getElementById(`cooking-skill`);
        skillLevel.textContent = cooking_skill_level;

        const foodCategory = document.getElementById(`food-category`);
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

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() +string.slice(1);
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