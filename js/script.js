document.addEventListener('DOMContentLoaded', async function(){
    let recipeData = await loadJSON() // load data from json

    generateDailyRecipe(recipeData)

    // get users preferences and not show those recipes with that preference
    const preferences = JSON.parse(localStorage.getItem('preferences')) || []
    if (preferences.length != 0) {
        const unwantedRecipe = recipeData.filter(
            item=> item.allergens.some(
                allergens => preferences.some(
                    category=> category.includes(allergens))))

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

    try {
        const sectionList = ['suggestion', 'breakfast']
        // display random recipes from json
        const suggestedRandomRecipes = JSON.parse(localStorage.getItem('dailyRecipe'))
        createDuplicateCards(2, suggestedRandomRecipes, sectionList[0])
        
        const suggestedBreakfastRecipes = JSON.parse(localStorage.getItem('dailyRecipeBreakfast'))
        createDuplicateCards(2, suggestedBreakfastRecipes, sectionList[1])
        
        const cardCollection = document.querySelector('.card-collection')
        const urlParams = new URLSearchParams(window.location.search);
        const pageType = urlParams.get('page');
        
        if (pageType ==='recipe_list') {
            renderItems(cardCollection, recipeData, 'listOfRecipes')
        } else if (pageType === 'saved_recipes') {
            const savedRecipe = JSON.parse(localStorage.getItem('bookmarks')) || []
            renderItems(cardCollection, savedRecipe, 'saved')
        }
    
        searchFunction(recipeData)
        filterFunction(recipeData)
        
    } catch {
        
    }
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

// search function
function searchFunction(recipeData) {
    const searchInput = document.getElementById('search-bar')
    const cardCollection = document.querySelector('.card-collection')
    const originalContent = cardCollection.innerHTML
    
    
    searchInput.addEventListener('keydown', function(event) {
        const searchInputValue = searchInput.value.toLowerCase()
        // display filtered recipes
        if (event.key === "Enter" && searchInputValue != '') {
            const filteredItems = recipeData.filter(item => 
                item.other_categories.some(category => (category.toLowerCase() === searchInputValue)) ||
                item.recipe_title.toLowerCase().includes(searchInputValue) ||
                item.cuisine_type.toLowerCase().includes(searchInputValue) ||
                item.cooking_skill_level.toLowerCase().includes(searchInputValue) ||
                item.ingredients.some(ingredient => ingredient.ingredient_name.toLowerCase().includes(searchInputValue))
            )
            renderItems(cardCollection, filteredItems, 'search', searchInputValue)
        }
    })
}

// filters the recipe based on user input on filter menu
function filterFunction(recipeData) {
    const filterButton = document.querySelector('.filter-icon')
    const filterContainer = document.querySelector('.filter-section-container')
    
    // shows filter menu
    filterButton.addEventListener('click', function(){
        filterContainer.classList.toggle('show')
    })
    
    // filter logic - gets value of checked checkbox then gets recipes with that value
    const checkboxItems = document.querySelectorAll('.checkbox-item')
    const submitFilter = document.querySelector('.apply-filter')
    const cardCollection = document.querySelector('.card-collection')
    submitFilter.addEventListener('click', function(){
        const selectedFilters = Array.from(checkboxItems)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
        if (selectedFilters.length != 0){            
            const filteredItems = recipeData.filter(item => 
                item.other_categories.some(category => selectedFilters.some(filter => category.toLowerCase().includes(filter))) ||
                selectedFilters.some(filter=> item.cuisine_type.toLowerCase().includes(filter)) ||
                selectedFilters.some(filter=> item.cooking_skill_level.toLowerCase().includes(filter))
            )            
            renderItems(cardCollection, filteredItems, 'filter', selectedFilters)
            filterContainer.classList.toggle('show')
        }
    })

    // close filter menu
    const closeFilter = document.querySelector('.close-filter')
    closeFilter.addEventListener('click', function(){
        filterContainer.classList.toggle('show')
    })
}

// renders html to show the recipes based from filter/search input of users
function renderItems(container, data, itemToRender, input) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        container.innerHTML = this.responseText
        const sectionHeading = container.querySelector('.section-heading');
        const breadcrumbNavigation = document.querySelector(".breadcrumb-navigation-container")
        const listOfRecipesRecipeLink = document.querySelector('.listOfRecipes-intro')
        if (itemToRender === 'search'){
            console.log(localStorage.getItem('bookmark'))
            sectionHeading.textContent = `Search results for "${input}"`
            breadcrumbNavigation.innerHTML = `
                <a class="breadcrumb-navigation" href="index.html">Home</a>
                <span class="material-icons">chevron_right</span>
                <p>Searched Recipe</p>
            `
        } else if (itemToRender === 'filter'){
            sectionHeading.textContent = `Recipes with the following filters: ${input.join(', ')}`
            breadcrumbNavigation.innerHTML = `
                <a class="breadcrumb-navigation" href="index.html">Home</a>
                <span class="material-icons">chevron_right</span>
                <p>Filtered Recipe</p>
            `
        } else if (itemToRender ==='listOfRecipes') {
            sectionHeading.textContent = `List of Recipes`
            breadcrumbNavigation.innerHTML = `
                <a class="breadcrumb-navigation" href="index.html">Home</a>
                <span class="material-icons">chevron_right</span>
                <p>List of Recipes</p>
            `
            listOfRecipesRecipeLink.textContent = ''
        } else {
            sectionHeading.textContent = `Your Saved Recipes`
            breadcrumbNavigation.innerHTML = `
                <a class="breadcrumb-navigation" href="index.html">Home</a>
                <span class="material-icons">chevron_right</span>
                <p>Saved Recipes</p>
            `
        }
        if (data.length > 0) {
            createDuplicateCards(data.length, data, 'search')
        } else if (data.length === 0 && itemToRender === 'search') {
            const noRecipeFound= container.querySelector('.no-recipe-found')
            noRecipeFound.textContent = `No search results for ${input}`
        } else if (data.length===0 && itemToRender ==='saved') {
            const noRecipeFound= container.querySelector('.no-recipe-found')
            noRecipeFound.textContent = `You currently have no saved recipes`
        }
    }

    xhr.open('GET', 'searched_filtered_items.html')
    xhr.send()
}

// recipe will only change every other day
function generateDailyRecipe(recipeData) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const dateToday = `${year}-${month}-${day}`;

    if (dateToday !== localStorage.getItem('dateToday')) {
        localStorage.setItem('dateToday', dateToday)
        const recipeDataNoBreakfast = recipeData.filter(
            recipe => !recipe.other_categories.some(category=> category.toLowerCase() === 'breakfast')
        )
        const recipeBreakfast = recipeData.filter(
            recipe => recipe.other_categories.some(category=> category.toLowerCase() === 'breakfast')
        )
        const randomDailyRecipe = recipeDataNoBreakfast.sort(() => Math.random() - 0.5)
        const randomDailyBreakfast = recipeBreakfast.sort(() => Math.random() - 0.5)
        localStorage.setItem('dailyRecipe', JSON.stringify(randomDailyRecipe.slice(0, 2)))
        localStorage.setItem('dailyRecipeBreakfast', JSON.stringify(randomDailyBreakfast.slice(0, 2)))
    } 
}

