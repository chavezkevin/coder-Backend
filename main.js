mascotas = [];
libros = [];

class usuario {
    constructor (nombre, apellido, libro, mascota){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libro = libro;
        this.mascota = mascota;
    }

    fullNombre(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota){
        mascotas.push(nombreMascota);
    }
    countMascotas(){
        let arrayGrande = mascotas.length;
        return arrayGrande;
    }
    addLibro(nombre, autor){
        libros.push({nombre, autor});
    }
    nombresLibros(){
        return this.libro.map(alias => alias.nombre)
    }
}

//inicio un usuario
const persona = new usuario("Kevin", "Chavez", libros, mascotas);

//agregado de libros
persona.addLibro("El señor de las moscas", "William Golding")
persona.addLibro("fundacion", "Isaac Asimov")

//agregado de mascotas
persona.addMascota("gato")
persona.addMascota("jirafa")
persona.addMascota("mono")

//mostrando los datos
console.log(`
    Apellido y nombre: ${persona.fullNombre()}

    Sus mascotas: ${persona.mascotas}

    ${persona.nombre} tiene ${persona.countMascotas()} mascotas
    
    ${persona.nombre} lee estos libros: ${persona.nombresLibros()}
`)