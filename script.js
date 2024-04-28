document.addEventListener('DOMContentLoaded', async function(){
    const recipeData = await loadJSON()
    const recipeCount = recipeData.length

    createCard(recipeCount, recipeData)
    heartInteractions()
    bookmarkInteraction()    
    copyLinkInteraction()
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

// create duplicate cards of the card template
function createCard(amount, data) {
    const cardTemplate = document.querySelector('.card')    
    cardTemplate.style.display = 'none'
    nthCard = amount + 1
    for (let i = 0; i < amount; i++) {
        nthCard -= 1
        const cardClone = cardTemplate.cloneNode(true)
        cardTemplate.parentNode.insertBefore(cardClone, cardTemplate.nextSibling)
        cardClone.style.display = 'block'
        updateCardInformation(cardClone, nthCard, data)
    }
}

// update information in cards
function updateCardInformation(cardClone, number, data) {
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
        element.id = `${currentId}-${number.toString()}`
        console.log(element)
    }

    const recipeLink = document.getElementById(`link-${number}`)
    recipeLink.href = recipe_link

    const recipePictureContainer = document.getElementById(`recipe-image-${number}`)
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

    const recipeTitle = document.getElementById(`recipe-title-${number}`).querySelector('a')
    recipeTitle.textContent = recipe_title

    const description = document.getElementById(`description-${number}`)
    description.textContent = recipe_description

    const prepTime = document.getElementById(`prep-time-${number}`)
    prepTime.textContent = prep_time
    
    const recipeAllergens = document.getElementById(`allergens-${number}`)
    recipeAllergens.textContent = allergens

    const skillLevel = document.getElementById(`cooking-skill-${number}`)
    skillLevel.textContent = cooking_skill_level

    const foodCategory = document.getElementById(`food-category-${number}`)
    foodCategory.textContent = cuisine_type
}

// adds a amount of like when recipe is liked - change  color of button
function heartInteractions() {
    const heartButton = document.querySelectorAll('.heart');
    let heartIdNumber = -1
    
    heartButton.forEach(heartButton => {
        heartIdNumber += 1
        let heartIdString = heartIdNumber.toString()
        let heartIdColor = 'heartColor-' + heartIdString
        let heartIdLikes = 'heartLikes-'+ heartIdNumber
        
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

function bookmarkInteraction() {
    // change color of button when clicked
    const bookmarkButton = document.querySelectorAll('.bookmark');
    let bookmarkIdNumber = -1

    bookmarkButton.forEach(bookmarkButton => {
        bookmarkIdNumber += 1;
        let bookmarkIdString = bookmarkIdNumber.toString();
        let bookmarkIdColor = 'bookmarkColor-' + bookmarkIdString;
        
        const bookmarkColor = document.getElementById(bookmarkIdColor);

        bookmarkButton.addEventListener('click', function(){
            changeColor(bookmarkColor, 'rgb(230, 230, 42)', 'bookmark')
        });
    });
}

function copyLinkInteraction() {
    // open share menu pop up
    const copyButton = document.querySelectorAll('.copy-button')
    let linkIdNumber = -1
    copyButton.forEach(copyButton => {
        linkIdNumber += 1
        let linkIdString = linkIdNumber.toString()
        let linkId = 'link-' + linkIdString
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