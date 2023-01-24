"use strict";

import{
    Person,Category,Resource,Production,Movie,Serie,User,Coordinate}
from './clases.js';

import{
    BaseException,AbstractClass,NotThisType,NotFound404,ElementFound,SameEmail,SameName,DoesntExists,isNull}
from './excepciones.js';

let VideoSystem = (function () { 
    let instantiated; //Objeto con la instancia única VideoSystem

    function init(name) { //Inicialización del Singleton
        //Declaración de la clase VideoSystem
        class VideoSystem {
            #name;
            #users = [];
            #productions = [];
            #categories = [];
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

            /**
             * Añade una categoria a la lista #categories
             * @param {*} categoria 
             * @returns El nºde categorias en la lista #categories
             */

            addCategory(categoria) {
                //Controla que la categoría no sea nula
                if (categoria === null) throw new isNull(" Category ");
                //Controla que categoría sea una instancia de Category
                if (!(categoria instanceof Category)) throw new NotThisType(categoria.constructor.name);
                //Controla que la categoría no se encuentre ya añadida a la lista
                if ((this.#categories.indexOf(categoria)) != -1) throw new ElementFound(categoria);

                this.#categories.push(categoria);

                return this.#categories.length;
            }

            /**
             * Elimina una categoria de la lista #categories
             * @param {*} categoria
             * @returns El nºde categorias en la lista #categories
             */

            removeCategory(categoria) {
                //Controla que la categoría se encuentre añadida a la lista
                let i = this.#categories.indexOf(categoria);
                if (i == -1) throw new NotFound404(categoria);

                this.#categories.splice(i, 1);

                return this.#categories.length;
            }

            //Iterador de categorias
            get categorias() {
                let categories = this.#categories;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < categories.length; i++) {
                            yield categories[i];
                        }
                    }
                }
            }

            /**
             * Añade un usuario a la lista #users
             * @param {*} usuario 
             * @returns El nºde usuarios en la lista #users
             */

            addUser(usuario) {
                //Controla que el usuario no sea nulo
                if (usuario === null) throw new isNull(" User ");
                //Controla que el usuario sea una instancia de User
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

            /**
             * Elimina un usuario de la lista #users
             * @param {*} usuario 
             * @returns El nºde usuarios en la lista #users
             */

            removeUser(usuario) {
                if (usuario === null) throw new isNull(" User ");
                if (!(usuario instanceof User)) throw new NotThisType(usuario.constructor.name);

                let i = this.#users.indexOf(usuario);
                if (i == -1) throw new NotFound404(usuario);

                this.#users.splice(i, 1);

                return this.#users.length;
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

            /**
             * Añade una producción a la lista #productions
             * @param {*} produccion 
             * @returns El nºde producciones en la lista #productions
             */

            addProduction(produccion) {
                //Controla que la produccion no sea igual a null
                if (produccion === null) throw new isNull(" Production ");
                //Controla que la produccion sea una instancia de Movie o Serie
                if ((!(produccion instanceof Movie)) && (!(produccion instanceof Serie))) throw new NotThisType(produccion.constructor.name);
                //Controla que la producción a añadir no se encuentre ya en la lista
                let i = this.#productions.indexOf(produccion);
                if (i != -1) throw new ElementFound(produccion);

                this.#productions.push(produccion);

                return this.#productions.length;
            }

            /**
             * Elimina una produccion de la lista #productions
             * @param {*} produccion 
             * @returns El nºde producciones en la lista #productions
             */

            removeProduction(produccion) {
                //Controla que la produccion no sea igual a null
                if (produccion === null) throw new isNull(" Production ");
                //Controla que la produccion sea una instancia de Movie o Serie
                if ((!(produccion instanceof Movie)) && (!(produccion instanceof Serie))) throw new NotThisType(produccion.constructor.name);
                //Controla que la producción a añadir se encuentre en la lista para poder eliminarla
                let i = this.#productions.indexOf(produccion);
                if (i == -1) throw new NotFound404(produccion);

                this.#productions.splice(i, 1);

                return this.#productions.length;
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

            /**
             * Añade un actor a la lista #actors
             * @param {*} actor 
             * @returns El nºde usuarios en la lista #actors
             */

            addActor(actor) {
                //Controla que el actor no sea igual a null
                if (actor === null) throw new isNull(" Actor ");
                //Controla que el actor sea una instancia de Person
                if (!(actor instanceof Person)) throw new NotThisType(actor.constructor.name);
                //Controla que el actor a añadir se encuentre ya en la lista
                let i = this.#actors.indexOf(actor);
                if (i != -1) throw new ElementFound(actor);

                this.#actors.push(actor);

                return this.#actors.length;
            }

            /**
             * Elimina un actor de la lista #actors
             * @param {*} actor 
             * @returns El nºde actores en la lista #actors
             */

            removeActor(actor) {
                //Controla que el actor no sea igual a null
                if (actor === null) throw new isNull(" Actor ");
                //Controla que el actor sea una instancia de Person
                if (!(actor instanceof Person)) throw new NotThisType(actor.constructor.name);
                //Controla que el actor a añadir se encuentre en la lista para poder eliminarla
                let i = this.#actors.indexOf(actor);
                if (i == -1) throw new NotFound404(actor);

                this.#actors.splice(i, 1);

                return this.#actors.length;
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

            /**
             * Añade un director a la lista #directors
             * @param {*} director 
             * @returns El nº de directores en la lista #directors
             */

            addDirector(director) {
                //Controla que el director no sea igual a null
                if (director === null) throw new isNull(" Person ");
                //Controla que el actor sea una instancia de Person
                if (!(director instanceof Person)) throw new NotThisType(director.constructor.name);
                //Controla que el actor a añadir se encuentre ya en la lista
                let i = this.#directors.indexOf(director);
                if (i != -1) throw new ElementFound(director);

                this.#directors.push(director);

                return this.#directors.length;
            }

            /**
             * Elimina un director de la lista #directors
             * @param {*} director 
             * @returns El nº de directores en la lista #directors
             */

            removeDirector(director) {
                //Controla que el actor no sea igual a null
                if (director === null) throw new isNull(" Person ");
                //Controla que el actor sea una instancia de Person
                if (!(director instanceof Person)) throw new NotThisType(director.constructor.name);
                //Controla que el actor a añadir se encuentre en la lista para poder eliminarla
                let i = this.#directors.indexOf(director);
                if (i == -1) throw new NotFound404(director);

                this.#directors.splice(i, 1);

                return this.#directors.length;
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

            /**
             * Asigno una o más producciones a una categoría
             * @param {*} categoria 
             * @param  {...any} producciones 
             * @returns 
             */

            assignCategory(categoria, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (categoria === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    //Si no encuentra la producción en la lista, la añade
                    if ((this.#productions.indexOf(producciones[i])) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if ((this.#categories.indexOf(categoria)) == -1) {
                    //Si no encuentra la categoría en la lista, la añade
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

            /**
             * Desasigno una o más producciones a una categoría
             * @param {*} categoria 
             * @param  {...any} producciones 
             * @returns 
             */

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
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProCat.length; i++) {
                            yield listProCat[i];
                        }
                    }
                }
            }

            /**
             * Asigno una o más producciones a un director
             * @param {*} director 
             * @param  {...any} producciones 
             * @returns 
             */

            assignDirector(director, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (director === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    if ((this.#productions.indexOf(producciones[i])) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if ((this.#directors.indexOf(director)) == -1) {
                    this.addDirector(director);
                }

                if (this.#DirectorProduction.has(director)) {
                    this.#DirectorProduction.get(director).push(...producciones);
                } else {
                    this.#DirectorProduction.set(director, []);
                    this.#DirectorProduction.get(director).push(...producciones);
                }

                return this.#DirectorProduction.get(director).length;
            }

            /**
             * Desasigno una o más producciones a un mismo director
             * @param {*} director 
             * @param  {...any} producciones 
             * @returns 
             */

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
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProDir.length; i++) {
                            yield listProDir[i];
                        }
                    }
                }
            }

            /**
             * Asigno una o más producciones a un mismo actor
             * @param {*} actor 
             * @param  {...any} producciones 
             * @returns El nº de producciones asignadas a un mismo actor
             */

            assignActor(actor, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    if ((this.#productions.indexOf(producciones[i])) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if ((this.#actors.indexOf(actor)) == -1) {
                    this.addActor(actor);
                }

                if (this.#ActorProduction.has(actor)) {
                    this.#ActorProduction.get(actor).push(...producciones);
                } else {
                    this.#ActorProduction.set(actor, []);
                    this.#ActorProduction.get(actor).push(...producciones);
                }

                return this.#ActorProduction.get(actor).length;
            }

            /**
             * Desasigno una o más producciones a un mismo actor
             * @param {*} actor 
             * @param  {...any} producciones 
             * @returns El nº de producciones asignadas a un mismo actor
             */

            deassignActor(actor, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Director ");
                //Controla que exista la categoría para acceder a ella
                if (!(this.#ActorProduction.has(actor))) throw new DoesntExists(actor.constructor.name);

                let posicion = -1;

                for (let i = 0; i < producciones.length; i++) {
                    posicion = this.#ActorProduction.get(actor).indexOf(producciones[i]);
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
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProAct.length; i++) {
                            yield listProAct[i];
                        }
                    }
                }
            }
        }
        let instance = new VideoSystem(name);
        Object.freeze(instance);

        return instance;
    }
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function (name) {
            if (!instantiated) {
                instantiated = init(name);
            }
            return instantiated;
        }
    };
})();

export default VideoSystem;