// Remove Child Nodes
export function removeChildNodes(id) {
    let element = document.querySelector(`#${id}`);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Search Delay
export function debounce(func, delay) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && this.lastCall - previousCall <= delay) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => func(args), delay);
    };
}

// Formatting Date
export function formatDate(strDate) {
    // Months
    const MONTH_NAMES = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];

    let date = new Date(strDate);
    let day = date.getDate();
    let month = MONTH_NAMES[date.getMonth()];
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

// Create Rating
export function createRating(productRating, maxProductRating = 5) {
    // Product Star img
    const GOLD_STAR = "<img src='./assets/img/star-bold.svg' alt='star-gold'>";
    const EMPTY_STAR = "<img src='./assets/img/star.svg' alt='star-empty'>";
    let starRating = "";

    // Add Gold Star
    for (let i = 0; i < productRating; i++) {
        starRating += GOLD_STAR;
    }
    // Add Empty Star
    for (let i = maxProductRating; i > productRating; i--) {
        starRating += EMPTY_STAR;
    }

    return starRating;
}

// Successfully Action
export function showSuccessfulAction(item, action) {
    const SUCCESSFULLY_FORM = document.querySelector("#successfully");
    const SUCCESSFULLY_FORM_ITEM = document.querySelector("#successfully-name");
    const SUCCESSFULLY_FORM_ACTION = document.querySelector(
        "#successfully-verb"
    );
    const SUCCESSFULLY_DELAY = 2000;

    SUCCESSFULLY_FORM_ITEM.innerHTML = item;
    SUCCESSFULLY_FORM_ACTION.innerHTML = action;
    SUCCESSFULLY_FORM.classList.remove("hide");
    setTimeout(
        () => SUCCESSFULLY_FORM.classList.add("hide"),
        SUCCESSFULLY_DELAY
    );
}
