//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------

fetch("http://localhost:3000/api/products")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // appeler la fonction displayItems(data);
        //Permet d'ajouter un bloc pour chaque items présent
        console.log(data);

        //----------------------------------------------------------------------
        // Permet de créer le html à insérer dans le DOM pour chaques produits
        //----------------------------------------------------------------------
        const productsTable = data;

        //On créer une boucle pour afficher chaque produit
        productsTable.forEach((element) => {
            //On va créer un lien <a> pour chaque produit
            const linkKanap = document.createElement("a");
            document.getElementById("items").appendChild(linkKanap);

            //On va créer un article pour chaque produit
            const articleKanap = document.createElement("article");
            linkKanap.appendChild(articleKanap);

            // On va créer une balise img avec alt pour chaque produit
            const imgKanap = document.createElement("img");
            articleKanap.appendChild(imgKanap);
            imgKanap.src = element.imageUrl;
            imgKanap.alt = element.atlTxt;

            //On va créer une balise titre h3 pour chaque produit
            const titleKanap = document.createElement("h3");
            articleKanap.appendChild(titleKanap);
            titleKanap.textContent = element.name;

            //On va créer une balise description p
            const descriptionKanap = document.createElement("p");
            articleKanap.appendChild(descriptionKanap);
            descriptionKanap.textContent = element.description;

            //Dès que l'on clique sur le produit, on sera redirigé sur la bonne page produit
            linkKanap.href = "./product.html?id=" + element._id;
        });
    })
    .catch(function (err) {
        document.querySelectorById("items").textContent = "<h1>Erreur 404</h1>";
        console.log("Erreur 404, sur l'api" + err);
    });
