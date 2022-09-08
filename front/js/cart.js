let localStorageProduct = JSON.parse(localStorage.getItem("product"));

const getCartItem = document.getElementById('cart__items');

const submitBtn = document.querySelector("#order");

function addProductToCart() {
  let fullCart = [];
  let totalCart = 0;
  let totalFullCart = 0;
}

  const userHashMap = {}
  localStorageProduct = localStorageProduct.filter ((item, _)=>{
    let alreadyExists = userHashMap.hasOwnProperty(item.couleurDuProduit)
    return alreadyExists? false : userHashMap[item.couleurDuProduit] = 1
  })