document.addEventListener('DOMContentLoaded', function(){
    const heartButton = document.querySelector('.heart');
    const heartColor = document.querySelector('.heart-color');
    const heartNumberDisplay = document.querySelector('.heart-number');

    let heartNumber = 1233
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

    const bookmarkButton = document.querySelector('.bookmark');
    const bookmarkColor = document.querySelector('.bookmark-color');

    bookmarkButton.addEventListener('click', function(){
        if (!bookmarkColor.style.fill || bookmarkColor.style.fill ==='var(--bg-secondary)'){
            bookmarkColor.style.fill = 'rgb(230, 230, 42)';
            bookmarkColor.style.stroke = 'rgb(230, 230, 42)';
        } else {
            bookmarkColor.style.fill = 'var(--bg-secondary)';
            bookmarkColor.style.stroke = 'black';
        }
    });

    const viewMore = document.querySelector('.view-more');
    const hiddenContent = document.querySelector('.hidden-content');
    const card = document.querySelector('.card');

    viewMore.addEventListener('click', function(){
        const cardLeftEdge = card.getBoundingClientRect();
        const cardLeft = cardLeftEdge.left;

        const buttonLeftEdge = viewMore.getBoundingClientRect();
        const buttonLeft = buttonLeftEdge.right;

        let windowWidth = window.innerWidth

        let cardTranslate = cardLeft*.8
        let buttonTranslate = (windowWidth-buttonLeft)*.8

        card.style.transform = `translateX(-${cardTranslate}px)`;
        card.style.transition= 'transform 0.5s ease';
        viewMore.style.transform = `translateX(${buttonTranslate}px)`;
        viewMore.style.transition= 'transform 0.5s ease';
    });
});