// create duplicate cards of the card template
function createDuplicateCards(amount, data, section) {
    let cardTemplate = document.querySelector('.card')    
    cardTemplate.style.display = 'none'
    nthCard = 0
    for (let i = 0; i < amount; i++) {
        nthCard += 1
        let cardClone = cardTemplate.cloneNode(true)
        if (section === "suggestion"){
            const suggestedSection = document.querySelector(".suggestion-section")
            const suggestedCardContainer = suggestedSection.querySelector('.card-container')
            suggestedCardContainer.appendChild(cardClone)
        } else if (section === "breakfast") {
            const breakfastSection = document.querySelector(".breakfast-section")
            const breakfastCardContainer = breakfastSection.querySelector('.card-container')
            breakfastCardContainer.appendChild(cardClone)
        } else if (section === "search") {
            const searchSection = document.querySelector(".search-section")
            const searchCardContainer = searchSection.querySelector('.card-container')
            searchCardContainer.appendChild(cardClone)
        }
        cardClone.style.display = 'block'
        updateDuplicateCardInformation(cardClone, nthCard, data, section)
    }
    heartInteractions(section)
    bookmarkInteraction(section, data)    
    copyLinkInteraction(section)
}

// update information in cards
function updateDuplicateCardInformation(cardClone, number, data, section) {
    const recipeDetails = data[number-1]
    const {
        recipe_link,
        recipe_image,
        recipe_title,
        recipe_description,
        prep_time,
        allergens,
        cooking_skill_level,
        cuisine_type,
    } = recipeDetails;

    cardClone.removeAttribute('aria-hidden')   
    
    const elementIdToUpdate = cardClone.querySelectorAll('[id]')
    for (const element of elementIdToUpdate){
        let currentId = element.id;
        element.id = `${currentId}-${section}-${number.toString()}`
    }
   
    const recipeLink = document.getElementById(`link-${section}-${number}`)
    recipeLink.href = recipe_link
    
    const recipePictureContainer = document.getElementById(`recipe-image-${section}-${number}`)
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

    const recipeTitle = document.getElementById(`recipe-title-${section}-${number}`).querySelector('a')
    recipeTitle.textContent = recipe_title
    recipeTitle.href = recipe_link

    const description = document.getElementById(`description-${section}-${number}`)
    description.textContent = recipe_description

    const prepTime = document.getElementById(`prep-time-${section}-${number}`)
    prepTime.textContent = prep_time
    
    const recipeAllergens = document.getElementById(`allergens-${section}-${number}`)
    let allergenDetails = allergens.map(allergen => `${capitaliseFirstLetter(allergen)}`).join(", ")
    if (allergenDetails.length === 0){
        allergenDetails = 'None'
    } 
    recipeAllergens.textContent = allergenDetails

    const skillLevel = document.getElementById(`cooking-skill-${section}-${number}`)
    skillLevel.textContent = cooking_skill_level

    const foodCategory = document.getElementById(`food-category-${section}-${number}`)
    foodCategory.textContent = cuisine_type
}

