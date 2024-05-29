
document.addEventListener('DOMContentLoaded', function() {
    navBar()
})

function navBar() {
    // hides and shows the menu when clicked
    const header = document.querySelector('header')
    const hamburgerIcon = document.querySelector('.hamburger-menu')
    const navigationMenu = document.querySelector('.nav-link-list')
    const topPartBurger = document.querySelector('.burger-top-part')
    const middlePartBurger = document.querySelector('.burger-middle-part')
    const bottomPartBurger = document.querySelector('.burger-bottom-part')
    hamburgerIcon.addEventListener('click', function () {
        navigationMenu.classList.toggle('show')
        topPartBurger.classList.toggle('close')
        middlePartBurger.classList.toggle('close')
        bottomPartBurger.classList.toggle('close')
        header.classList.toggle('show')
    })
    const navigationLinks = document.querySelectorAll('.nav-link')
    navigationLinks.forEach(links => {
        if (links.textContent != 'Home')
            links.addEventListener('click', () => {
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
    const logo = document.querySelector('.logo')
    // const lightDarkModeToggle = document.querySelector('.light-dark-mode-toggle')
    // console.log(lightDarkModeToggle)
    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            header.style.backgroundColor = '#3C6DC5'
            header.style.boxShadow = '0 1px 10px rgba(0,0,0,0.5)'
            headerLinks.forEach(link => {
                link.style.color = '#FBFBFD'
            });
            hamburgerIconParts.forEach(part => {
                part.style.backgroundColor = '#FBFBFD'
            });
            logo.src = 'images/logo_white.webp'
            // lightDarkModeToggle.classList.remove("md-dark")
            // lightDarkModeToggle.classList.add('md-light')

        } else {
            header.style.backgroundColor = '#F2F4FA'
            header.style.boxShadow = ''
            headerLinks.forEach(link => {
                link.style.color = '#0B0D10'
            })
            hamburgerIconParts.forEach(part => {
                part.style.backgroundColor = '#0B0D10'
            });
            logo.src = 'images/logo_black.webp'
            // lightDarkModeToggle.classList.remove("md-light")
            // lightDarkModeToggle.classList.add('md-dark')
        }
    })
}