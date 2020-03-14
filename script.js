console.log("Hello Guy")

window.onload = function() {

    addNavigationClickHandler();
    addTagClickHandler();
    addGalleryClickHandler();
    addSliderClickHandler();


}


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

const addTagClickHandler = () => {
    document.querySelector('.gallery-selector').addEventListener('click', (e) => {

        if (e.target.classList.contains('gallery-selector__button')) {
            let clickedTag = e.target;
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

const addSliderClickHandler = () => {
    document.querySelector('.slider').addEventListener('click', (e) => {
        if (e.target.classList.contains('slider__arrow_left')) {
            let arrow = e.target;
            console.log(arrow.classList[0]);
            changeBackground('go-right');
            /*selectClickedTag(clickedTag);*/
        }
    })
}

const changeBackground = (arrow) => {
    let slider = document.querySelector('.slider');
    slider.classList.add('animated');
    slider.classList.add(arrow);
}

/*const selectClickedGalleryElement = (clickedGalleryElement) => {
    clickedGalleryElement.classList.add('gallery__element_selected');
} */