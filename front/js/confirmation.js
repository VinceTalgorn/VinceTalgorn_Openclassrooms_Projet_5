//On vient récupérer les données de l'url
let str = window.location.href;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

console.log(orderId);

//Insertion dans le document HTML de l'ID de la commande
document.getElementById("orderId").textContent = `${orderId}`;
