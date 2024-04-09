document.addEventListener('DOMContentLoaded', function(){
   
    dynamicTruncate()
    window.addEventListener('resize', () =>{dynamicTruncate()});

    // adds a amount of like when recipe is liked - change  color of button
    const heartButton = document.querySelectorAll('.heart');
    let heartIdNumber = 0
    
    heartButton.forEach(heartButton => {
        heartIdNumber += 1
        
        let heartIdString = heartIdNumber.toString()
        let heartIdLikes = 'heartLikes-'+ heartIdString
        let heartIdColor = 'heartColor-' + heartIdString
        
        let heartNumber = randomInt(1,1000)
        const heartColor = document.getElementById(heartIdColor);
        const heartNumberDisplay = document.getElementById(heartIdLikes);
               
        heartNumberDisplay.textContent = heartNumber.toLocaleString(); 

        heartButton.addEventListener('click', function(){
            likeChange = changeColor(heartColor, 'rgb(170, 26, 26)', 'heart')
            heartNumber += likeChange
            heartNumberDisplay.textContent = heartNumber.toLocaleString(); 
        })
    });

    // change color of button when clicked
    const bookmarkButton = document.querySelectorAll('.bookmark');
    let bookmarkIdNumber = 0

    bookmarkButton.forEach(bookmarkButton => {
        bookmarkIdNumber += 1;
        let bookmarkIdString = bookmarkIdNumber.toString();
        let bookmarkIdColor = 'bookmarkColor-' + bookmarkIdString;
        
        const bookmarkColor = document.getElementById(bookmarkIdColor);

        bookmarkButton.addEventListener('click', function(){
            changeColor(bookmarkColor, 'rgb(230, 230, 42)', 'bookmark')
        });
    });

    // open share menu pop up
    const shareButton = document.querySelectorAll('.share-button')
    const copyButton = document.querySelector('.copy-button')
    let linkIdNumber = 0
    shareButton.forEach(shareButton => {
        linkIdNumber += 1
        let linkIdString = linkIdNumber.toString()
        let linkId = 'link-' + linkIdString
        let linkElement = document.getElementById(linkId)
        let recipeLink = linkElement.getAttribute('href')

        // gets the link of the target html file. with this method, it capture the bitbucket.io as well instead of only the pure html href
        let tempAnchor = document.createElement('a')
        tempAnchor.href = recipeLink
        let newRecipeLink = tempAnchor.href

        const shareLink = document.querySelector('.share-link')

        shareButton.addEventListener('click', function(){
            sharePopup.forEach(sharePopup => {
                sharePopup.style.visibility = 'visible'
                sharePopup.style.opacity = 1
            });

            shareLink.value = newRecipeLink
            copyButton.addEventListener('click', function(){
                copyLink(newRecipeLink)
            })
        });
    });
   
    // close share menu pop up
    const exitShare = document.querySelectorAll('.hide-bg-content, .close-share')
    const sharePopup = document.querySelectorAll('.share-popup, .hide-bg-content');
    exitShare.forEach(exitShare => {
        exitShare.addEventListener('click', function(){
            sharePopup.forEach(sharePopup => {
                sharePopup.style.opacity = 0
                setTimeout(() => {
                    sharePopup.style.visibility = 'hidden' 
                }, 200);
            });
        })
    });
});

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
    if (!element.style.fill || element.style.fill ==='var(--bg-secondary)'){
        element.style.fill = color;
        element.style.stroke = color;

        // add a like count if the button clicked was a heart button
        if (button === 'heart'){ 
            return 1
        }
    } else {
    element.style.fill = 'var(--bg-secondary)';
    element.style.stroke = 'black'; 
        if (button === 'heart'){
            return -1
        }
    } 
}

const fullDescription =  {
    'Recipe 1': 'Hawaiian pizza is a classic pizza topped with a combination of tomato sauce and melted cheese, topped with slices of juicy ham, and the infamous pineapple.',
    'Recipe 2': 'Hawaiian pizza is a classic pizza topped with a combination of tomato sauce and melted cheese, topped with slices of juicy ham, and the infamous pineapple.',
    'Recipe 3': 'Hawaiian pizza is a classic pizza topped with a combination of tomato sauce and melted cheese, topped with slices of juicy ham, and the infamous pineapple.',
    'Recipe 4': 'Hawaiian pizza is a classic pizza topped with a combination of tomato sauce and melted cheese, topped with slices of juicy ham, and the infamous pineapple.',
}

// shorten the description to fit into the card
let previousViewportWidth = null;

function dynamicTruncate(){
    const viewportWidth = window.innerWidth
    const imageDescription = document.querySelectorAll('.image_description')
    if (viewportWidth !== previousViewportWidth) {
        let descNumber = 0
        imageDescription.forEach(imageDescription => {
            descNumber += 1
            descNumberToString = descNumber.toString()
            recipeDescription = 'Recipe ' + descNumberToString
            imageDescription.textContent = fullDescription[recipeDescription]
            const imageDescriptionContent = imageDescription.textContent
            const  descriptionSplit = imageDescriptionContent.split('');

            const truncatedDescription = truncateDescription(
                descriptionSplit,
                viewportWidth >= 1367 ? 130 : viewportWidth >= 582 ? 71: 63
            );
            imageDescription.textContent = truncatedDescription;
        });
        previousViewportWidth = viewportWidth;
    }
}


function truncateDescription(description, length){
    let newDescription = ''
    for (let letter = 0; letter<length; letter++){
        newDescription += description[letter]
    }
    newDescription += '...'
    return newDescription
}