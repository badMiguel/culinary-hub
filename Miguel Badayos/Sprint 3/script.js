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
        
        let heartNumber = randomInt(1,1000)
        heartNumberDisplay.textContent = heartNumber.toLocaleString(); 
        
        heartButton.addEventListener('click', function(){
            heartNumberDisplay.textContent = heartNumber.toLocaleString();    
            if (!heartColor.style.fill || heartColor.style.fill === 'var(--bg-secondary)'){
                heartColor.style.fill = 'rgb(170, 26, 26)';
                heartColor.style.stroke = 'rgb(170, 26, 26)';
            
                heartNumber += 1;
                heartNumberDisplay.textContent = heartNumber.toLocaleString(); 
    
            } else {
                heartColor.style.fill = 'var(--bg-secondary)';
                heartColor.style.stroke = 'black';
                
                heartNumber -= 1;
                heartNumberDisplay.textContent = heartNumber.toLocaleString(); 
            };
        });
    });

    const bookmarkButton = document.querySelectorAll('.bookmark');
    let bookmarkIdNumber = 0

    bookmarkButton.forEach(bookmarkButton => {
        bookmarkIdNumber += 1;
        bookmarkIdString = bookmarkIdNumber.toString();
        bookmarkId = 'bookmark-' + bookmarkIdString;
        bookmarkIdColor = 'bookmarkColor-' + bookmarkIdString;
        
        const bookmarkColor = document.getElementById(bookmarkIdColor);

        bookmarkButton.addEventListener('click', function(){
            if (!bookmarkColor.style.fill || bookmarkColor.style.fill ==='var(--bg-secondary)'){
                bookmarkColor.style.fill = 'rgb(230, 230, 42)';
                bookmarkColor.style.stroke = 'rgb(230, 230, 42)';
            } else {
                bookmarkColor.style.fill = 'var(--bg-secondary)';
                bookmarkColor.style.stroke = 'black';
            }
        });
    });
});

function randomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}