// adds a amount of like when recipe is liked - change  color of button
function heartInteractions(section) {
    const recipeSection = document.querySelector(`.${section}-section`)
    const heartButton = recipeSection.querySelectorAll('.heart');  

    heartButton.forEach((heartButton, index) => {
        let heartIdColor = `heartColor-${section}-${index+1}`
        let heartIdLikes = `heartLikes-${section}-${index+1}` 

        let heartNumber = randomInt(1,1000)
        const heartColor = document.getElementById(heartIdColor);
        const heartNumberDisplay = document.getElementById(heartIdLikes);

        try{
            heartNumberDisplay.textContent = heartNumber.toLocaleString(); 
        } catch(error) {
            // pass
        }

        heartButton.addEventListener('click', function(){
            likeChange = changeColor(heartColor, 'rgb(170, 26, 26)', 'heart')
            heartNumber += likeChange
            heartNumberDisplay.textContent = heartNumber.toLocaleString(); 
        })
    });
}

// change color of button when clicked - also saves the recipe when clicked
function bookmarkInteraction(section, recipeData) {
    const recipeSection = document.querySelector(`.${section}-section`)
    const bookmarkButton = recipeSection.querySelectorAll('.bookmark');

    bookmarkButton.forEach((bookmarkButton, index) => {
        let bookmarkIdColor = `bookmarkColor-${section}-${index+1}`;
        const recipeTitle = document.getElementById(`recipe-title-${section}-${index+1}`)
            .textContent
            .replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
        const bookmarkColor = document.getElementById(bookmarkIdColor);

        const bookmarksList =  JSON.parse(localStorage.getItem('bookmarks')) || []
        if (bookmarksList.some(bookmark => bookmark.recipe_title === recipeTitle)) {
            bookmarkButton.style.color = 'rgb(230, 230, 42)'
        }

        bookmarkButton.addEventListener('click', function(){
            const data = recipeData.filter(item => item.recipe_title.includes(recipeTitle))
            changeColor(bookmarkColor, 'rgb(230, 230, 42)', 'bookmark', data, recipeTitle)
        });
    });
}

// function to add the recipe on localstorage
function addBookmark(recipeTitle, recipeData) {
    const bookmarksList =  JSON.parse(localStorage.getItem('bookmarks')) || []

    if (bookmarksList.length === 0) {
        bookmarksList.push(recipeData)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarksList))
    } 

    const isBookmarked = bookmarksList.some(bookmark => bookmark.recipe_title === recipeTitle);
    
    if (!isBookmarked) {
        bookmarksList.push(recipeData)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarksList))
    }
}

// function to remove the recipe on localstorage
function removeBookmark(recipeTitle) {
    const bookmarksList = JSON.parse(localStorage.getItem('bookmarks')) || []

    const updatedBookmark = bookmarksList.filter(bookmark => bookmark.recipe_title !== recipeTitle)

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmark))
}


// open share menu pop up
function copyLinkInteraction(section) {
    const recipeSection = document.querySelector(`.${section}-section`)
    const copyButton = recipeSection.querySelectorAll('.copy-button')

    copyButton.forEach((copyButton, index) => {
        let linkId = `link-${section}-${index+1}`
        let linkElement = document.getElementById(linkId)

        try{
            // gets the link of the target html file. with this method, it capture the bitbucket.io as well instead of only the pure html href
            let recipeLink = linkElement.getAttribute('href') 
            let tempAnchor = document.createElement('a')
            tempAnchor.href = recipeLink
            let newRecipeLink = tempAnchor.href
    
            copyButton.addEventListener('click', function(){
                copyLink(newRecipeLink)
            })
        } catch(error) {
         
        }

    });
}

// copies the link of the target url
function copyLink(link){
    navigator.clipboard.writeText(link)
    
    const notifyCopy = document.querySelector('.copied-clipboard')
    notifyCopy.classList.toggle('show')

    setTimeout(() => {
        notifyCopy.classList.toggle('show')
    }, 1000);
}

// just generates a random number of likes
function randomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// function for changing color of buttons after click
function changeColor(element, color, button, data, recipeTitle){
    if (!element.style.color || element.style.color ==='var(--bg-fourth)'){
        element.style.color = color;
        // add a like count if the button clicked was a heart button
        if (button === 'heart'){ 
            return 1
        } else if (button === 'bookmark') {
            addBookmark(recipeTitle, data[0])
        }
    } else {
        element.style.color = 'var(--bg-fourth)';
        if (button === 'heart'){
            return -1
        } else if (button === 'bookmark') {
            removeBookmark(recipeTitle)
        }
    } 
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() +string.slice(1);
}