//----------------------------------------------------------------------
// Permet de créer le html à insérer dans le DOM pour chaques produits
//----------------------------------------------------------------------

function showItems(kanap) {
    // faire boucle
    // dans la boucle createElement
    // a la fin de la creation appendchild dans le container
    // document.querySelector("#items") -> document.getElementById('items')
    return `
    <a href="./product.html?id=${kanap._id}">
        <article>
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">${kanap.description}</p>
        </article>
    </a>
`;
}

//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------
//Appel d'une fonction async -> init ou initalize
// const updateItems = () => { }
async function updateItems() {
    //Appel de l'API
    await fetch("http://localhost:3000/api/products")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // appeler la fonction displayItems(data);
            //Permet d'ajouter un bloc pour chaque items présent
            for (let item in data) {
                document.querySelector("#items").innerHTML += showItems(
                    data[item]
                );
            }
        })
        .catch(function (err) {
            document.querySelector("#items").innerHTML = "<h1>Erreur 404</h1>";
            console.log("Erreur 404, sur l'api" + err);
        });
}

updateItems();
