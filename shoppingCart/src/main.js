let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// generate shop ites using javascript
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((e) => {
      let { id, name, price, desc, img } = e;
      let search = basket.find((x) => x.id === id) || [];
      return `
<div id=product-id-${id} class="item">
            <img width="220" src= ${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>

                <!-- price and quantity -->
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>

`;
    })
    .join(""));
};
generateShop();

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
  basket = basket.filter((x) => x.item !== 0);
  //   console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));
};

//update item
let update = (id) => {
  let search = basket.find((e) => e.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

//cart item
//calculate the item
let calculation = () => {
  let cartIcon = document.getElementById("cartAmout");
  cartIcon.innerHTML = basket.map((e) => e.item).reduce((x, y) => x + y, 0);
};
calculation();
