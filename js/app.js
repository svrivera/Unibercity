// Variables
const courses = document.getElementById('lista-cursos');
const cart = document.getElementById('carrito');
const cartList = document.querySelector('#lista-carrito tbody');


// Listeners
eventListeners();

function eventListeners() {
    // Triggers when add to cart botton is pressed
    courses.addEventListener('click', addToCart);
    // Triggers when remove from cart botton is pressed
    cart.addEventListener('click', removeFromCart);
    // Loads cart from localStorage
    document.addEventListener('DOMContentLoaded', reloadCartLocalStorage)

}



// Functions


// Adds course to cart
function addToCart(e) {
    e.preventDefault();
    // Delegation for card course
    if (e.target.classList.contains('agregar-carrito')) {
        const course = e.target.parentElement.parentElement;
        // Gets info from the course card
        const courseInfo = getCourseInfo(course)
        // Adds the course to the cart list
        addToCartList(courseInfo);
        // Adds the new course to localStorage
        addToLocalStorage(courseInfo);
    };
}


// Gets all the information of the course from de course card
function getCourseInfo(course) {
    // Uses querySelector to get all the course information
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    return courseInfo;
}


// Adds the selected course to the cart list
function addToCartList(courseInfo) {
    // Creates the new table item for the cart list
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> 
            <img src="${courseInfo.image}" width=150>
        </td>
        <td>${courseInfo.title}</td>
        <td>${courseInfo.price}</td>
        <td>
            <a href= "#" class= "borrar-curso" data-id= "${courseInfo.id}"> X </a>
        </td>
    `
    // Gives the table item to the cart list
    cartList.appendChild(row);
}


// Removes the selected course from the cart list
function removeFromCart(e) {
    // Prevents default action on click of the botton
    e.preventDefault();
    // Prevents delegation so click is only on delete botton
    if (e.target.className === 'borrar-curso') {
        const courseId = e.target.getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
        removeFromLocalStorage(courseId);
    }
    // Prevents delegation so click is only on empty cart botton
    if (e.target.id === 'vaciar-carrito') {
        // Deletes every child of the cart list
        while (cartList.firstChild) {
            cartList.firstChild.remove();
            // Removes all the courses from localStorage
            localStorage.setItem('cart', '[]')
        }
    }
}

// Adds the course to localStorage
function addToLocalStorage(course) {
    // Gets the courses on cart from localStorage
    let cart = getCartLocalStorage();
    // Adds the new course to the cart
    cart.push(course);
    // Sends the new cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartLocalStorage() {
    // Gets the cart from localStorage
    let cart = localStorage.getItem('cart');
    // If it's null, it returns an empty array
    if (cart === null) {
        return [];
    }
    // It returns the cart parsed, were it's empty or not
    return JSON.parse(cart);
}

// Reloads cart with what is on localStorage
function reloadCartLocalStorage() {
    const cartLS = getCartLocalStorage();
    // Adds to cartList every course from localStorage
    cartLS.forEach(cartItem => {
        addToCartList(cartItem);
    });
}

// Removes course from localStorage
function removeFromLocalStorage(courseId) {
    // Gets every course from localStorage
    let cartLS = getCartLocalStorage();
    // Searches for the courseId in the courses from localStorage
    cartLS.forEach((cartItem, index) => {
        if (cartItem.id === courseId) {
            // Removes the course from the list
            cartLS.splice(index,1);
        }
    // Uploads the new cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartLS));
    });
}

