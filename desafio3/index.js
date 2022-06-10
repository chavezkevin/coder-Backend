const express = require('express')
const fs = require('fs')
const app = express()
const port = 80800
let flecha = new Date

class contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }

    async getAll() {
        try{
            return JSON.parse(
                await fs.promises.readFile(`./desafio3/${this.archivo}`, "utf-8")
            );
        } catch (error){
            console.log("[[[error desde el metodo getAll]]]")
        }
    }
}


app.listen(port, () => {
    try{
        console.log(`servidor desde ${port}`)
    } catch(error) {
        console.log('ojo!!!',error)
    }
})

app.get('/productos', async (req, res) => {
    
    let productos = await new Contenedor('productos.txt').getAll()
    
    res.send( `<h1>PRODUCTOS</h1> <ul  style="list-style: none" > ${productos.map(prod => { let card = `<li><img src='${prod.thumbnail}' style="width: 30px" />${prod.title}, <br> Precio:$ ${prod.price}</li>`

        return card
    })}</ul>` )
} )

app.get('/productosRandom', async (req, res) => {
    let productos = await new contenedor('productos.txt').getAll()

    let random = Math.floor( Math.random() * productos.lenght);

    res.send(
        `<img src='${productos[random].thumbnail}' style="width: 100px" /><br> ${productos[random].title}, <br> precio:$ ${productos[random].price}`
    )
})