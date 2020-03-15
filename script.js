window.onload = function() {

    addNavigationClickHandler();
    addTagClickHandler();
    addGalleryClickHandler();
    addFormSubmitHandler();
    addHomeButtonHandler();
    addSliderClickHandler();


}

// Navigation
const addNavigationClickHandler = () => {
    document.querySelector('.header-navigation').addEventListener('click', (e) => {

        if (e.target.classList.contains('header-navigation__item')) {
            let clickedNavItem = e.target;

            removeSelectedNavigationItem();
            selectClickedNavigationItem(clickedNavItem);
        }
    })
}

const removeSelectedNavigationItem = () => {
    let navItem = document.querySelectorAll('.header-navigation__item_selected');
    navItem.forEach(navItem => {
        navItem.classList.remove('header-navigation__item_selected');
    })
}

const selectClickedNavigationItem = (clickedNavItem) => {
    clickedNavItem.classList.add('header-navigation__item_selected');
}

//Slider

let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let animationFlag = true;

const addSliderClickHandler = () => {
    document.querySelector('.slider__control_left').addEventListener('click', (e) => {

        if (animationFlag) {
            currentSlide = prevSlide(currentSlide);
        }
    })
    document.querySelector('.slider__control_right').addEventListener('click', (e) => {

        if (animationFlag) {
            currentSlide = nextSlide(currentSlide);
        }
    })

}

const changeSlide = (s) => {
    return (s + slides.length) % slides.length

}

const prevSlide = (s) => {
    hideSlide(s, 'go-right');
    let cs = changeSlide(s - 1);
    showSlide(cs, 'from-left');
    return cs
}

const nextSlide = (s) => {
    hideSlide(s, 'go-left');
    let cs = changeSlide(s + 1);
    showSlide(cs, 'from-right');
    return cs
}

const hideSlide = (s, dirClass) => {
    animationFlag = false;
    slides[s].classList.add(dirClass);
    slides[s].addEventListener('animationend', () => {
        slides[s].classList.remove('active', dirClass);
    });
}

const showSlide = (s, dirClass) => {
    slides[s].classList.add('next', dirClass);
    slides[s].addEventListener('animationend', () => {
        slides[s].classList.remove('next', dirClass);
        slides[s].classList.add('active');
        animationFlag = true;
    });

}

// On-Off Phone Screen
const addHomeButtonHandler = () => {
    document.querySelector('.slide').addEventListener('click', (e) => {
        if (e.target.classList.contains('home-button')) {
            if (e.target.nextElementSibling.classList.contains('hide-display')) {
                e.target.nextElementSibling.classList.remove('hide-display');
            } else {
                e.target.nextElementSibling.classList.add('hide-display');
            }
        }
    })
}

// Gallery Tag
const addTagClickHandler = () => {
    document.querySelector('.gallery-selector').addEventListener('click', (e) => {

        if (e.target.classList.contains('gallery-selector__button')) {
            let clickedTag = e.target;
            let galleryElements = document.getElementsByClassName('gallery__element');
            galleryElements[galleryElements.length - 1].after(galleryElements[0]);
            removeSelectedTag();
            selectClickedTag(clickedTag);
        }
    })
}

const removeSelectedTag = () => {
    let tag = document.querySelectorAll('.gallery-selector__button_selected');
    tag.forEach(tag => {
        tag.classList.remove('gallery-selector__button_selected');
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('gallery-selector__button_selected');
}

// Gallery Element Selector
const addGalleryClickHandler = () => {
    document.querySelector('.gallery').addEventListener('click', (e) => {
        if (e.path[1].classList.contains('gallery__element')) {
            let clickedGalleryElement = e.path[1];
            removeSelectedGalleryElement();
            selectClickedGalleryElement(clickedGalleryElement);

        }
    })
    document.querySelector('.portfolio').addEventListener('click', (e) => {
        if (!e.path[1].classList.contains('gallery__element')) {
            removeSelectedGalleryElement();
        }
    })
}

const removeSelectedGalleryElement = () => {
    let GalleryElement = document.querySelectorAll('.gallery__element_selected');
    GalleryElement.forEach(GalleryElement => {
        GalleryElement.classList.remove('gallery__element_selected');
    })
}

const selectClickedGalleryElement = (clickedGalleryElement) => {
    clickedGalleryElement.classList.add('gallery__element_selected');
}

// Form 
const addFormSubmitHandler = () => {
    let form = document.querySelector('.get-a-quote__form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let messageText = 'Письмо отправлено\n';
        messageText += (form.Subject.value != '') ? 'Тема: ' + form.Subject.value + '\n' : 'Без темы' + '\n';
        messageText += (form.Text.value != '') ? 'Описание: ' + form.Text.value + '\n' : 'Без описания' + '\n';
        alert(messageText);
    })
}