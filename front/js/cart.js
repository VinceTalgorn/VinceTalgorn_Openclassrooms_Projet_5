const myCart = JSON.parse(localStorage.getItem("cart"));

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
