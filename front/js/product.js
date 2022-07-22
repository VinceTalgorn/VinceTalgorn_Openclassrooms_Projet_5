// Permet de récupérer l'id du produit contenu dans l'url

let itemUrl = window.location.href;
let url = new URL(itemUrl);
let idItem = url.searchParams.get("id");
console.log(idItem);
//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------
function getItem() {
    // J'introduis l'id du produit directement dans la requète

    fetch("http://localhost:3000/api/products/" + idItem)
        .then(function (response) {
            return response.json();
        })

        // J'exporte les données et affiche les caractéristiques du produit grace à la fonction "showItem"

        .then(function (data) {
            showItem(data);
            getProductForCart(data);
        })
        .catch(function (err) {
            document.querySelector("#items").innerHTML = "<h1>Erreur 404</h1>";
            console.log("Erreur 404, sur l'api" + err);
        });
}

//------------------------------------------------------------------------
// fonction d'affichage produit
//------------------------------------------------------------------------
function showItem(article) {
    // Affichage de l'image
    let imgItem = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgItem);
    imgItem.src = article.imageUrl;
    imgItem.alt = article.altTxt;

    // Affichage du nom du produit
    document.querySelector("#title").innerHTML = article.name;

    // Affichage du prix
    document.querySelector("#price").innerHTML = article.price;

    // Affichage de la description
    document.querySelector("#description").innerHTML = article.description;

    // Affichage des couleurs disponibles
    for (let color of article.colors) {
        let colorOfItem = document.createElement("option");
        document.querySelector("#colors").appendChild(colorOfItem),
            (colorOfItem.value = color);
        colorOfItem.innerHTML = color;
    }
}

getItem();

//------------------------------------------------------------------------
// Fonction pour envoyer les infos du canapé au clic sur le bouton
//------------------------------------------------------------------------
function getProductForCart(product) {
    const addProduct = document.querySelector("#addToCart");
    const choiceColor = document.querySelector("#colors");
    const quantityProduct = document.querySelector("#quantity");

    addProduct.addEventListener("click", function () {
        const myProduct = {
            name: product.name,
            id: product._id,
            picture: product.imageUrl,
            pictureTxt: product.altTxt,
            price: product.price,
            color: choiceColor.value,
            quantity: parseInt(quantityProduct.value, 10),
        };

        // Permet de contrôler qu'une quantité et une couleur sont bien sélectionnées
        if (quantityProduct.value !== 0 && choiceColor.value !== "") {
            let cartSaved = JSON.parse(localStorage.getItem("cart"));
            if (cartSaved) {
                // Permet de controler l'existence du produit dans le panier (même ID et même couleur)
                const productControl = cartSaved.find(
                    (kanap) =>
                        kanap.id == product._id &&
                        kanap.color == choiceColor.value
                );
                //Si le produit avec une même ID et même couleur existe alors on augmente la quantité totale
                if (productControl) {
                    let finalQuantity =
                        myProduct.quantity + productControl.quantity;
                    productControl.quantity = finalQuantity;
                    saveCart(cartSaved);
                    //Sinon on push
                } else {
                    cartSaved.push(myProduct);
                    saveCart(cartSaved);
                }
                //Si aucun produit est connu alors on injecte le premier dans le panier qui est vierge
            } else {
                cartSaved = [];
                cartSaved.push(myProduct);
                saveCart(cartSaved);
            }
            console.log("L'envoi au panier a bien été effectué");
        }
    });
}

// Sauvegarde le panier dans le localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
