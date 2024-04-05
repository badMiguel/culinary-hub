let heartNumber = randomInt(1,1000)

document.addEventListener('DOMContentLoaded', function(){
    const heartButton = document.querySelectorAll('.heart');
    let heartIdNumber = 0

    heartButton.forEach(heartButton => {
        heartIdNumber += 1
        
        let heartIdString = heartIdNumber.toString()
        let heartIdLikes = 'heartLikes-'+ heartIdString
        let heartIdColor = 'heartColor-' + heartIdString
        
        const heartColor = document.getElementById(heartIdColor);
        const heartNumberDisplay = document.getElementById(heartIdLikes);
               
        heartNumberDisplay.textContent = heartNumber.toLocaleString(); 

        heartButton.addEventListener('click', function(){
            changeColor(heartColor, 'rgb(170, 26, 26)', 'heart', heartNumberDisplay);
        });
    });

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
});

// just generates a random number of likes
function randomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// function for changing color of buttons after click
function changeColor(element, color, button, likes){
    if (!element.style.fill || element.style.fill ==='var(--bg-secondary)'){
        element.style.fill = color;
        element.style.stroke = color;

        // add a like count if the button clicked was a heart button
        if (button === 'heart'){ 
            heartNumber += 1;
            likes.textContent = heartNumber.toLocaleString(); 
        }
    } else{
        element.style.fill = 'var(--bg-secondary)';
        element.style.stroke = 'black'; 
        if (button === 'heart'){
            heartNumber -= 1;
            likes.textContent = heartNumber.toLocaleString(); 
        }
    }  
}