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
              
  const targetPrice = document.getElementById('totalPrice')
  const targetQuantity = document.getElementById('totalQuantity')
  targetPrice.innerHTML = totalCart
  targetQuantity.innerHTML = totalFullCart

addProductToCart ();

function deleteItemProduct(){

  const deleteButton = document.querySelectorAll('.cart__item__content__settings__delete > .deleteItem');
  
  for (let i = 0; i < localStorageProduct.length; i ++){
    deleteButton[i].addEventListener('click', (e) => {
      e.preventDefault();
      
      let supprimerId = localStorageProduct[i].idDuProduit;
      let supprimerCouleur = localStorageProduct[i].couleurDuProduit;

      localStorageProduct = localStorageProduct.filter(el => el.idDuProduit !== supprimerId || el.couleurDuProduit !== supprimerCouleur )

      localStorage.setItem("product",JSON.stringify(localStorageProduct));
      
      alert('Cette élement a bien été supprimer du panier');

      location.reload();
    })
  }
}

deleteItemProduct();

function changeQty (){
  
  const targetQty = document.querySelectorAll('.itemQuantity')
  
    for (let i = 0; i < targetQty.length; i++){
        targetQty[i].addEventListener('input', function(){
        
        let changeQty = targetQty[i].value;
        
        localStorageProduct[i].nombreDeProduit = changeQty;
        
        localStorage.setItem("product", JSON.stringify(localStorageProduct));
        // Recharge la page afin de voir les changements.
        location.reload();
      });
    };
};

changeQty();

// Regex pour validation formulaire.

const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const addressRegex = /^[A-Za-z0-9\s]{5,50}$/;
const cityRegex = /^[A-Za-z\s]{5,50}$/

// submitForm envoi le formulaire.
function submitForm (e){
  // e.preventDefault(); permet d'éviter le comportement par defaut.
  e.preventDefault();
  // Initialisation variable check à true, afin  de vérifier si l'utilisation à bien rempli le formulaire.
  let check = true;

  // fonction checkInput qui permet de verifier les regex, avec des conditions dans le cas ou l'input ne serait pas correct on affiche un message d'erreur.
  function checkInput (){
  // On cible tous les éléments dont on auras besoin.
  const prenom = document.getElementById('firstName');
  const prenomErreur = document.getElementById('firstNameErrorMsg');
  const nom = document.getElementById('lastName');
  const nomErreur = document.getElementById('lastNameErrorMsg');
  const adresse = document.getElementById('address');
  const adresseErreur = document.getElementById('addressErrorMsg');
  const ville = document.getElementById('city');
  const villeErreur = document.getElementById('cityErrorMsg')
  const mail = document.getElementById('email');
  const mailErreur = document.getElementById('emailErrorMsg')
  const msgErreur = document.querySelectorAll('.cart__order__form__question >  p')
  const prenomValue = prenom.value.trim();
  const nomValue = nom.value.trim();
  const adresseValue = adresse.value.trim();
  const villeValue = ville.value.trim();
  const mailValue = mail.value.trim();
  // On applique les regex via .match et des conditions if / else.
    if(mailValue.match(emailRegex)){
      mailErreur.innerText = "";
    }else{
      check = false;
      mailErreur.innerText = "Veuillez entrer une  adresse mail valide."
    }
    if(adresseValue.match(addressRegex)){
      adresseErreur.innerText="";
    }else{
      check = false;
      adresseErreur.innerText="Veuillez entrer une adresse valide."
    }
    if(villeValue.match(cityRegex)){
      villeErreur.innerText = "";
    }else{
      check = false;
      villeErreur.innerText = "Veuillez entrer un nom de ville correct."
    }
    if(prenomValue.length < 3 || prenomValue.length > 15){
      check = false;
      prenomErreur.innerText = "Le prénom doit contenir entre 3 et 15 caractères"
    }else if (prenomValue.length >= 3){
      prenomErreur.innerText = "";
    }
    if(nomValue.length < 3 || nomValue.length > 35){
      check = false;
      nomErreur.innerText = "Le nom doit contenir entre 3 et 15 caractères"
    }else if(nomValue.length >= 3){
      nomErreur.innerText = ""
    }
  }
  
  checkInput();

// Fonction postApi qui va permet de vérifier si check === true on envoit le formulaire.
  function postApi(){
    if(check === true){

      if(localStorageProduct.length === 0){
        alert ("Please select a product")
        return
      }
    // La constante body récupère le tableau contact défini plus bas dans la fonction requestBody().
      const body = requestBody();
      
    // Fetch l'api cette fois ci avec une méthode POST qui permet d'envoyer les données au serveur.
      fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type" : "application/json",
        }
      })
    
      .then((res) => res.json())
    
      .then((data) => {
        const orderId = data.orderId
        // nous envoi sur la page confirmation. Attention, si les inputs ne sont pas remplis correctement (voir variable check) ça nous enverras pas sur la page confirmation.
        window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
        return console.log(data)
      })
      // On catch si il y a une erreur.
      .catch((err) => alert ("Erreur  d'envoi du formulaire. Veuillez réessayer plus tard."))
    }
  }
  
  postApi();

  // requestBody récupère les valeurs entrées dans les inputs. Boucle à l'interieur et donne à la variable idProducts, les id du produit.
  // On créer aussi l'objet contact dans lequel on entre les données des inputs, et enfin un products avec l'id des produits récupérer dans la boucle.
  // On a besoin de toutes ces données la pour effectués notre POST. Sinon ça ne marcheras pas.
  function requestBody(){
    const firstNameInput = document.querySelector('#firstName')
    const firstName = firstNameInput.value
  
    const lastNameInput = document.querySelector('#lastName')
    const lastName = lastNameInput.value
  
    const addressInput = document.querySelector('#address')
    const address = addressInput.value
  
    const cityInput = document.querySelector('#city')
    const city = cityInput.value
  
    const emailInput = document.querySelector('#email')
    const email = emailInput.value
  
    let idProducts  = [];
    for (let i = 0; i < localStorageProduct.length; i++) {
    
      idProducts.push(localStorageProduct[i].idDuProduit)
  
    }
  
    const body = { 
      contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products : idProducts,
    }
    return body
  }
}

// Pour finir on appel la fonction.
submitBtn.addEventListener("click", (e) => submitForm(e)) 