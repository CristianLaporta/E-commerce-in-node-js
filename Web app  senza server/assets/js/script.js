/* Questa versione  contiene solo le chiamate fetch con dei json locali per facilitare la correzione */

//recupero le mie rotte (in questo caso i file json locali)
const CARD = 'json/card.json';
const PRIMOPIANO = "json/primopiano.json";


function primopiano() {
	let prodotti = fetch(PRIMOPIANO).then(response => response.json()); //eseguo la prima chiamata
	prodotti.then(data => {
		let lista = document.querySelector('#primopiano'); 
		data.forEach(prod => {
			let div = document.createElement('span');
			div.innerHTML = `              
                            <img src="${prod.img}" class="d-block w-100 primopiano" alt="${prod.descrizione}">  
                            `
			lista.appendChild(div); 

		})
	})
}

function prodotti() {
	let prodotti = fetch(CARD).then(response => response.json()); //eseguo la seconda chiamata
	prodotti.then(data => {
		let lista = document.querySelector('#cards');
		data.forEach(prod => {
			let div = document.createElement('div');
			div.innerHTML = `                          
			                 <img src="${prod.img}" alt="${prod.categorytitle}">
			                 <p class="price">${prod.prezzo}€</p>
			                 <p class="close" id="${prod.id}" class="hidden">${prod.descrizione}</p>
			                 <button class="btn btn-info" onclick="dettagli('${prod.id}')">Dettagli</button>
			                 <button class="btn btn-dark" onclick="generacarrello(${prod.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
			                 <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
			                 <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
		                     </svg></button>                                       
                            `

			lista.appendChild(div);

		})
	})
}

function dettagli(id) {

	let elem = document.getElementById(id)
	elem.classList.toggle("close")

}



/* segnalo al utente di essere in modalita senza server */
function generacarrello() {

	alert("Funzione disabilitata nella versione senza server!")

}

function pannelnone() {

	alert("Pannello di controllo disabilitato!")

}
prodotti()
primopiano()