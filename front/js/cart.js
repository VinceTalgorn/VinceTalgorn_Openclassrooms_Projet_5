//Récupéraiton du storage
let myCart = JSON.parse(localStorage.getItem("cart"));
console.log(myCart);
console.log("La taille de length est de " + myCart.length);
/* Création d'une fonction qui va permettre de cumuler les multiplications 
de la quantité * prix pour chaque Kanap présent dans le panier */
let totalPrice = [];
function totalCartPrice() {
    let total = totalPrice.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    );
    return total;
}

//Pour chaque produit présent dans le local storage on l'affiche dans le panier
if (myCart) {
    for (let kanap of myCart) {
        //On récup les caractéristiques du local storage
        let item = {
            idKanap: kanap.idKanap,
            colorKanap: kanap.colorKanap,
            quantityKanap: kanap.quantityKanap,
        };
        //On récup les autres caractéritiques présent dans l'API
        fetch("http://localhost:3000/api/products/" + item.idKanap)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            //On affiche dans le HTML
            .then((kanap) => {
                let section = document.getElementById("cart__items");

                //On créer l'élément <article>
                let article = document.createElement("article");
                article.classList.add("cart__item");
                article.setAttribute("data-id", `${item.idKanap}`);
                article.setAttribute("data-color", `${item.colorKanap}`);
                section.appendChild(article);

                //On créer la <div> qui contiendra l'img
                let itemImg = document.createElement("div");
                itemImg.classList.add("cart__item__img");
                article.appendChild(itemImg);

                //On créer les élémenrs img.src et img.alt qui seront dans la <div> de l'image
                let image = document.createElement("img");
                image.src = kanap.imageUrl;
                image.alt = kanap.altTxt;
                itemImg.appendChild(image);

                //On va créer la <div> cart__item_content qui contiendra toutes les infos du produits
                let itemContent = document.createElement("div");
                itemContent.classList.add("cart__item__content");
                article.appendChild(itemContent);

                //On va créer la <div> qui va contenir le titre, le nom et la couleur du produit
                let itemDesc = document.createElement("div");
                itemDesc.classList.add("cart__item__content__description");
                itemContent.appendChild(itemDesc);

                //On va créer le titre <h2> du produit
                let h2 = document.createElement("h2");
                h2.textContent = kanap.name;
                itemDesc.appendChild(h2);

                //On va créer <p> qui contiendra la couleur du produit
                let color = document.createElement("p");
                color.textContent = item.colorKanap;
                itemDesc.appendChild(color);

                //On va créer <p> qui contiendra le prix du produit
                let price = document.createElement("p");
                price.textContent = kanap.price + " €";
                itemDesc.appendChild(price);

                //On va créer la <div> qui contiendra la quantité et l'élément supprimé
                let itemSettings = document.createElement("div");
                itemSettings.classList.add("cart__item__content__settings");
                itemContent.appendChild(itemSettings);
                //On va créer la <div> qui va contenir la quanité de produit
                let itemSetQuantity = document.createElement("div");
                itemSetQuantity.classList.add(
                    "cart__item__content__settings__quantity"
                );
                itemSettings.appendChild(itemSetQuantity);

                //On créer le <p> qui va contenir la quantité du produit
                let nomQte = document.createElement("p");
                nomQte.textContent = "Qté : ";
                itemSetQuantity.appendChild(nomQte);

                //On va créer l'input qui va permettre de modifier la quantité
                let productQuantity = document.createElement("input");
                itemSetQuantity.appendChild(productQuantity);
                productQuantity.className = "itemQuantity";
                productQuantity.setAttribute("type", "number");
                productQuantity.setAttribute("min", "1");
                productQuantity.setAttribute("max", "100");
                productQuantity.setAttribute("name", "itemQuantity");
                productQuantity.setAttribute("value", item.quantityKanap);
                itemSetQuantity.appendChild(productQuantity);

                //On va créer la <div> contiendra l'élément qui pourra supprimer le produit du panier
                let itemDelete = document.createElement("div");
                itemDelete.classList.add(
                    "cart__item__content__settings__delete"
                );
                itemSettings.appendChild(itemDelete);

                //On va créer le <p> qui contientra l'élément supprimé
                let deleteAccept = document.createElement("p");
                deleteAccept.classList.add("deleteItem");
                deleteAccept.textContent = "Supprimer";
                itemDelete.appendChild(deleteAccept);

                deleteAccept.addEventListener("click", (event) => {
                    event.preventDefault();

                    //Selection de l'element à supprimer en fonction de son id ET sa couleur
                    let idDelete = item.idKanap;
                    let colorDelete = item.colorKanap;

                    let carts = myCart.filter(
                        (el) =>
                            el.idKanap !== idDelete ||
                            el.colorKanap !== colorDelete
                    );
                    event.target.closest(".cart__item").remove();

                    //Mise à jour du localStorage après suppression du produit
                    localStorage.setItem("cart", JSON.stringify(carts));

                    //Alerte produit supprimé et refresh
                    alert("Ce produit a bien été supprimé du panier");
                    location.reload();
                });

                productQuantity.addEventListener("change", (e) => {
                    e.preventDefault();

                    //Selection de l'element à modifier en fonction de son id ET sa couleur
                    let qtyModifValue = Number(productQuantity.value);
                    let idModif = item.idKanap;
                    let colorModif = item.colorKanap;
                    let cart =
                        myCart.find((el) => el.idKanap === idModif) &&
                        myCart.find((el) => el.colorKanap === colorModif);
                    if (cart) {
                        //Si la valeur modifié est supérieur à 1 alors on l'ajoute
                        if (qtyModifValue >= 1) {
                            cart.quantityKanap = qtyModifValue;
                            localStorage.setItem(
                                "cart",
                                JSON.stringify(myCart)
                            );
                            //Si on ajoute une valeur égale à 0 ou négative alors cela ne va rien àjouter
                        } else {
                        }
                    } else {
                        cart.push(Kanap);
                        localStorage.setItem("cart", JSON.stringify(myCart));
                    }

                    // refresh
                    location.reload();
                });

                //Création de la quantité totale
                function totalProductInCart() {
                    let totalQuantity = 0;
                    //Boucle qui permet de récupérer la quantité total dans le panier
                    for (let productInCart of myCart) {
                        totalQuantity += parseInt(productInCart.quantityKanap);
                    }
                    return totalQuantity;
                }
                //On affiche la quantité total dans le HTML
                document.getElementById("totalQuantity").textContent = parseInt(
                    totalProductInCart()
                );

                //Création du prix total du panier
                //Création de la variable qui va multiplier le prix du kanap par sa quantité
                let totalProductPrice =
                    parseInt(item.quantityKanap) * parseInt(kanap.price);
                totalPrice.push(totalProductPrice);
                console.log(totalProductPrice);

                //On vient appeler la fonction que l'on a crée qui permet de cumuler le résultat de totalProductPrice
                document.getElementById("totalPrice").textContent =
                    totalCartPrice();
            });
    }
}

