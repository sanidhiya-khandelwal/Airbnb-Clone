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

    console.log("rightmostPosition:", rightmostPosition);
    console.log("containerRect:", containerRect);
    console.log("maxTranslate:", maxTranslate);
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