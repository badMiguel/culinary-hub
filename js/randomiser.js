document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Load json file
        let recipeData = await loadJSON();
        // get users preferences and not show those recipes with that preference
        const preferences = JSON.parse(localStorage.getItem('preferences')) || []
        if (preferences.length != 0) {
            const unwantedRecipe = recipeData.filter(
                item => item.allergens.some(
                    allergens => preferences.some(
                        category => category.includes(allergens))))

            recipeData = recipeData.filter(
                recipe => !unwantedRecipe.includes(recipe))
        }

        // hides and shows the menu when clicked
        const header = document.querySelector('header')
        const hamburgerIcon = document.querySelector('.hamburger-menu')
        const navigationMenu = document.querySelector('.nav-link-list')
        const topPartBurger = document.querySelector('.burger-top-part')
        const middlePartBurger = document.querySelector('.burger-middle-part')
        const bottomPartBurger = document.querySelector('.burger-bottom-part')
        hamburgerIcon.addEventListener('click', function () {
            navigationMenu.classList.toggle('show')
            topPartBurger.classList.toggle('close')
            middlePartBurger.classList.toggle('close')
            bottomPartBurger.classList.toggle('close')
            header.classList.toggle('show')
        })
        const navigationLinks = document.querySelectorAll('.nav-link')
        navigationLinks.forEach(links => {
            if (links.textContent != 'Home')
                links.addEventListener('click', () => {
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
        const logo = document.querySelector('.logo')
        // const lightDarkModeToggle = document.querySelector('.light-dark-mode-toggle')
        // console.log(lightDarkModeToggle)
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                header.style.backgroundColor = '#3C6DC5'
                header.style.boxShadow = '0 1px 10px rgba(0,0,0,0.5)'
                headerLinks.forEach(link => {
                    link.style.color = '#FBFBFD'
                });
                hamburgerIconParts.forEach(part => {
                    part.style.backgroundColor = '#FBFBFD'
                });
                logo.src = 'images/logo_white.webp'
                // lightDarkModeToggle.classList.remove("md-dark")
                // lightDarkModeToggle.classList.add('md-light')

            } else {
                header.style.backgroundColor = '#F2F4FA'
                header.style.boxShadow = ''
                headerLinks.forEach(link => {
                    link.style.color = '#0B0D10'
                })
                hamburgerIconParts.forEach(part => {
                    part.style.backgroundColor = '#0B0D10'
                });
                logo.src = 'images/logo_black.webp'
                // lightDarkModeToggle.classList.remove("md-light")
                // lightDarkModeToggle.classList.add('md-dark')
            }
        })

        const randomIndex = Math.floor(Math.random() * recipeData.length);
        const randomRecipe = recipeData[randomIndex];
        updateCardInformation(randomRecipe)

        const randomRecipeButton = document.querySelector('.generate-random-recipe')
        const card = document.querySelector('.card')
        let oldIndex = 0
        // Select a random recipe
        randomRecipeButton.addEventListener('click', () => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * recipeData.length);
            } while (oldIndex === randomIndex)

            oldIndex = randomIndex

            const randomRecipe = recipeData[randomIndex];
            card.classList.add('rotate')
            updateCardInformation(randomRecipe)

            randomRecipeButton.disabled = true
            randomRecipeButton.classList.toggle('load')
            randomRecipeButton.textContent = 'Loading'
            setTimeout(() => {
                randomRecipeButton.disabled = false
                randomRecipeButton.classList.toggle('load')
                randomRecipeButton.textContent = 'Random'
            }, 1000);

        })
        card.addEventListener('animationend', () => {
            card.classList.remove('rotate')
        })





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

function updateCardInformation(randomRecipe){
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
    prepTime.innerHTML = `<strong>Prep Time:</strong> ${prep_time}`;
    
    const recipeAllergens = document.getElementById(`allergens`);
    let allergenDetails = allergens.map(allergen => `${capitaliseFirstLetter(allergen)}`).join(", ")
    if (allergenDetails.length === 0){
        allergenDetails = 'None'
    } 
    recipeAllergens.innerHTML = `<strong>Allergens:</strong> ` + allergenDetails;

    const skillLevel = document.getElementById(`cooking-skill`);
    skillLevel.innerHTML = `<strong>Cooking Skill Level:</strong> ${cooking_skill_level}`;

    const foodCategory = document.getElementById(`food-category`);
    foodCategory.innerHTML = `<strong>Cuisine Type:</strong> ${cuisine_type}`;
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