//------------------------------------------------------------------------
// Contrôle des informations des utilisateurs
//------------------------------------------------------------------------

//Initialisation de variables, lorsque toute ces variables seront à true le formulaire pourra être envoyé

//Création des RegExp pour vérification du formulaire
let regexText = new RegExp("^[A-Z][A-Za-zéèê-]+$");
let regexAdress = new RegExp("^[a-zA-Z0-9,'-' ]+$");
let regexMail = new RegExp(
    "^[A-Za-z0-9'._-]+[@]{1}[A-Za-z0-9._-]+[.]{1}[a-z]{2,10}$"
);

//Création des messages d'erreurs si la saisie des utilisateurs ne respecte pas les RegExp
let messageTextError =
    "Ce champ doit commencer par une majuscule et ne peut contenir que des lettres.";
let messageAdresseError =
    "Ce champ est invalide, veuillez ne pas utiliser de caractères spéciaux.";
let messageEmailError = " Adresse mail incorrect.";

//Test afin de vérifier si les données sont OK
function validInput(input, regex, alertMessageFalse) {
    let testInput = regex.test(input.value);
    let p = input.nextElementSibling;
    //Si la saisie répond bien aux attentes alors on affiche "Champ valide"
    if (testInput) {
        p.textContent = "";
        return true;

        //Sinon on affiche l'un des messages que l'on a initialisé plus haut
    } else {
        p.textContent = alertMessageFalse;
        return false;
    }
}

//Contrôle sur le prénom, majuscule sur la première lettre et que des lettres

let firstName = document.getElementById("firstName");
let inputFirstName = firstName.addEventListener("change", function () {
    validInput(firstName, regexText, messageTextError);
});

//Contrôle sur le nom, majuscule sur la première lettre et que des lettres

let lastName = document.getElementById("lastName");
let inputLastName = lastName.addEventListener("change", function () {
    validInput(lastName, regexText, messageTextError);
});

//Contrôle sur l'adresse, chiffre et lettre sans caractères spéciaux

let address = document.getElementById("address");
let inputAddress = address.addEventListener("change", function () {
    validInput(address, regexAdress, messageAdresseError);
});

//Contrôle sur la ville, majuscule sur la première lettre et que des lettres

let city = document.getElementById("city");
let inputCity = city.addEventListener("change", function () {
    validInput(city, regexText, messageTextError);
});

//Contrôle sur l'adresse mail, majuscule sur la première lettre et que des lettres

let email = document.getElementById("email");
let inputEmail = email.addEventListener("change", function () {
    validInput(email, regexMail, messageEmailError);
});

//------------------------------------------------------------------------
// Création de l'envoie du formulaire
//------------------------------------------------------------------------

/* Création de la fonction qui permet si tout va bien (le formulaire est respecté) 
nous envoie vers la page confirmation */

function sendForm() {
    fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (json) {
            orderId = json.orderId;
            //Lorsque l'on envoie le formulaire on clear le panier
            localStorage.clear();
            window.location.href = `./confirmation.html?orderId=${orderId}`;
        })
        .catch((err) =>
            alert(
                "Votre commande à échouée. Nous vous invitons à essayer une nouvelle fois."
            )
        );
}

//Création des conditions pour vérification du formulaire
let contact;
let products = [];
let btn_order = document.getElementById("order");
let submitForm = btn_order.addEventListener("click", function (e) {
    e.preventDefault();
    /* Si tous les champs sur fomulaire sont OK et que le panier n'est pas vide 
    alors on renseigne notre variable contact et on appel la fonction sendForm 
    pour envoyer le formulaire */
    let errors = 0;
    if (!validInput(firstName, regexText, messageTextError)) {
        errors++;
    }
    if (!validInput(lastName, regexText, messageTextError)) {
        errors++;
    }
    if (!validInput(address, regexAdress, messageAdresseError)) {
        errors++;
    }
    if (!validInput(city, regexText, messageTextError)) {
        errors++;
    }
    if (!validInput(email, regexMail, messageEmailError)) {
        errors++;
    }
    console.log("Il y a " + errors + " erreur(s).");

    if (errors === 0 && myCart.length > 0) {
        // Envoi de commande
        contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        };
        sendForm();
        /* Sinon, on regarde ce qui ne va pas : dans une premier on check si le panier est vide.  
    Si c'est la cas alors on retourne l'alerte panier vide */
    } else if (myCart.length === 0) {
        alert("Votre panier est vide");
    }
});
