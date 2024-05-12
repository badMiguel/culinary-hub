document.addEventListener('DOMContentLoaded', async function() {
    // load json file
    const recipeData = await loadJSON()
    console.log(recipeData)

    // ---------------------------------- //

    // check console log what this does
    // recipeData.forEach(recipe => {
    //     console.log(recipe)
    // });

    // ---------------------------------- //
    
    const sampleRecipe = recipeData[0]
    console.log(sampleRecipe)

    // get each data of recipe on the json file
    const {
        recipe_link,
        recipe_image,
        recipe_title,
        recipe_description,
        prep_time,
        allergens,
        cooking_skill_level,
        cuisine_type,
    } = sampleRecipe;

    console.log(recipe_link)
    console.log(recipe_image)
    console.log(recipe_title)
    console.log(recipe_description)
    console.log(prep_time)
    console.log(allergens)
    console.log(cooking_skill_level)
    console.log(cuisine_type)

    // put the data to html 
    const recipeLink = document.getElementById('link')
    recipeLink.href = recipe_link
    
    const recipePicture = document.getElementById('image')
    recipePicture.src = recipe_image
    recipePicture.style.width = '100%'

    const recipeTitle = document.getElementById('recipe-title').querySelector('a')
    recipeTitle.textContent = recipe_title
    recipeTitle.href = recipe_link

    const description = document.getElementById(`description`)
    description.textContent = recipe_description

    const prepTime = document.getElementById(`prep-time`)
    prepTime.textContent = prep_time
    
    const recipeAllergens = document.getElementById(`allergens`)
    recipeAllergens.textContent = allergens.map(allergen => `${(allergen)}`).join(", ")

    const skillLevel = document.getElementById(`skill-level`)
    skillLevel.textContent = cooking_skill_level

    const foodCategory = document.getElementById(`cuisine`)
    foodCategory.textContent = cuisine_type
})

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
