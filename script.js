document.addEventListener('DOMContentLoaded', async function(){
    const recipeData = await loadJSON() // load data from json

    const sectionList = ['suggestion', 'breakfast']

    // display random recipes from json
    const suggestedRandomRecipes = randomRecipes(recipeData, 3)
    createDuplicateCards(3, suggestedRandomRecipes, sectionList[0])
    heartInteractions(sectionList[0])
    bookmarkInteraction(sectionList[0])    
    copyLinkInteraction(sectionList[0])

    const suggestedBreakfastRecipes = randomRecipes(recipeData, 3, "Breakfast")
    createDuplicateCards(3, suggestedBreakfastRecipes, sectionList[1])
    heartInteractions(sectionList[1])
    bookmarkInteraction(sectionList[1])    
    copyLinkInteraction(sectionList[1])

    // button interactions for cards
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

// randomise the recipes
function randomRecipes(list, numItems, filter) {
    if (!filter){
        const shuffled = list.sort(() => Math.random() - 0.5)
        return shuffled.slice(0, numItems)
    } else if (filter === "Breakfast") {
        const filteredItems = list.filter(item => item.other_categories.includes(filter))
        const shuffled = filteredItems.sort(() => Math.random() - 0.5)
        return shuffled.slice(0, numItems)
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
        }
        cardClone.style.display = 'block'
        updateDuplicateCardInformation(cardClone, nthCard, data, section)
    }
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
    recipeAllergens.textContent = allergens.map(allergen => `${allergen}`).join(", ")

    const skillLevel = document.getElementById(`cooking-skill-${section}-${number}`)
    skillLevel.textContent = cooking_skill_level

    const foodCategory = document.getElementById(`food-category-${section}-${number}`)
    foodCategory.textContent = cuisine_type
}

// adds a amount of like when recipe is liked - change  color of button
function heartInteractions(section) {
    const recipeSection = document.querySelector(`.${section}-section`)
    const heartButton = recipeSection.querySelectorAll('.heart');
    let heartIdNumber = 0
    

    heartButton.forEach((heartButton, index) => {
        heartIdNumber += 1;

        let heartIdColor = `heartColor-${section}-${heartIdNumber}`
        let heartIdLikes = `heartLikes-${section}-${heartIdNumber}` 

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

// change color of button when clicked
function bookmarkInteraction(section) {
    const recipeSection = document.querySelector(`.${section}-section`)
    const bookmarkButton = recipeSection.querySelectorAll('.bookmark');
    let bookmarkIdNumber = 0

    bookmarkButton.forEach(bookmarkButton => {
        bookmarkIdNumber += 1;
        let bookmarkIdColor = `bookmarkColor-${section}-${bookmarkIdNumber}`;
        
        const bookmarkColor = document.getElementById(bookmarkIdColor);

        bookmarkButton.addEventListener('click', function(){
            changeColor(bookmarkColor, 'rgb(230, 230, 42)', 'bookmark')
        });
    });
}

// open share menu pop up
function copyLinkInteraction(section) {
    const recipeSection = document.querySelector(`.${section}-section`)
    const copyButton = recipeSection.querySelectorAll('.copy-button')
    let linkIdNumber = 0

    copyButton.forEach(copyButton => {
        linkIdNumber += 1

        let linkId = `link-${section}-${linkIdNumber}`
        let linkElement = document.getElementById(linkId)

        try{
            let recipeLink = linkElement.getAttribute('href') 
            let tempAnchor = document.createElement('a')
            tempAnchor.href = recipeLink
            let newRecipeLink = tempAnchor.href
    
            copyButton.addEventListener('click', function(){
                copyLink(newRecipeLink)
            })
        } catch(error) {
         
        }

        // gets the link of the target html file. with this method, it capture the bitbucket.io as well instead of only the pure html href
    });
}

// copies the link of the target url
function copyLink(link){
    navigator.clipboard.writeText(link)
    
    const notifyCopy = document.querySelector('.copied-clipboard')
    notifyCopy.style.opacity = 1

    setTimeout(() => {
        notifyCopy.style.opacity = 0
    }, 3000);
}

// just generates a random number of likes
function randomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// function for changing color of buttons after click
function changeColor(element, color, button){
    if (!element.style.color || element.style.color ==='var(--bg-fourth)'){
        element.style.color = color;
        // add a like count if the button clicked was a heart button
        if (button === 'heart'){ 
            return 1
        }
    } else {
        element.style.color = 'var(--bg-fourth)';
        if (button === 'heart'){
            return -1
        }
    } 
}

