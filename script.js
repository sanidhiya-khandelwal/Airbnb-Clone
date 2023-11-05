var icons = document.querySelectorAll(".icon-container")
var currentTranslate = 0;
var maxTranslate = 0;
var FilterLeftArrowButton = document.querySelector('.left-button-filter')
var FilterRightArrowButton = document.querySelector('.right-button-filter')

function calculateMaxTranslate() {
    var rightmostPosition = 0;

    icons.forEach(function (icon) {
        var iconRect = icon.getBoundingClientRect();
        var iconRight = iconRect.right;
        if (iconRight > rightmostPosition) {
            rightmostPosition = iconRight;
        }
    });

    var containerRect = icons[0].parentElement.getBoundingClientRect();
    maxTranslate = containerRect.right - rightmostPosition;
}
function scrollToRight() {
    currentTranslate -= 500;

    // Limit the translation to the maximum value
    currentTranslate = Math.max(currentTranslate, maxTranslate);

    icons.forEach(function (icon) {
        icon.style.transitionTimingFunction = "ease-in-out"
        icon.style.transform = "translate(" + currentTranslate + "px)"
    })
    FilterLeftArrowButton.style.display = 'block';

    if (currentTranslate == maxTranslate) {
        FilterRightArrowButton.style.display = 'none';
    }

}

function scrollToLeft() {
    FilterRightArrowButton.style.display = 'block';
    currentTranslate += 500;

    // Limit the translation to 0 (start position)
    currentTranslate = Math.min(currentTranslate, 0);
    icons.forEach(function (icon) {
        icon.style.transitionTimingFunction = "ease-in-out"
        icon.style.transform = "translate(" + currentTranslate + "px)"
    })

    if (currentTranslate == 0) {
        FilterLeftArrowButton.style.display = 'none';
    }

}

calculateMaxTranslate();

//repeating code
function displayData(item, idx) {

    var newImagesContainer = document.createElement('div');
    newImagesContainer.classList.add('hero-section-item-img-container');

    var itemContainer = document.createElement('div');
    itemContainer.classList.add('hero-section-items');

    var images = item.src;//array created
    var currentImageIndex = 0;

    //show image
    function showCurrentImage() {
        newImagesContainer.innerHTML = ''; //responsible for clearing the content of the newImagesContainer before adding a new image. This step ensures that only the current image is displayed at a time, preventing multiple images from being appended to the container.

        var img = document.createElement('img');
        img.src = images[currentImageIndex];
        newImagesContainer.appendChild(img);
    }
    var heartButton = document.createElement('img');
    heartButton.classList.add('heart-button-img');
    heartButton.src = './assets/icons/heart.png';


    var rightButton = document.createElement('div');
    rightButton.classList.add('right-button-on-img');
    var rightArrowImg = document.createElement('img');
    rightArrowImg.src = './assets/icons/double-left-arrow.png';
    rightButton.appendChild(rightArrowImg);

    //mouse-in effects
    itemContainer.addEventListener('mouseover', () => {
        rightButton.style.display = 'block';
        //for first image we will not show left button
        if (currentImageIndex != 0) {
            leftButton.style.display = 'block';
        }
        //for last image we will not show right button
        if (currentImageIndex == images.length - 1) {
            rightButton.style.display = 'none';
        }

    })
    //mouse-out effects
    itemContainer.addEventListener('mouseout', () => {

        rightButton.style.display = 'none';
        leftButton.style.display = 'none';
    })

    var leftButton = document.createElement('div');
    leftButton.classList.add('left-button-on-img');
    var leftArrowImg = document.createElement('img');
    leftArrowImg.src = './assets/icons/double-right-arrow.png';
    leftButton.style.display = 'none';
    leftButton.appendChild(leftArrowImg);

    function moveRight() {
        currentImageIndex++;
        if (currentImageIndex > 0) {
            leftButton.style.display = 'block';
        }

        if (currentImageIndex == (images.length - 1)) {
            rightButton.style.display = 'none';
        }
        showCurrentImage();
    }

    function moveLeft() {
        if (currentImageIndex == 1) {
            leftButton.style.display = 'none';
        }
        currentImageIndex--;
        showCurrentImage();
    }

    rightButton.addEventListener('click', moveRight);
    leftButton.addEventListener('click', moveLeft);

    itemContainer.appendChild(newImagesContainer);
    itemContainer.appendChild(leftButton);
    itemContainer.appendChild(rightButton);
    itemContainer.appendChild(heartButton)

    var houseName = document.createElement('h6');
    houseName.textContent = item.EntityName;
    itemContainer.appendChild(houseName);

    var houseDistance = document.createElement('p');
    houseDistance.textContent = item.distance;
    itemContainer.appendChild(houseDistance);

    var houseAvailability = document.createElement('p');
    houseAvailability.textContent = item.availability;
    itemContainer.appendChild(houseAvailability);

    var houseCost = document.createElement('h6');
    houseCost.textContent = item.cost;
    itemContainer.appendChild(houseCost);

    container.appendChild(itemContainer);

    showCurrentImage();
}


