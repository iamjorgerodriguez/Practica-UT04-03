"use strict";

//Clase Person

class Person{
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name, lastname1, lastname2 = "", born, picture= ""){
        
        this.#name=name;
        this.#lastname1=lastname1;
        this.#lastname2=lastname2;
        this.#born=born;
        this.#picture=picture;
    }

    //Getters

    get name (){
        return this.#name;
    }

    get born (){
        return this.#born;
    }

    toString(){
        return this.#name+" - "+this.#lastname1+" - "+this.#lastname2+" - "+this.#born.toLocaleDateString()+" - "+this.#picture;
    }
}

class Category{
    #name;
    #description;

    constructor(name,description=""){
        
        this.#name=name;
        this.#description=description;
    }
}

class Resource{
    #duration;
    #link;

    constructor(duration,link){
        this.#duration=duration;
        this.#link=link;
    }
}

class Production{
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    constructor(title,nationality="",publication,synopsis="",image=""){
        //Comprobará que no se instancian objetos de esta clase
        if(new.target === Production) throw new AbstractClass(this.constructor.name);

        this.#title=title;
        this.#nationality=nationality;
        this.#publication=publication;
        this.#synopsis=synopsis;
        this.#image=image;
    }
}

class Movie extends Production{
    #resource;
    #locations;

    constructor(title,nationality,publication,synopsis,image, resource="",locations=""){
        //Excepción que controla que resource sea una instancia de Person
        if (!(resource instanceof Person)) throw new NotThisType();
        if (!(locations instanceof Coordinate)) throw new NotThisType();

        super(title,nationality,publication,synopsis,image)
        this.#resource=resource;
        this.#locations=locations;
    }
}

class Serie extends Production{
    #resources;
    #locations;
    #seasons;

    constructor(title,nationality,publication,synopsis,image, resource="",locations="",seasons=""){
        //Excepción que controla que locations sea una instancia de Coordinate
        if (!(locations instanceof Coordinate)) throw new NotThisType();
        //Excepción que controla que resource sea una instancia de Person
        if (!(resource instanceof Person)) throw new NotThisType();

        super(title,nationality,publication,synopsis,image);
        this.#resources=resource;
        this.#locations=locations;
        this.#seasons=seasons;
    }
}

class User{
    #username;
    #email;
    #password;

    constructor(username, email, password){
        this.#username=username;
        this.#email=email;
        this.#password=password;
    }
}

class Coordinate{
    #latitude;
    #longitude;

    constructor(latitude, longitude){
        this.#latitude=latitude;
        this.#longitude=longitude;
    }
}

class VideoSystem{
    #name;
    #usuarios;
    #producciones;
    #categorias;
    #actores;
    #directores;

    constructor (name, listaUsuarios=[], listaProducciones = [], listaCategorias = [], listaActores = [], listaDirectores = []){
        this.#name=name;
        this.#usuarios=listaUsuarios;
        this.#producciones=listaProducciones;
        this.#categorias=listaCategorias;
        this.#actores=listaActores;
        this.directores=listaDirectores;
    }

    get name(){
        return this.#name;
    }

    set name(name){
        //Excepción que controlará que el atributo name no esté vacío
        if (name.length == 0) throw new isNull("name");

        this.#name=name;
    }

    //Iterador de categorias
    get categorias() {
        let categories = this.#categorias;
        //Retorno el objeto [Symbol.iterator]
        return {
            * [Symbol.iterator](){
            for (let i = 0; i < categories.length; i++){
              yield categories[i];
            }
          }
        }			  
    }

    //Añade una categoría a la colección de categorias
    addCategory(){
        
    }
}