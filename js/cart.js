const myCart = JSON.parse(localStorage.getItem("cart"));
console.log(myCart);
//Initialisation de la fonction qui va permettre de faire une boucle pour afficher les produits dans le panier
function getCart() {
    let products = JSON.parse(localStorage.getItem("cart"));
    for (let kanap in products) {
        document.querySelector("#cart__items").innerHTML += showCart(
            products[kanap]
        );
    }
}
//------------------------------------------------------------------------
// Afficher le html dans le panier
//------------------------------------------------------------------------

function showCart(product) {
    return `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.picture}" alt="${product.pictureTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}

getCart();

//------------------------------------------------------------------------
// Paramétrage du bouton suppression dans le panier
//------------------------------------------------------------------------

const btnDelete = document.querySelectorAll(".deleteItem");
console.log(btnDelete);
// Pour itérer sur tous les boutons supprimés. A la selection dans le DOM, le résultat est rendu sous forme d'un array
for (let b = 0; b < btnDelete.length; b++) {
    btnDelete[b].addEventListener("click", function (event) {
        let removeProductId = myCart[b].id;
        let removeProductColor = myCart[b].color;
        // Ici filter() sert a garder uniquement les produits qui n'ont pas été sélectionnés
        const myNewCart = myCart.filter(
            (element) =>
                element.id !== removeProductId ||
                element.color !== removeProductColor
        );

        localStorage.setItem("cart", JSON.stringify(myNewCart));

        alert("Ce produit a bien été supprimé du panier");

        location.reload();
    });
}

//------------------------------------------------------------------------
// Affiche le nombre total de produit dans le panier (en tenant compte de la quantité de chacun)
//------------------------------------------------------------------------

function showTotalQuantity() {
    let totalQuantity = 0;
    const showQuantity = document.querySelector("#totalQuantity");

    for (let qty in myCart) {
        totalQuantity += myCart[qty].quantity;
    }

    showQuantity.innerHTML = totalQuantity;
}

showTotalQuantity();

//------------------------------------------------------------------------
// Affiche le prix total
//------------------------------------------------------------------------
function showTotalPrice() {
    let totalPrice = 0;
    const showPrice = document.querySelector("#totalPrice");

    for (let money in myCart) {
        totalPrice += myCart[money].price * myCart[money].quantity;
    }

    showPrice.innerHTML = totalPrice;
}

showTotalPrice();

//------------------------------------------------------------------------
// Modifier la quantité directement dans le panier
//------------------------------------------------------------------------

function changeQuantity() {
    const quantitySelecter = document.querySelectorAll(".itemQuantity");

    for (let p = 0; p < quantitySelecter.length; p++) {
        quantitySelecter[p].addEventListener("change", function () {
            const oldQuantity = myCart[p].quantity;
            const quantityChanged = quantitySelecter[p].valueAsNumber;

            const quantityControl = myCart.find(
                (element) => element.quantityChanged !== oldQuantity
            );

            if (quantityChanged >= 1) {
                quantityControl.quantity = quantityChanged;
                myCart[p].quantity = quantityControl.quantity;
            } else {
                myCart.filter((element) => element.quantity >= 1);
            }
            localStorage.setItem("cart", JSON.stringify(myCart));
            location.reload();
        });
    }
}

changeQuantity();

//------------------------------------------------------------------------
// Contrôle des informations des utilisateurs
//------------------------------------------------------------------------

//Initialisation de variables, lorsque toute ces variables seront à true le formulaire pourra être envoyé
var firstNameControl = false;
var lastNameControl = false;
var adressControl = false;
var cityControl = false;
var mailControl = false;

function dataUserControl() {
    let form = document.querySelector(".cart__order__form");
    const RegexText = /^[A-Z][A-Za-z\é\è\ê-]+$/;
    const RegexAdress = /^[a-zA-Z0-9\s,'-]*$/;
    const RegexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //Contrôle sur le prénom, majuscule sur la première lettre et que des lettres

    form.firstName.addEventListener("change", function (e) {
        if (RegexText.test(e.target.value)) {
            document.getElementById("firstNameErrorMsg").innerHTML = "";
            firstNameControl = true;
        } else {
            document.getElementById("firstNameErrorMsg").innerHTML =
                "Le prénom est incorrect, il doit commencer par une majuscule et doit contenir seulement des lettres.";
            firstNameControl = false;
        }
    });

    //Contrôle sur le nom, majuscule sur la première lettre et que des lettres

    form.lastName.addEventListener("change", function (e) {
        if (RegexText.test(e.target.value)) {
            document.getElementById("lastNameErrorMsg").innerHTML = "";
            lastNameControl = true;
        } else {
            document.getElementById("lastNameErrorMsg").innerHTML =
                "Le nom est incorrect, il doit commencer par une majuscule et doit contenir seulement des lettres.";
            lastNameControl = false;
        }
    });

    //Contrôle sur l'adresse, chiffre et lettre sans caractères spéciaux

    form.address.addEventListener("change", function (e) {
        if (RegexAdress.test(e.target.value)) {
            document.getElementById("addressErrorMsg").innerHTML = "";
            adressControl = true;
        } else {
            document.getElementById("addressErrorMsg").innerHTML =
                "Adresse invalide, veuillez ne pas utiliser de caractères spéciaux";
            adressControl = false;
        }
    });

    //Contrôle sur la ville, majuscule sur la première lettre et que des lettres

    form.city.addEventListener("change", function (e) {
        if (RegexText.test(e.target.value)) {
            document.getElementById("cityErrorMsg").innerHTML = "";
            cityControl = true;
        } else {
            document.getElementById("cityErrorMsg").innerHTML =
                "La ville est incorrect, il doit commencer par une majuscule et doit contenir seulement des lettres.";
            cityControl = false;
        }
    });

    //Contrôle sur l'adresse mail, majuscule sur la première lettre et que des lettres

    form.email.addEventListener("change", function (e) {
        if (RegexMail.test(e.target.value)) {
            document.getElementById("emailErrorMsg").innerHTML = "";
            mailControl = true;
        } else {
            document.getElementById("emailErrorMsg").innerHTML =
                "Adresse mail incorrect.";
            mailControl = false;
        }
    });

    //------------------------------------------------------------------------
    // Contrôle de l'état du formulaire
    //------------------------------------------------------------------------

    form.addEventListener("change", function () {
        if (
            firstNameControl == true &&
            lastNameControl == true &&
            adressControl == true &&
            cityControl == true &&
            mailControl == true
        ) {
            console.log("Formulaire complet, envoie possible");
        } else {
            console.log("Formulaire incomplet, envoie impossible");
        }
    });
}
dataUserControl();

//------------------------------------------------------------------------
// Envoie des données et récupération de l'ID de la commande
//------------------------------------------------------------------------
