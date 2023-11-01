var icons = document.querySelectorAll(".icon-container")
var currentTranslate = 0;
var maxTranslate = 0;

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

}

function scrollToLeft() {
    currentTranslate += 500;

    // Limit the translation to 0 (start position)
    currentTranslate = Math.min(currentTranslate, 0);

    icons.forEach(function (icon) {
        icon.style.transitionTimingFunction = "ease-in-out"
        icon.style.transform = "translate(" + currentTranslate + "px)"
    })

}

calculateMaxTranslate();

// Hero section code o display only 8 items
var obj = [
    { src: './assets/Places/Villa_02/Villa_02_02.webp', EntityName: 'Kihim,India', distance: '111 km away', availability: '9-14 Nov', cost: 'Rs 28,314 night' },
    { src: ['./assets/Places/Villa_01/Villa_1_01.webp', './assets/Places/Villa_08/Villa_08_01.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
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

]


var container = document.querySelector('.hero-section-container')
var imagesContainer = document.querySelector('.hero-section-item-img-container')


obj.forEach((item, idx) => {
    var HouseImage = document.getElementById('house-image');
    var HouseName = document.getElementById('house-name');
    var HouseDistance = document.getElementById('house-distance');
    var HouseAvailability = document.getElementById('house-availability');
    var HouseCost = document.getElementById('house-cost');

    //By using the Array.isArray() method and the if statement, you can ensure that the forEach method is only called
    //  if item.src is an array, avoiding the error. If item.src is not an array,
    //  you can include alternative logic in the else block to handle the situation appropriately.

    if (Array.isArray(item.src)) {
        var newImagesContainer = document.createElement('div'); // Create a new container for images
        newImagesContainer.classList.add('hero-section-item-img-container'); // Apply the appropriate class

        for (var i = 0; i < item.src.length; i++) {
            var img = document.createElement('img');
            img.src = item.src[i];
            newImagesContainer.appendChild(img); //appending the image to container
        }
        container.appendChild(newImagesContainer)
    } else {
        // Handle the case when item.src is not an array
        HouseImage.src = item.src;
    }
    console.log('array');

    HouseName.textContent = item.EntityName;
    HouseDistance.textContent = item.distance;
    HouseAvailability.textContent = item.availability;
    HouseCost.textContent = item.cost;

    var clone = document.querySelector('.hero-section-items').cloneNode(true); //hero-section-items will be created
    container.appendChild(clone);//append inside hero-section-container
})



//----------------------------------------
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

            newItems.forEach((item, idx) => {
                var HouseImage = document.getElementById('house-image');
                var HouseName = document.getElementById('house-name');
                var HouseDistance = document.getElementById('house-distance');
                var HouseAvailability = document.getElementById('house-availability');
                var HouseCost = document.getElementById('house-cost');

                //By using the Array.isArray() method and the if statement, you can ensure that the forEach method is only called
                //  if item.src is an array, avoiding the error. If item.src is not an array,
                //  you can include alternative logic in the else block to handle the situation appropriately.
                if (Array.isArray(item.src)) {
                    for (var i = 0; i < item.src.length; i++) {
                        var img = document.createElement('img');
                        img.src = item.src[i];
                        // console.log('hi');
                        //appending the image to container
                        imagesContainer.appendChild(img);

                    }
                } else {
                    // Handle the case when item.src is not an array
                    HouseImage.src = item.src;
                }


                HouseName.textContent = item.EntityName;
                HouseDistance.textContent = item.distance;
                HouseAvailability.textContent = item.availability;
                HouseCost.textContent = item.cost;

                var clone = document.querySelector('.hero-section-items').cloneNode(true); //hero-section-items will be created
                container.appendChild(clone);//append inside hero-section-container
            })

            currentPage++;
            isLoading = false;
            loadingMessage.classList.add('hide')
        }, 2000);
    }
}

function getTotalPages() {
    var allItems = [
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: ['./assets/Places/Villa_01/Villa_1_01.webp', './assets/Places/Villa_08/Villa_08_01.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
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

        { src: ['./assets/Places/Villa_01/Villa_1_01.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
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

    return Math.ceil(allItems.length / itemsPerPage);
}

function getItems(page, perPage) {
    //simulated data source
    var allItems = [
        { src: './assets/Places/Villa_01/Villa_1_01.webp', EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
        { src: ['./assets/Places/Villa_01/Villa_1_01.webp', './assets/Places/Villa_08/Villa_08_01.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
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

        // { src: ['./assets/Places/Villa_01/Villa_1_01.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
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