const express = require("express");
const cors = require("cors");
const app = express()
const port = 3000;
app.use(cors());
app.use(express.urlencoded({ extended: false }))

let categorie = [
    { id: 1, categorytitle: "maglia1", img: "../client/assets/img/placeholder/placeholder.webp", prezzo: "60", descrizione: "maglietta color giallo" },
    { id: 2, categorytitle: "maglia2", img: "../client/assets/img/placeholder/product-2.jpg", prezzo: "54", descrizione: " Camicia rosa" },
    { id: 3, categorytitle: "maglia3", img: "../client/assets/img/placeholder/product-3.jpg", prezzo: "10", descrizione: "vestito arancione" },
    { id: 4, categorytitle: "maglia4", img: "../client/assets/img/placeholder/product-4.jpg", prezzo: "53", descrizione: " camicia rosa con righe" },
    { id: 5, categorytitle: "maglia5", img: "../client/assets/img/placeholder/product-5.jpg", prezzo: "22", descrizione: " camicia gialla con righe" },
    { id: 6, categorytitle: "maglia6", img: "../client/assets/img/placeholder/product-6.jpg", prezzo: "10", descrizione: "camicia bianca con righe" },
    { id: 7, categorytitle: "maglia7", img: "../client/assets/img/placeholder/product-7.jpg", prezzo: "10", descrizione: "vestito estivo" },
    { id: 8, categorytitle: "maglia8", img: "../client/assets/img/placeholder/product-8.jpg", prezzo: "66", descrizione: "camicia con fiori" },
    { id: 9, categorytitle: "maglia1", img: "../client/assets/img/placeholder/placeholder.webp", prezzo: "14", descrizione: "maglietta color giallo" },
    { id: 10, categorytitle: "maglia2", img: "../client/assets/img/placeholder/product-2.jpg", prezzo: "30", descrizione: " Camicia rosa" },
    { id: 11, categorytitle: "maglia3", img: "../client/assets/img/placeholder/product-3.jpg", prezzo: "68", descrizione: "vestito arancione" },
    { id: 12, categorytitle: "maglia4", img: "../client/assets/img/placeholder/product-4.jpg", prezzo: "16", descrizione: " camicia rosa con righe" },
    { id: 13, categorytitle: "maglia5", img: "../client/assets/img/placeholder/product-5.jpg", prezzo: "20", descrizione: " camicia gialla con righe" },
    { id: 14, categorytitle: "maglia6", img: "../client/assets/img/placeholder/product-6.jpg", prezzo: "90", descrizione: "camicia bianca con righe" },
    { id: 15, categorytitle: "maglia7", img: "../client/assets/img/placeholder/product-7.jpg", prezzo: "10", descrizione: "vestito estivo" },
    { id: 16, categorytitle: "maglia8", img: "../client/assets/img/placeholder/product-8.jpg", prezzo: "20", descrizione: "camicia con fiori" },
    { id: 17, categorytitle: "maglia7", img: "../client/assets/img/placeholder/product-7.jpg", prezzo: "70", descrizione: "vestito estivo" },
    { id: 18, categorytitle: "maglia8", img: "../client/assets/img/placeholder/product-8.jpg", prezzo: "29", descrizione: "camicia con fiori" }
];

let primoPiano = [
    { id: 1, img: "../client/assets/img/placeholder/placeholder.webp", descrizione: "maglietta color giallo" },
    { id: 2, img: "../client/assets/img/placeholder/product-2.jpg", descrizione: " Camicia rosa" },
    { id: 3, img: "../client/assets/img/placeholder/product-3.jpg", descrizione: "vestito arancione" },
];

// GET
app.get("/api/categorie", (request, response) => {
    response.json(categorie);
})

app.get("/api/primopiano", (request, response) => {
    response.json(primoPiano);
})

app.get("/api/primopiano/:id", (request, response) => {
    const id = request.params.id;
    for (let element of categorie) {
        if (element.id === id) {
            response.json(element);
            break
        }
    }
});

// POST
app.post("/api/categorie", (request, response) => {
    const obj = request.body;
    obj.id = categorie.length;
    categorie.push(obj);
    response.json("categoria aggiunta correttamente!")
});
app.get('/api/categorie/:id', (request, response) => {
    const id = +request.params.id;
    for (let ele of categorie) {
        if (ele.id === id) {
            response.json(ele);
            break
        }
    }
});

// PUT
app.put("/api/primopiano/:id", (request, response) => {
    const id = request.params.id;
    const object = {
        id,
        img: request.query.img,
        descrizione: request.query.descrizione
    }

    let index = primoPiano.findIndex(ele => ele.id === +id);
    primoPiano[index] = object;
    response.json("tutto modificato!")
});

// DELETE
app.delete("/api/categorie/:id", (request, response) => {
    const id = request.params.id;
    categorie = categorie.filter(ele => ele.id !== +id);
    response.json("categoria eliminata correttamente!")
});

app.listen(port, () => console.log('Server attivo sulla porta 3000'));