document.addEventListener('DOMContentLoaded', async function() {
    const recipeData = await loadJSON()
    const allergenList = [... new Set(recipeData.flatMap(recipe => Object.values(recipe.allergens)))];

    const allergenPreference = document.querySelector('.allergen-category-list')
    for (const allergen in allergenList) {
        const allergenName = capitaliseFirstLetter(allergenList[allergen])

        const allergenCategoryContainer = document.createElement('div')
        allergenCategoryContainer.classList.add(`allergen-category-container`)

        const allergenPreferenceCheckbox = document.createElement('input')
        allergenPreferenceCheckbox.type = 'checkbox'
        allergenPreferenceCheckbox.name = allergenList[allergen]
        allergenPreferenceCheckbox.id = allergenList[allergen]
        allergenPreferenceCheckbox.value = allergenList[allergen]
        allergenPreferenceCheckbox.classList.add('checkbox-item')
        
        const allergenPreferenceLabel = document.createElement('label')
        allergenPreferenceLabel.textContent = allergenName
        allergenPreferenceLabel.htmlFor = allergenList[allergen]
        allergenCategoryContainer.append(allergenPreferenceCheckbox)
        allergenCategoryContainer.append(allergenPreferenceLabel)
        allergenPreference.append(allergenCategoryContainer)
    }

    

    const checkboxItems = document.querySelectorAll('.checkbox-item')
    const updateButton = document.querySelector('.update-button')
    updateButton.addEventListener('click', (event) => {
        event.preventDefault()
        localStorage.removeItem('dailyRecipe')
        localStorage.removeItem('dailyRecipeBreakfast')
        let preferenceList = JSON.parse(localStorage.getItem('preferences')) || []
        const checkedPreference = Array.from(checkboxItems)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value)
        if (JSON.stringify(checkedPreference) !== JSON.stringify(preferenceList)) {
            preferencesNotify()      
        }

        if (checkedPreference.length != 0) {
            if (preferenceList.length != 0) {
                checkedPreference.forEach(preference => {
                    if (!preferenceList.includes(preference)) {
                        preferenceList.push(preference)
                    }
                });
                localStorage.setItem('preferences', JSON.stringify(preferenceList))
            } else {
                localStorage.setItem('preferences', JSON.stringify(checkedPreference))
            }
        }

        const uncheckedPreference = Array.from(checkboxItems)
            .filter(checkbox => !checkbox.checked)
            .map(checkbox => checkbox.value)

        uncheckedPreference.forEach(unchecked => {
            preferenceList.forEach(preference => {
                if (unchecked.includes(preference)) {
                    preferenceList = preferenceList.filter(
                        checked => !preference.includes(checked)
                    )
                    localStorage.setItem('preferences', JSON.stringify(preferenceList))
                }
            });
        });
    })
   
    const preferenceList = JSON.parse(localStorage.getItem('preferences')) || []
    if (preferenceList.length != 0) {
        const allergenPreferenceCheckbox = document.querySelectorAll('.checkbox-item')
        allergenPreferenceCheckbox.forEach(checkbox => {
            if (preferenceList.includes(checkbox.value)) {
                checkbox.checked = true
            }
        }); 
    }
   
    navbar()
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

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() +string.slice(1);
}

function navbar() {
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
}
function preferencesNotify(){
    const notifyPreference = document.querySelector('.preferences-saved')
    notifyPreference.classList.toggle('show')

    setTimeout(() => {
        notifyPreference.classList.toggle('show')
    }, 1000);
}