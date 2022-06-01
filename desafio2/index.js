const fs = require("fs");
const { json } = require("stream/consumers");

class contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    /*--- SAVE ---*/

    async save (objeto) {
        let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`)

        if (!data){
            let id = JSON.parse(await fs.promises.readFile("./index.txt", "utf-8"));
            let idMax = Math.max(...id);
            objeto.id = idMax + 1;
            id = [...id, objeto.id];
            await fs.promises.writeFile(`./index.txt`, JSON.stringify(id));

            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(objeto))
        }
        else{
            /*---el id viene de un archivo aparte---*/

            let id = JSON.parse(await fs.promises.readFile("./index.txt", "utf-8"));
            let maxId = Math.max(...id);
            objeto.id = maxId + 1;
            id = [...id, objeto.id];
            await fs.promises.writeFile(`./index.txt`, JSON.stringify(id));

            /*---los id los traigo de los productos del archivo---*/
            let productos = JSON.parse(
                await fs.promises.readFile("./productos.txt", "utf-8")
            );

            /*---agregar el archivo y reescribit el archivo---*/
            productos.push(objeto);

            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(productos));

            console.log("producto agregado con ID", objeto.id);
        }}

        /*---GET BY ID---*/
        
        async getById(id){
            /*---productos del archivo---*/

            let productos = JSON.parse(
                await fs.promises.readFile("./productos.txt", "utf-8")
            );

            let objeto = productos.find((prod) => prod.id == id);

            console.log(objeto ? objeto : "ID inexistente");
        }

        /*---GETALL---*/
        async getAll() {
            let productos = JSON.parse(
                await fs.promises.readFile("./productos.txt", "utf-8")
            );
            console.log(productos)
        }

        /*---DELETE BY ID---*/

        async deleteById (id) {
            let productos = JSON.parse(
                await fs.promises.readFile("./productos.txt", "utf-8")
            );

            if (productos.some((prod) => prod.id == id)){
                let productosNuevos = productos.filter((prod) => prod.id != id);
                
                await fs.promises.writeFile(`./${this.archivo}`, JSON.stringi(productosNuevos)
                );
                console.log("producto eliminado");
            } else{
                console.log("no hay un producto con ese id");
            }
        }

        /*---DELETE ALL---*/

        async deleteAll() {
            try{
                await fs.promises.writeFile(`./${this,this.archivo}`, "[]");
            } catch(error) {
                console.log(error)
            }
        }
}




/*PROBANDO LOS METODOS*/


/* new contenedor('productos.txt').save({"nombre":"shampoo","precio":200,"thumbnail":"ejemplo url"});

new contenedor ('productos.txt').getById(8)

new contenedor ('productos.txt').getAll()

new contenedor ('productos.txt').deleteById(6)

new contenedor ('productos.txt').deleteAll() */