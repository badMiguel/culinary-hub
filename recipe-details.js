document.addEventListener('DOMContentLoaded', function() {
    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => {
            loadRecipes(data);
            attachClickHandlers();
        })
        .catch(error => console.error('Error fetching recipes:', error));
});

function loadRecipes(recipesData) {
    const container = document.getElementById('recipes-container');
    recipesData.forEach((recipe, index) => {
        const cardHtml = `
            <div class="card" data-index="${index}">
                <div class="image-container">
                    <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
                </div>
                <div class="caption-container">
                    <div class="image_title">${recipe.recipe_title}</div>
                    <p>${recipe.recipe_description}</p>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

function attachClickHandlers() {
    const cards = document.querySelectorAll('.card');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            showRecipeDetails(index);
        });
    });

    overlay.addEventListener('click', function() {
        this.classList.remove('active');
        document.querySelector('.detail-view').classList.remove('active');
    });
}

function showRecipeDetails(index) {
    const recipe = recipesData[index];
    const detailHtml = `
        <div class="detail-view">
            <h2>${recipe.recipe_title}</h2>
            <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}" style="width:100%;">
            <p><strong>Description:</strong> ${recipe.recipe_description}</p>
            <p><strong>Ingredients:</strong> <ul>${recipe.ingredients.map(i => `<li>${i.ingredient_name}: ${i.quantity}</li>`).join('')}</ul></p>
            <p><strong>Instructions:</strong> <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol></p>
        </div>
    `;
    const modalContainer = document.querySelector('.detail-view') || document.createElement('div');
    if (!modalContainer.classList.contains('detail-view')) {
        document.body.appendChild(modalContainer);
    }
    modalContainer.innerHTML = detailHtml;
    modalContainer.classList.add('active');
    document.querySelector('.overlay').classList.add('active');
}

