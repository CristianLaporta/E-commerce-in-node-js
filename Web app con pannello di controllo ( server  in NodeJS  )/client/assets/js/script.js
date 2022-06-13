/* manca da creare la funzione lato client per generare nuove card, sono le 3 di notte, dato che non era richiesto dalla traccia sicuramente la implemento dopo la correzione con calma*/

const API = 'http://localhost:3000/api/categorie/';
const API2 = "http://localhost:3000/api/primopiano/";

function primopiano() {
	let prodotti = fetch(API2).then(response => response.json());
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
	let prodotti = fetch(API).then(response => response.json());
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

function resetBadges() {
	badge = 0;
	document.getElementById('badges').innerText = 0;
}

function rimuoviTuttiIProdottiDalCarrello() {
	let acquistati = document.getElementById("carrello");
	while (acquistati.hasChildNodes()) {
		acquistati.removeChild(acquistati.firstChild);
	}
	resetBadges()
	resetCarrello()
}

function generacarrello(prodotto) {
	let immagini = fetch(API + prodotto).then(response => response.json());
	immagini.then(data => {
		let carrello = document.querySelector('#carrello');
		let div = document.createElement('div');
		div.innerHTML = `
                        <div class="carrelloproduct">
                            <img  class="carrelloproduct" src="${data.img}" alt="${data.categorytitle}">
                            <p>${data.categorytitle}<br>${data.descrizione}</p>
                            <p>${data.prezzo}€</p>
                        
                        </div>
                        
                            `
		carrello.appendChild(div);
		carrellototale(data.prezzo);
		badges()
		document.getElementById("none").classList.add("close");
		alert('Prodotto Aggiunto, entra nel carrello per proseguire con il pagamento!');
	})
}

let badge = 0;

function badges() {
	let prodotti = badge += 1;
	document.getElementById('badges').innerText = prodotti;
}

let carrello = 0;

function carrellototale(prezzo) {
	let number = parseInt(prezzo);
	carrello += number;
	document.getElementById('totalespese').innerText = 'Totale da pagare:' + carrello + "€";
	let buttonacquista = document.getElementById("acquista");
	buttonacquista.setAttribute("onclick", "acquista(" + carrello + ")");
}

function resetCarrello() {
	document.getElementById("none").classList.remove("close");
	carrello = 0;
	let buttonacquista = document.getElementById("acquista");
	buttonacquista.setAttribute("onclick", "");
	document.getElementById('totalespese').innerText = 'Totale da pagare:' + 0 + "€";
}
let budget = 100;

function acquista(euro) {
	budget = budget - euro;
	if (budget < 0) {
		budget = budget + euro;
		alert("non ci sono i fondi necessari per acquistare!");
	} else {
		alert("Pagamento eseguito correttamente!!")
		document.getElementById('totalefondi').innerText = 'Fondi Disponibili:' + budget + "€";
		rimuoviTuttiIProdottiDalCarrello()
		document.getElementById("none").classList.remove("close");
	}
}

prodotti()
primopiano()