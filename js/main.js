"use strict";

//Clase Person

class Person {
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name, lastname1, lastname2 = "", born, picture = "") {

        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;
    }

    //Getters

    get name() {
        return this.#name;
    }

    get born() {
        return this.#born;
    }

    toString() {
        return this.#name + " - " + this.#lastname1 + " - " + this.#lastname2 + " - " + this.#born.toLocaleDateString() + " - " + this.#picture;
    }
}

class Category {
    #name;
    #description;

    constructor(name, description = "") {

        this.#name = name;
        this.#description = description;
    }

    get name(){
        return this.#name;
    }

    
    get description(){
        return this.#description;
    }
}

class Resource {
    #duration;
    #link;

    constructor(duration, link) {
        this.#duration = duration;
        this.#link = link;
    }
}

class Production {
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    constructor(title, nationality = "", publication, synopsis = "", image = "") {
        //Comprobará que no se instancian objetos de esta clase
        if (new.target === Production) throw new AbstractClass(this.constructor.name);

        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
    }
}

class Movie extends Production {
    #resource;
    #locations;

    constructor(title, nationality, publication, synopsis, image, resource = "", locations = "") {
        //Excepción que controla que resource sea una instancia de Person
        if (!(resource instanceof Person)) throw new NotThisType();
        if (!(locations instanceof Coordinate)) throw new NotThisType();

        super(title, nationality, publication, synopsis, image)
        this.#resource = resource;
        this.#locations = locations;
    }
}

class Serie extends Production {
    #resources;
    #locations;
    #seasons;

    constructor(title, nationality, publication, synopsis, image, resource = "", locations = "", seasons = "") {
        //Excepción que controla que locations sea una instancia de Coordinate
        if (!(locations instanceof Coordinate)) throw new NotThisType();
        //Excepción que controla que resource sea una instancia de Person
        if (!(resource instanceof Person)) throw new NotThisType();

        super(title, nationality, publication, synopsis, image);
        this.#resources = resource;
        this.#locations = locations;
        this.#seasons = seasons;
    }
}

class User {
    #username;
    #email;
    #password;

    constructor(username, email, password) {
        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    get username(){
        return this.#username;
    }
    
    get email(){
        return this.#email;
    }
}

class Coordinate {
    #latitude;
    #longitude;

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;
    }
}

let VideoSystem = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    let instantiated; //Objeto con la instancia única ImageManager

    function init(name) { //Inicialización del Singleton
        //Declaración de la clase VideoSystem
        class VideoSystem {
            #name;
            #users;
            #producciones;
            #categorias;
            #actores;
            #directores;

            constructor(name, listaU = [], listaP = [], listaC = [], listaA = [], listaD = []) {
                this.#name = name;
                this.#users = listaU;
                this.#producciones = listaP;
                this.#categorias = listaC;
                this.#actores = listaA;
                this.#directores = listaD;
            }

            get name() {
                return this.#name;
            }

            set name(name) {
                //Excepción que controlará que el atributo name no esté vacío
                if (name.length == 0) throw new isNull("name");

                this.#name = name;
            }

            //Iterador de categorias
            get categorias() {
                let categories = this.#categorias;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < categories.length; i++) {
                            yield categories[i];
                        }
                    }
                }
            }

            //Añade una categoría a la colección de categorias
            addCategory(categoria) {
                this.#categorias.push(categoria);

                return this.#categorias.length;
            }

            //Elimina una categoría en caso de que se encuentre en this.#categorias
            removeCategory(categoria){
                let i=this.findItemsLists(categoria, this.#categorias);

                if (i == -1) throw new NotFound404(categoria);
                
                this.#categorias.splice(i,1);

                return this.#categorias.length;
            }

            //Iterador de usuarios
            get users() {
                let listUsers = this.#users;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listUsers.length; i++) {
                            yield listUsers[i];
                        }
                    }
                }
            }

            //Añade una usuario a la lista de usuarios
            addUser(usuario) {
                for(let userList of this.#users){
                    //Controla que el nombre del usuario no se encuentre ya registrado
                    if (usuario.username == userList.username) throw new SameName(usuario.username);
                    //Controla que el email del usuario no se encuentre ya registrado
                    if (usuario.email == userList.email) throw new SameEmail(usuario.email);
                }

                this.#users.push(usuario);

                return this.#users.length;
            }

            /**
             * Función que buscará elementos en 
             * su respectiva lista
             * @param {*} elem 
             * @param {*} lista 
             * @returns -1 si no se ha encontrado el elemento.
             *          Cualquier número, si se ha encontrado.
             */

            findItemsLists(elem,lista){
                //Posición del elemento a eliminar en la lista
                let i=0, j=-1;

                for(let listaElem of lista){
                    if (listaElem === elem) {
                        j=i;
                    }
                    i++;
                }

                return j;
            }
            
        }

        let instance = new VideoSystem(name);//Devolvemos el objeto ImageManager para que sea una instancia única.
        Object.freeze(instance);
        return instance;
    } //Fin inicialización del Singleton
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function (name) {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(name); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();