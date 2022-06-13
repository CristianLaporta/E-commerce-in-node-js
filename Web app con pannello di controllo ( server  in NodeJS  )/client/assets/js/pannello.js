
const API = 'http://localhost:3000/api/categorie/';
const API2 = "http://localhost:3000/api/primopiano/";

function prodotti() {

    let prodotti = fetch(API).then(response => response.json());
    prodotti.then(data => {
        let lista = document.querySelector('#rimuoviprodotti');
        data.forEach(prod => {
            let div = document.createElement('div');
            div.innerHTML = `
                           
                             <img src="${prod.img}" alt="${prod.categorytitle}">
                             <p class="price">${prod.prezzo}€</p>
                             <p class="price">${prod.descrizione}</p>
                             <button class="btn btn-dark" onclick="removeProduct(${prod.id})">Rimuovi Prodotto</button>
                             
                            
                             `

            lista.appendChild(div);

        })
    })
}

function removeProduct(id) {
    fetch(API + id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(json => {
            alert('Prodotto cancellato!!!')
            window.location.reload()
        })

}


function primopiano() {

    let prodotti = fetch(API2).then(response => response.json());
    prodotti.then(data => {
        let lista = document.querySelector('#modificaprimopiano');
        data.forEach(primop => {
            let div = document.createElement('span');
            div.innerHTML = `
                             <img src="${primop.img}" alt="${primop.descrizione}">
                             <div>
                             <p>inserisci un link immagine</p>
                             <textarea name="test" id="1" cols="20" rows="1"></textarea> 
                             <button class="btn btn-dark" onclick="modificoPrimo(${primop.id}, this )">Modifica</button></form>
                             </div>
                            `

            lista.appendChild(div);

        })
    })
}


function modificoPrimo(id, button) {

    const RecuperoTextarea = button.parentElement.querySelector("textarea");

    fetch(API2 + id + `?img=${RecuperoTextarea.value}&descrizione=oggetto${id}`, {
        method: "PUT",
        cache: 'no-cache',
    }).then(response => response.json()).then(json => console.log(json))
    alert('Modifica effetuata con successo!')
    window.location.reload()
}

primopiano()
prodotti()