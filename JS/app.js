// Selectores de idiomas
const currentLanguage = document.getElementById('language');
const languageList = document.getElementById('languages');
const languages = document.getElementsByClassName('option');

// Selector del Navbar
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')
//Languages
const flagsElement = document.getElementById('flags');

//Cambiar idioma
flagsElement.addEventListener('click', (e) => {
    let languages_item = e.target.dataset.language;
    if (languages_item === "En" || languages_item === "Es" || languages_item === "Fr" || languages_item === "Pt") {
        console.log(languages_item);
        changeLanguage(languages_item);
    } else {
        languages_item = e.target.parentElement.dataset.language;
        if (languages_item) {
            changeLanguage(languages_item);
        }
    }
});


//Cambiar texto
const textsToChange= document.querySelectorAll('[data-section]');

const changeLanguage = async languages_item =>{
    const requestJson = await fetch(`./languages/${languages_item}.json`);
    const texts = await requestJson.json();
    for (const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value= textToChange.dataset.value;
        textToChange.innerHTML= texts[section][value];
}
}


// Toggle Languages list
currentLanguage.addEventListener('click', (event) => {
    // Evitar la propagación del evento al documento
    event.stopPropagation();

    // Cerrar el menú desplegable si está abierto
    closeDropDownMenu();

    // Alternar la clase 'toggle' solo después de comprobar su estado actual
    const isLanguageListVisible = languageList.classList.contains('toggle');
    languageList.classList.toggle('toggle', !isLanguageListVisible);
});

const optionArray = Array.from(languages);

optionArray.forEach((option) => {
    option.addEventListener('click', () => {
        const languageFlag = option.getElementsByTagName('span')[0].textContent;
        setIdioma(languageFlag);

        // Cerrar la lista de idiomas después de seleccionar uno
        closeLanguageList();
    });
});

function setIdioma(language) {
    currentLanguage.getElementsByTagName('img')[0].src = `./img/${language}.svg`;
}

// Navbar responsive
toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Evitar que el clic se propague al documento
    closeLanguageList();
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');
    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});
// Cerrar la lista de idiomas al hacer clic en cualquier otro lugar de la página
document.addEventListener('click', () => {
    closeLanguageList();
    closeDropDownMenu();
});

function closeLanguageList() {
    languageList.classList.remove('toggle');
}

function closeDropDownMenu() {
    dropDownMenu.classList.remove('open');
    toggleBtnIcon.classList = 'fa-solid fa-bars';
}
