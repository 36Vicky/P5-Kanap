console.log("test")
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

  for(i = 0; i < localStorageProduct.length; i++){
  
  totalFullCart += parseInt (localStorageProduct[i].nombreDeProduit,10)
  
  totalCart += localStorageProduct[i].nombreDeProduit*localStorageProduct[i].prixDuProduit
  
  fullCart = getCartItem.innerHTML = fullCart + `
  <article class="cart__item" data-id=${localStorageProduct[i].idDuProduit} data-color="${localStorageProduct[i].couleurDuProduit}">
              <div class="cart__item__img">
                <img src="${localStorageProduct[i].imageDuProduit}" alt="${localStorageProduct[i].textAlternatif}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${localStorageProduct[i].nomDuProduit}</h2>
                  <p>${localStorageProduct[i].descriptionDuProduit}</p>
                  <p>${localStorageProduct[i].couleurDuProduit}</p>
                  <p>${localStorageProduct[i].prixDuProduit} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Quantité</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProduct[i].nombreDeProduit}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
          `;}        