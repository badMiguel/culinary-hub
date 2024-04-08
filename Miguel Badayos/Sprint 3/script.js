document.addEventListener('DOMContentLoaded', function(){
    // shorten the description to fit into the card
    const imageDescription = document.querySelectorAll('.image_description')  
    imageDescription.forEach(imageDescription => {
        const imageDescriptionContent = imageDescription.textContent
        const stringLength = imageDescriptionContent.length

        let  descriptionSplit = imageDescriptionContent.split('');

        if (stringLength > 150){
            let newDescription = ''
            for (let letter = 0; letter<=129; letter++){
                newDescription += descriptionSplit[letter]
            }
            newDescription += '...'
            imageDescription.textContent = newDescription
        }
    });

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

        const shareLink = document.querySelector('.share-link')

        shareButton.addEventListener('click', function(){
            sharePopup.forEach(sharePopup => {
                sharePopup.style.visibility = 'visible'
                sharePopup.style.opacity = 1
            });

            shareLink.value = recipeLink
            copyButton.addEventListener('click', function(){
                copyLink(recipeLink)
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