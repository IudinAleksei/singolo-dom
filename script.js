window.onload = function() {
    addNavigationClickHandler();
    addNavigationScrollHandler();
    addTagClickHandler();
    addGalleryClickHandler();
    addFormSubmitHandler();
    addHomeButtonHandler();
    addSliderClickHandler();
    addModalWindowButtonHandler();
    addMenuButtonHandler();
}


//Menu Button
const addMenuButtonHandler = () => {
        document.querySelector('.burger-menu-button').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.burger-menu-button').classList.toggle('burger-menu-button_rotated');
            document.querySelector('.header-navigation').classList.toggle('header-navigation_visible');
            document.querySelector('.logo').classList.toggle('logo_menu');
            document.querySelector('.wo_header').classList.toggle('body-container_hide');

        })
    }
    // Navigation
const addNavigationClickHandler = () => {
    document.querySelector('.header-navigation').addEventListener('click', (e) => {
        if (e.target.classList.contains('header-navigation__item')) {
            e.preventDefault();
            document.querySelector('.burger-menu-button').classList.remove('burger-menu-button_rotated');
            document.querySelector('.header-navigation').classList.remove('header-navigation_visible');
            document.querySelector('.logo').classList.remove('logo_menu');
            document.querySelector('.wo_header').classList.remove('body-container_hide');
            let clickedNavItem = e.target;
            let clickedHref = clickedNavItem.getAttribute('href').slice(1);
            let headerHeight = document.querySelector('.page-header').offsetHeight;
            let elementScroll = document.getElementById(clickedHref).nextElementSibling.offsetTop - headerHeight;
            let startAnimate = Date.now();
            let startYScroll = window.pageYOffset;
            let startYDistance = elementScroll - startYScroll;
            let timer = setInterval(() => {
                let timePassed = Date.now() - startAnimate;
                if (timePassed > 315) {
                    clearInterval(timer);
                    window.scrollTo(0, elementScroll);
                    return
                }
                window.scrollTo(0, startYScroll + startYDistance * timePassed / 300);
            }, 20)
        }
    })
}

const addNavigationScrollHandler = () => {
    let currentNodeId = '';
    document.addEventListener('scroll', (e) => {
        let anchors = document.querySelectorAll('.navigaton-anchor');
        let headerHeight = document.querySelector('.page-header').offsetHeight;
        anchors.forEach(item => {
            if ((window.pageYOffset + headerHeight) >= item.nextElementSibling.offsetTop && (window.pageYOffset + headerHeight) < (item.nextElementSibling.offsetTop + item.nextElementSibling.offsetHeight) && currentNodeId != item.id) {
                currentNodeId = item.id;
                let navItem = document.querySelector(`[href="#${item.id}"]`);
                removeSelectedNavigationItem();
                selectClickedNavigationItem(navItem);
            }

        })
    });
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
            console.log(galleryElements);
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
        document.querySelector('.modal-window__subject').innerHTML = (form.Subject.value) ? 'Subject: ' + form.Subject.value : 'Without subject';
        document.querySelector('.modal-window__description').innerHTML = (form.Text.value) ? 'Description: ' + form.Text.value : 'Without description';
        document.querySelector('.modal-window').classList.add('modal-window_active');
        document.querySelector('.body-container').classList.add('body-container_hide');
    })
}

//Modal window
const addModalWindowButtonHandler = () => {
    let form = document.querySelector('.get-a-quote__form');
    document.querySelector('.modal-window__bitton').addEventListener('click', (e) => {
        document.querySelector('.modal-window').classList.remove('modal-window_active');
        document.querySelector('.body-container').classList.remove('body-container_hide');
        form.Name.value = '';
        form.Subject.value = '';
        form.Email.value = '';
        form.Text.value = '';
    })
}