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

// Hero section code
var obj = [
    { src: ['./assets/Places/Villa_01/Villa_1_01.webp', './assets/Places/Villa_01/Villa_1_02.webp', , './assets/Places/Villa_01/Villa_1_03.webp'], EntityName: 'Alibagh,India', distance: '51 km away', availability: '5-10 Nov', cost: 'Rs 68,314 night' },
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
]

var container = document.querySelector('.hero-section-container');


obj.forEach((item, idx) => {
    var HouseImage = document.getElementById('house-image');
    var HouseName = document.getElementById('house-name');
    var HouseDistance = document.getElementById('house-distance');
    var HouseAvailability = document.getElementById('house-availability');
    var HouseCost = document.getElementById('house-cost');
    var imageContainer = document.getElementById('hero-section-item-img-container');
    //By using the Array.isArray() method and the if statement, you can ensure that the forEach method is only called
    //  if item.src is an array, avoiding the error. If item.src is not an array,
    //  you can include alternative logic in the else block to handle the situation appropriately.
    if (Array.isArray(item.src)) {
        item.src.forEach(image => {
            // Your logic for handling each image
            item.src.forEach(image => {
                HouseImage.src = image
                imageContainer.appendChild(HouseImage)
            });
        });
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