let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");

//get data from local storage
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmout");
  cartIcon.innerHTML = basket.map((e) => e.item).reduce((x, y) => x + y, 0);
};
calculation();

//generate cart item

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let{img, name, price} = search;
        return `
        <div class = "cart-item">
         <img width="100" src=${img} alt="" />
         <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${name}</p>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${item * search.price}</h3>
        </div>
        
        </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

//increment item
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((e) => e.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  generateCartItems();

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
//decrement item
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((e) => e.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);

  //it's main role to find out all the item which item value is zero
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  //   console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));
};
//update item
let update = (id) => {
  let search = basket.find((e) => e.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

//remove item
let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id)

  basket = basket.filter((x) => x.id !== selectedItem.id);
  // rendor
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
   calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2> total Bill : $ ${amount}</h2>
    <button class = "checkout">Checkout</button>
    <button onclick = "clearCart()" class = "removeAll">Remove All</button>
    `;
  } else return;
};
totalAmount();
