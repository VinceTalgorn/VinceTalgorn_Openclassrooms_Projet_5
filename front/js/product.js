// Permet de récupérer l'id du produit contenu dans l'url

let itemUrl = window.location.href;
let url = new URL(itemUrl);
let idItem = url.searchParams.get("id");
console.log(idItem);
//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------
//On a crée deux const afin de pouvoir incérer les données au bonne endroit
const divKanap = document.querySelector(".item__img");
const selectColor = document.getElementById("colors");
const errorMessage = document.createElement("p");

fetch("http://localhost:3000/api/products/")
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        const arrayData = data;

        //------------------------------------------------------------------------
        // fonction d'affichage produit
        //------------------------------------------------------------------------
        //Création d'une boucle qui va venir implémenter les bonnes données des bons produits sur la bonne page
        for (element of arrayData) {
            //Si l'id est le même alors on se trouve sur la bonne page produit
            if (element._id === idItem) {
                const imgKanap = document.createElement("img");
                imgKanap.src = element.imageUrl;
                imgKanap.alt = element.altTxt;
                divKanap.appendChild(imgKanap);

                document.getElementById("title").textContent = element.name;
                document.getElementById("price").textContent = element.price;
                document.getElementById("description").textContent =
                    element.description;

                //On va créer une boucle for of pour choisir la bonne couleur proposée

                for (colors of element.colors) {
                    const optionColor = document.createElement("option");

                    //Paramétrage de optionColor
                    optionColor.value = colors;
                    optionColor.textContent = colors;
                    //Insertion dans la page des couleurs du produit
                    selectColor.appendChild(optionColor);
                }
            }
        }
    })
    .catch(function (err) {
        console.error(err);
    });

//Nous allons regarder ce qu'il y a dans le storage
const myCart = JSON.parse(localStorage.getItem("cart"));

//------------------------------------------------------------------------
// Fonction pour envoyer les infos du canapé au clic sur le bouton
//------------------------------------------------------------------------
document.getElementById("addToCart").addEventListener("click", function () {
    //Récupération des valeurs qu'il faut stocker

    //Utilisation de l'objet number pour que le type de valeur soit number
    let quantitySelect = Number(document.getElementById("quantity").value);
    let colorSelect = document.getElementById("colors").value;
    let kanapSelect = idItem;

    //Initialisation du paramétrage de ce qu'il sera envoyé dans le storage
    let insertIntoCart = {
        idKanap: kanapSelect,
        quantityKanap: quantitySelect,
        colorKanap: colorSelect,
    };
    //On va aller chercher dans le Storage pour voir si le produit est déjà présent dans le panier
    //On vérifie qu'il y a bien un quantité sup à 0 et une couleur de sélectionné

    if (quantitySelect > 0 && quantitySelect < 101 && colorSelect) {
        //On vérifie si le panier est vide
        if (myCart) {
            // Il y a quelque chose dans le panier
            console.log(
                "Il y a quelque chose dans le panier, on analyse si le produit est déjà existant"
            );

            // S'il y a un kanap avec même id et couleur on ajoute seulement
            for (let i = 0; i < myCart.length; i++) {
                //Conditions pour rechercher si l'id et couleur correspondent
                if (
                    insertIntoCart.idKanap == myCart[i].idKanap &&
                    insertIntoCart.colorKanap == myCart[i].colorKanap
                ) {
                    //On ajoute seulement la nouvelle quantité à celle déjà existante dans le storage
                    myCart[i].quantityKanap =
                        Number(myCart[i].quantityKanap) + quantitySelect;

                    console.log(
                        "Le produit est existant, on adapte la quantité"
                    );
                    //On met à jour le panier
                    localStorage.setItem("cart", JSON.stringify(myCart));
                    alert("Le produit a été ajouté au panier");
                    return;
                }
            }
            //Si l'id et la couleur ne correspondent pas alors on ajoute le produit sélectionné
            myCart.push(insertIntoCart);
            localStorage.setItem("cart", JSON.stringify(myCart));

            console.log("Le produit n'existe pas dans le panier, on l'insère");
        } else {
            //On envoie alors le produit sélectionné
            myCart.push(insertIntoCart);
            // On met à jour le localStorage
            localStorage.setItem("cart", JSON.stringify(myCart));
            console.log(
                "La panier est vide donc on envoie directement le produit dans le panier"
            );
        }
        alert("Le produit a été ajouté au panier");
    } else {
        //Message d'erreur car il n'y a soit pas de couleur de sélectionné soit pas de quantité
        console.log(
            "Pas de couleur ou de quantité indiqué, on affiche le message d'erreur"
        );
        errorMessage.textContent =
            "Veuillez sélectionner une couleur et une quantité valide.";
        document.querySelector(".item__content").appendChild(errorMessage);
    }
});
