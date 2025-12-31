const queryString = window.location.search
const UrlParams = new URLSearchParams(queryString)
const id = UrlParams.get("id")
console.log(queryString)
console.log(id)


const icons = {
    fav: "./assets/images/Favorite (1).svg",
    wish: "./assets/images/colored-favourite.svg",
};

const cartProducts = JSON.parse(localStorage.getItem("cart")) || {}
const wishlist = JSON.parse(localStorage.getItem("wishs")) || {};

const counter = document.querySelector(".counter")
const countofwish = document.querySelector(".wishs")



const updataCounters = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (counter) {
        counter.textContent = Object.keys(cart).length;
    }

    if (countofwish) {
        countofwish.textContent = Object.keys(wishlist).length;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    updataCounters();
});


const AddToCart = (btn, id) => {
    cartProducts[id] = true
    localStorage.setItem("cart", JSON.stringify(cartProducts))
    btn.classList.remove("btn-primary")
    btn.classList.add("btn-danger")
    btn.innerHTML = `
        <h5>Remove from cart</h5>
        `
    btn.onclick = () => RemoveFromCart(btn, id);
    updataCounters()
}

const RemoveFromCart = (btn, id) => {
    delete cartProducts[id]
    localStorage.setItem("cart", JSON.stringify(cartProducts))
    btn.classList.add("btn-primary");
    btn.classList.remove("btn-danger");
    btn.innerHTML = `
        <h5>Add to Cart</h5>`
    btn.onclick = () => AddToCart(btn, id);
    counter.textContent = Object.keys(cartProducts).length;
    updataCounters()
}

// wish list
const favourite = (btn, id) => {
    wishlist[id] = true
    localStorage.setItem("wishs", JSON.stringify(wishlist))
    btn.innerHTML = `
        <img src="${icons.wish}">
        <h5 class="text-primary">Add to wishlist</h5>
        `
    btn.onclick = () => RemoveFromWish(btn, id);
    updataCounters()

}

const RemoveFromWish = (btn, id) => {
    delete wishlist[id]
    localStorage.setItem("wishs", JSON.stringify(wishlist))
    btn.innerHTML =
        `<img src="${icons.fav}">
        <h5 class="text-primary">Add to wishlist</h5>
        `
    btn.onclick = () => favourite(btn, id);
    updataCounters()
}




const productsContainer = document.querySelector(".products") //
fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        const someData = {
            price_after_sale: data.price * (100 - (data.discountPercentage)) / 100,
        }

        productsContainer.innerHTML =
            `<div class="images">
                ${data.images.map(image => `<img class="rounded-4" src="${image}">`).join("")}
            </div>

            <div>
                <p>Electronics / Smartphones</p>
                <h1>${data.title}</h1>
                <p class="rating">
                    <img src="./assets/images/full rating.svg">
                    ${data.rating}
                </p>
                <div class="prices">
                    <h5 class="card-text fs-3 text-primary">
                        ${data.price}
                        <span class="fs-5 text-decoration-line-through text-secondary">
                            $${someData.price_after_sale.toFixed(2)}
                        </span>
                    </h5>
                    <div class="bg-danger text-light rounded-2">
                        <p>${data.discountPercentage}%. off</p>
                    </div>
                </div>
                <h5 class="description mt-4 mb-4">
                    ${data.description}
                </h5>

                <div class="all-of-done mb-5">
                        <div class="done">
                            <img class="" src="./assets/images/done-svgrepo-com.svg" alt="">
                            <h5 class="ms-2">Width: ${data.dimensions.width}</h5>
                        </div>
                        <div class="done">
                            <img src="./assets/images/done-svgrepo-com.svg" alt="">
                            <h5 class="ms-2">Height: ${data.dimensions.height}</h5>
                        </div>
                        <div class="done">
                            <img src="./assets/images/done-svgrepo-com.svg" alt="">
                            <h5 class="ms-2">Depth: ${data.dimensions.depth}</h5>
                        </div>
                        <div class="done">
                            <img src="./assets/images/done-svgrepo-com.svg" alt="">
                            <h5 class="ms-2">Category: ${data.category}</h5>
                        </div>
                        <div class="done">
                            <img src="./assets/images/done-svgrepo-com.svg" alt="">
                            <h5 class="ms-2">Warranty: ${data.warrantyInformation}</h5>
                        </div>
                    </div>

                    <div class="buttons">
                        <button class="btn btn-primary add ${cartProducts[data.id] ? 'btn-danger' : 'btn-primary'}" "
                            onclick="${cartProducts[data.id] ? `RemoveFromCart(this, ${data.id})` : `AddToCart(this, ${data.id})`}">
                                ${cartProducts[data.id] ? '<h5>Remove From Cart</h5>' : `<h5>Add to Cart</h5>`}
                        </button>
                        <button class="wish bg-light btn" onclick="${wishlist[data.id] ? `RemoveFromWish(this, ${data.id})` : `favourite(this, ${data.id})`}">
                            ${wishlist[data.id] ?
                `<img src="${icons.wish}">
                            <h5 class="text-primary">Add to wishlist</h5>
                            `
                :
                `<img src="${icons.fav}">
                            <h5 class="text-primary">Add to wishlist</h5>
                            `}
                        </button>
                    </div>

                    <div class="sku mt-5">
                        <p><span class="text-secondary">SKU: </span> ${data.sku} </p>
                        <p><span class="text-secondary">Availability: </span>${data.availabilityStatus}</p>
                        <p><span class="text-secondary">Shipping: </span>${data.shippingInformation}</p>
                    </div>
            </div>
        `
    });