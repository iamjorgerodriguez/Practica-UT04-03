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

    get name() {
        return this.#name;
    }


    get description() {
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

    constructor(title, nationality, publication, synopsis, image, resource = new Resource, locations = new Coordinate) {
        //Excepción que controla que locations sea una instancia de locations
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

    constructor(title, nationality, publication, synopsis, image, resource = new Resource, locations = new Coordinate, seasons = "") {
        // Excepción que controla que locations sea una instancia de Coordinate
        if (!(locations instanceof Coordinate)) throw new NotThisType();
        // Excepción que controla que resource sea una instancia de Person
        if (!(resource instanceof Resource)) throw new NotThisType();

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

    get username() {
        return this.#username;
    }

    get email() {
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
            #users = [];
            #productions = [];
            #categorias = [];
            #actors = [];
            #directors = [];
            #CategoryProduction = new Map();
            #ActorProduction = new Map();
            #DirectorProduction = new Map();

            constructor(name) {
                this.#name = name;
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
            removeCategory(categoria) {
                let i = this.findItemsLists(categoria, this.#categorias);

                if (i == -1) throw new NotFound404(categoria);

                this.#categorias.splice(i, 1);

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
                if (usuario === null) throw new isNull(" User ");
                if (!(usuario instanceof User)) throw new NotThisType(usuario.constructor.name);

                for (let userList of this.#users) {
                    //Controla que el nombre del usuario no se encuentre ya registrado
                    if (usuario.username == userList.username) throw new SameName(usuario.username);
                    //Controla que el email del usuario no se encuentre ya registrado
                    if (usuario.email == userList.email) throw new SameEmail(usuario.email);
                }

                this.#users.push(usuario);

                return this.#users.length;
            }

            removeUser(usuario) {
                if (usuario === null) throw new isNull(" User ");
                if (!(usuario instanceof User)) throw new NotThisType(usuario.constructor.name);

                let i = this.findItemsLists(usuario, this.#users);
                if (i == -1) throw new NotFound404(usuario);

                this.#users.splice(i, 1);

                return this.#users.length;
            }

            //Iterador de producciones
            get productions() {
                let listProductions = this.#productions;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProductions.length; i++) {
                            yield listProductions[i];
                        }
                    }
                }
            }

            addProduction(produccion) {
                //Contrala que la produccion no sea igual a null
                if (produccion === null) throw new isNull(" Production ");
                //Controla que la produccion sea una instancia de Movie o Serie
                if ((!(produccion instanceof Movie)) && (!(produccion instanceof Serie))) throw new NotThisType(produccion.constructor.name);
                //Contrala que la producción a añadir no se encuentre ya en la lista
                let i = this.findItemsLists(produccion, this.#productions);
                if (i != -1) throw new ElementFound(produccion);

                this.#productions.push(produccion);

                return this.#productions.length;
            }

            removeProduction(produccion) {
                //Contrala que la produccion no sea igual a null
                if (produccion === null) throw new isNull(" Production ");
                //Controla que la produccion sea una instancia de Movie o Serie
                if ((!(produccion instanceof Movie)) && (!(produccion instanceof Serie))) throw new NotThisType(produccion.constructor.name);
                //Contrala que la producción a añadir se encuentre en la lista para poder eliminarla
                let i = this.findItemsLists(produccion, this.#productions);
                if (i == -1) throw new NotFound404(produccion);

                this.#productions.splice(i, 1);

                return this.#productions.length;
            }

            //Iterador de producciones
            get actors() {
                let listActors = this.#actors;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listActors.length; i++) {
                            yield listActors[i];
                        }
                    }
                }
            }

            addActor(actor) {
                //Contrala que el actor no sea igual a null
                if (actor === null) throw new isNull(" Actor ");
                //Controla que el actor sea una instancia de Person
                if (!(actor instanceof Person)) throw new NotThisType(actor.constructor.name);
                //Contrala que el actor a añadir se encuentre ya en la lista
                let i = this.findItemsLists(actor, this.#actors);
                if (i != -1) throw new ElementFound(actor);

                this.#actors.push(actor);

                return this.#actors.length;
            }

            removeActor(actor) {
                //Contrala que el actor no sea igual a null
                if (actor === null) throw new isNull(" Actor ");
                //Controla que el actor sea una instancia de Person
                if (!(actor instanceof Person)) throw new NotThisType(actor.constructor.name);
                //Contrala que el actor a añadir se encuentre en la lista para poder eliminarla
                let i = this.findItemsLists(actor, this.#actors);
                if (i == -1) throw new NotFound404(actor);

                this.#actors.splice(i, 1);

                return this.#actors.length;
            }

            //Iterador de producciones
            get directors() {
                let listDirector = this.#directors;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listDirector.length; i++) {
                            yield listDirector[i];
                        }
                    }
                }
            }

            addDirector(director) {
                //Contrala que el director no sea igual a null
                if (director === null) throw new isNull(" Person ");
                //Controla que el actor sea una instancia de Person
                if (!(director instanceof Person)) throw new NotThisType(director.constructor.name);
                //Contrala que el actor a añadir se encuentre ya en la lista
                let i = this.findItemsLists(director, this.#directors);
                if (i != -1) throw new ElementFound(director);

                this.#directors.push(director);

                return this.#directors.length;
            }

            removeDirector(director) {
                //Contrala que el actor no sea igual a null
                if (director === null) throw new isNull(" Person ");
                //Controla que el actor sea una instancia de Person
                if (!(director instanceof Person)) throw new NotThisType(director.constructor.name);
                //Contrala que el actor a añadir se encuentre en la lista para poder eliminarla
                let i = this.findItemsLists(director, this.#directors);
                if (i == -1) throw new NotFound404(director);

                this.#directors.splice(i, 1);

                return this.#directors.length;
            }

            /**
             * Función que buscará elementos en 
             * su respectiva lista
             * @param {*} elem 
             * @param {*} lista 
             * @returns -1 si no se ha encontrado el elemento.
             *          Cualquier número, si se ha encontrado.
             */

            findItemsLists(elem, lista) {
                //Posición del elemento en la lista
                let i = 0, j = -1;

                for (let listaElem of lista) {
                    if (listaElem === elem) {
                        j = i;
                    }
                    i++;
                }

                return j;
            }

            assignCategory(categoria, ...producciones) {
                //Contrala que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Contrala que la categoria no sea igual a null
                if (categoria === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    if (this.findItemsLists(producciones[i], this.#productions) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if (this.findItemsLists(categoria, this.#categorias) == -1) {
                    this.addCategory(categoria);
                }

                if (this.#CategoryProduction.has(categoria)) {
                    this.#CategoryProduction.get(categoria).push(...producciones);
                } else {
                    this.#CategoryProduction.set(categoria, []);
                    this.#CategoryProduction.get(categoria).push(...producciones);
                }

                return this.#CategoryProduction.get(categoria).length;
            }

            deassignCategory(categoria, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (categoria === null) throw new isNull(" Categoría ");
                //Controla que exista la categoría para acceder a ella
                if (!(this.#CategoryProduction.has(categoria))) throw new DoesntExists(categoria.constructor.name);

                let posicion = -1;

                for (let i = 0; i < producciones.length; i++) {
                    posicion = this.#CategoryProduction.get(categoria).indexOf(producciones[i]);
                    //En caso de que se haya encontrado la categoria, se borrará la producción
                    if (posicion != -1) {
                        this.#CategoryProduction.get(categoria).splice(posicion, 1);
                    }
                }


                return this.#CategoryProduction.get(categoria).length;
            }

            //Iterador de producciones asignadas a una categoria
            getProductionsCategory(categoria) {
                //Controla que la categoria no sea igual a null
                if (categoria === null) throw new isNull(" Categoría ");

                let listProCat = this.#CategoryProduction.get(categoria);
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProCat.length; i++) {
                            yield listProCat[i];
                        }
                    }
                }
            }

            assignDirector(director, ...producciones) {
                //Contrala que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Contrala que la categoria no sea igual a null
                if (director === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    if (this.findItemsLists(producciones[i], this.#productions) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if (this.findItemsLists(director, this.#directors) == -1) {
                    this.addCategory(director);
                }

                if (this.#DirectorProduction.has(director)) {
                    this.#DirectorProduction.get(director).push(...producciones);
                } else {
                    this.#DirectorProduction.set(director, []);
                    this.#DirectorProduction.get(director).push(...producciones);
                }

                return this.#DirectorProduction.get(director).length;
            }

            deassignDirector(director, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (director === null) throw new isNull(" Director ");
                //Controla que exista el director para acceder a ella
                if (!(this.#DirectorProduction.has(director))) throw new DoesntExists(director.constructor.name);

                let posicion = -1;

                for (let i = 0; i < producciones.length; i++) {
                    posicion = this.#DirectorProduction.get(director).indexOf(producciones[i]);
                    //En caso de que se haya encontrado al director, se borrará la producción
                    if (posicion != -1) {
                        this.#DirectorProduction.get(director).splice(posicion, 1);
                    }
                }


                return this.#DirectorProduction.get(director).length;
            }

            //Iterador de producciones asignadas a una categoria
            getProductionsDirector(director) {
                //Controla que la categoria no sea igual a null
                if (director === null) throw new isNull(" Categoría ");

                let listProDir = this.#DirectorProduction.get(director);
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProDir.length; i++) {
                            yield listProDir[i];
                        }
                    }
                }
            }

            assignActor(actor, ...producciones) {
                //Contrala que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Contrala que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    if (this.findItemsLists(producciones[i], this.#productions) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if (this.findItemsLists(actor, this.#actors) == -1) {
                    this.addCategory(director);
                }

                if (this.#ActorProduction.has(actor)) {
                    this.#ActorProduction.get(actor).push(...producciones);
                } else {
                    this.#ActorProduction.set(actor, []);
                    this.#ActorProduction.get(actor).push(...producciones);
                }

                return this.#ActorProduction.get(actor).length;
            }

            deassignActor(actor, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Director ");
                //Controla que exista la categoría para acceder a ella
                if (!(this.#ActorProduction.has(actor))) throw new DoesntExists(actor.constructor.name);

                let posicion = -1;

                for (let i = 0; i < producciones.length; i++) {
                    posicion = this.#ActorProduction.get(director).indexOf(producciones[i]);
                    //En caso de que se haya encontrado al actor, se borrará la producción
                    if (posicion != -1) {
                        this.#ActorProduction.get(actor).splice(posicion, 1);
                    }
                }

                return this.#ActorProduction.get(actor).length;
            }

            //Iterador de producciones asignadas a una categoria
            getProductionsActor(actor) {
                //Controla que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Actor ");

                let listProAct = this.#ActorProduction.get(actor);
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProAct.length; i++) {
                            yield listProAct[i];
                        }
                    }
                }
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