// Hero section code  display only 8 items
var obj = [
    { src: ['./assets/Places/Villa_01/Villa_1_01.webp', './assets/Places/Villa_01/Villa_1_02.webp', './assets/Places/Villa_01/Villa_1_03.webp', './assets/Places/Villa_01/Villa_1_04.webp', './assets/Places/Villa_01/Villa_1_05.webp'], EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
    { src: ['./assets/Places/Villa_02/Villa_02_01.webp', './assets/Places/Villa_02/Villa_02_02.webp', './assets/Places/Villa_02/Villa_02_03.webp', './assets/Places/Villa_02/Villa_02_04.webp', './assets/Places/Villa_02/Villa_02_05.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
    { src: ['./assets/Places/Villa_03/Villa_03_01.webp', './assets/Places/Villa_03/Villa_03_02.webp', './assets/Places/Villa_03/Villa_03_03.webp', './assets/Places/Villa_03/Villa_03_04.webp', './assets/Places/Villa_03/Villa_03_05.webp'], EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
    { src: ['./assets/Places/Villa_04/Villa_04_01.webp', './assets/Places/Villa_04/Villa_04_02.webp', './assets/Places/Villa_04/Villa_04_03.webp', './assets/Places/Villa_04/Villa_04_04.webp', './assets/Places/Villa_04/Villa_04_05.webp'], EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
    { src: ['./assets/Places/Villa_05/Villa_05_01.webp', './assets/Places/Villa_05/Villa_05_02.webp', './assets/Places/Villa_05/Villa_05_03.webp', './assets/Places/Villa_05/Villa_05_04.webp', './assets/Places/Villa_05/Villa_05_05.webp'], EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
    { src: ['./assets/Places/Villa_06/Villa_06_01.webp', './assets/Places/Villa_06/Villa_06_02.webp', './assets/Places/Villa_06/Villa_06_03.webp', './assets/Places/Villa_06/Villa_06_04.webp', './assets/Places/Villa_06/Villa_06_05.webp'], EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
    { src: ['./assets/Places/Villa_07/Villa_07_01.webp', './assets/Places/Villa_07/Villa_07_02.webp', './assets/Places/Villa_07/Villa_07_03.webp', './assets/Places/Villa_07/Villa_07_04.webp', './assets/Places/Villa_07/Villa_07_05.webp'], EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
    { src: ['./assets/Places/Villa_08/Villa_08_01.webp', './assets/Places/Villa_08/Villa_08_02.webp', './assets/Places/Villa_08/Villa_08_03.webp', './assets/Places/Villa_08/Villa_08_04.webp', './assets/Places/Villa_08/Villa_08_05.webp'], EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
]

var container = document.querySelector('.hero-section-container');

obj.forEach((item, idx) => {
    displayData(item, idx);
});





//load content on scroll
var itemsPerPage = 7;
var currentPage = 1;
var isLoading = false; //flag to prevent mutiple simultaneous requests 


var cardContainer = document.querySelector('.hero-section-items');
var loadingMessage = document.getElementById('loading-message');

window.addEventListener('scroll', loadMoreItems);

function loadMoreItems() {
    // Check if there is an ongoing request or if all items are already loaded
    if (isLoading || currentPage > getTotalPages()) {
        return;
    }

    var scrollPosition = window.innerHeight + window.scrollY;
    var contentHeight = cardContainer.offsetHeight;

    //define the scroll threshold (in pixels)
    var scrollThreshold = 200;

    //check if user has scrolled near the bottom of the content
    if (scrollPosition > contentHeight - scrollThreshold) {
        isLoading = true;
        loadingMessage.classList.remove('hide');

        //simulate fetching new items from a data source
        setTimeout(function () {
            var newItems = getItems(currentPage, itemsPerPage)
            var container = document.querySelector('.hero-section-container');

            newItems.forEach((item, idx) => {
                displayData(item, idx)
            })

            currentPage++;
            isLoading = false;
            loadingMessage.classList.add('hide')
        }, 2000);
    }
}

function getTotalPages() {
    var allItems = [
        { src: ['./assets/Places/Villa_01/Villa_1_01.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: ['./assets/Places/Villa_01/Villa_1_01.webp', './assets/Places/Villa_08/Villa_08_01.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: ['./assets/Places/Villa_02/Villa_02_03.webp'], EntityName: 'andnL,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: ['./assets/Places/Villa_02/Villa_02_03.webp'], EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: ['./assets/Places/Villa_02/Villa_02_03.webp'], EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: ['./assets/Places/Villa_01/Villa_1_01.webp'], EntityName: '1Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: ['./assets/Places/Villa_02/Villa_02_03.webp'], EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: ['./assets/Places/Villa_02/Villa_02_03.webp'], EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' }
    ];

    return Math.ceil(allItems.length / itemsPerPage);
}

function getItems(page, perPage) {
    //ITEMS OTHER THAN WHAT WE HAVE DISPLAYED INTIALLY
    var allItems = [
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Positano,Italy', distance: '6000 km away', availability: '4-9 Nov', cost: 'Rs 2,68,314 night' },
        { src: ['./assets/Places/Villa_10/Villa_10_01.webp', './assets/Places/Villa_10/Villa_10_02.webp', './assets/Places/Villa_10/Villa_10_03.webp', './assets/Places/Villa_10/Villa_10_04.webp', './assets/Places/Villa_10/Villa_10_05.webp'], EntityName: 'Udaipur,India', distance: 'Built in 2020', availability: '5-10 Nov', cost: 'Rs 38,741 night' },
        { src: ['./assets/Places/Villa_11/Villa_11_01.webp', './assets/Places/Villa_11/Villa_11_02.webp', './assets/Places/Villa_11/Villa_11_03.webp', './assets/Places/Villa_11/Villa_11_04.webp', './assets/Places/Villa_11/Villa_11_05.webp'], EntityName: 'Jibhi,India', distance: '1473 km away', availability: '18-23 Nov', cost: 'Rs 10,691 night' },
        { src: ['./assets/Places/Villa_12/Villa_12_01.webp', './assets/Places/Villa_12/Villa_12_02.webp', './assets/Places/Villa_12/Villa_12_03.webp', './assets/Places/Villa_12/Villa_12_04.webp', './assets/Places/Villa_12/Villa_12_05.webp'], EntityName: 'IN,India', distance: '1081 km away', availability: '12-11 Nov', cost: 'Rs 11,314 night' },
        { src: ['./assets/Places/Villa_13/Villa_13_01.webp', './assets/Places/Villa_13/Villa_13_02.webp', './assets/Places/Villa_13/Villa_13_03.webp', './assets/Places/Villa_13/Villa_13_04.webp', './assets/Places/Villa_13/Villa_13_05.webp'], EntityName: 'Assagao,India', distance: '389 km away', availability: '16-20 Nov', cost: 'Rs 26,314 night' },
        { src: ['./assets/Places/Villa_14/Villa_14_01.webp', './assets/Places/Villa_14/Villa_14_02.webp', './assets/Places/Villa_14/Villa_14_03.webp', './assets/Places/Villa_14/Villa_14_04.webp', './assets/Places/Villa_14/Villa_14_05.webp'], EntityName: 'Anjuna,India', distance: '390 km away', availability: '19-24 Dec', cost: 'Rs 45,114 night' },
        { src: ['./assets/Places/Villa_15/Villa_15_01.webp', './assets/Places/Villa_15/Villa_15_02.webp', './assets/Places/Villa_15/Villa_15_03.webp', './assets/Places/Villa_15/Villa_15_04.webp', './assets/Places/Villa_15/Villa_15_05.webp'], EntityName: 'Siolim,India', distance: '72 km away', availability: '11-16 Dec', cost: 'Rs 28,474 night' },
        { src: ['./assets/Places/Villa_16/Villa_16_01.webp', './assets/Places/Villa_16/Villa_16_02.webp', './assets/Places/Villa_16/Villa_16_03.webp', './assets/Places/Villa_16/Villa_16_04.webp', './assets/Places/Villa_16/Villa_16_05.webp'], EntityName: 'Capetown,South Africa', distance: '8236 km away', availability: '7-12 Nov', cost: 'Rs 1,28,764 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: ['./assets/Places/Villa_09/Villa_09_01.webp', './assets/Places/Villa_09/Villa_09_02.webp', './assets/Places/Villa_09/Villa_09_03.webp', './assets/Places/Villa_09/Villa_09_04.webp', './assets/Places/Villa_09/Villa_09_05.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },

        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' },
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
        { src: './assets/Places/Villa_01/Villa_1_03.webp', EntityName: 'Akshi,India', distance: '18 km away', availability: '18-23 Nov', cost: 'Rs 18,154 night' },
        { src: './assets/Places/Villa_01/Villa_1_04.webp', EntityName: 'Kolgaon,India', distance: '351 km away', availability: '6-11 Nov', cost: 'Rs 8,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_01.webp', EntityName: 'Vaishet,India', distance: '91 km away', availability: '8-13 Nov', cost: 'Rs 6,314 night' },
        { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Parra,India', distance: '41 km away', availability: '2-7 Nov', cost: 'Rs 5,114 night' },
        { src: './assets/Places/Villa_02/Villa_02_03.webp', EntityName: 'Nashik,India', distance: '151 km away', availability: '11-16 Nov', cost: 'Rs 48,354 night' },
        { src: './assets/Places/Villa_02/Villa_02_04.webp', EntityName: 'Kharavandi,India', distance: '211 km away', availability: '17-22 Nov', cost: 'Rs 28,764 night' }

    ];

    var startIndex = (page - 1) * perPage;
    var endIndex = page * perPage;

    return allItems.slice(startIndex, endIndex);

}