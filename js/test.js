import{
    Person,Category,Resource,Production,Movie,Serie,User,Coordinate}
from './clases.js';

import VideoSystem from './main.js';


//Actores/Actrices
let a1=new Person("Tommas","Jeffrey","Hanks",new Date ("Jul 9 1956"));
let a2=new Person("Vivian","Leigh","Hartley",new Date ("Nov 5 1913"),"../img/vivian.jpg");
let a3=new Person("Jack","Lemmon","",new Date ("Feb 8 1925"),"../img/lemmon.jpg");

//Directores
let d1=new Person("Alfred","Joseph","Hitchcock",new Date("Aug 13 1899"),"../img/hitchcock.jpg");
let d2=new Person("Stanley","Kubick","",new Date("Jul 25 1928"),"../img/stanley.jpg");
let d3=new Person("David Andrew","Leo","Fincher",new Date("Aug 28 1962"));
let dNull=null;
//Categorias
let c1=new Category("Drama","Responde a una estructura narrativa en la que se presenta un conflicto personal en el protagonista o entre diferentes personajes.");
let c2=new Category("Ciencia-Ficción", "Es un género narrativo que sitúa la acción en unas coordenadas espacio-temporales imaginarias y diferentes a las nuestras, y que especula racionalmente sobre posibles avances científicos");
let c3=new Category("Thriller", "Se caracteriza por tener una trama emocionante que mantiene al lector o espectador en constante suspenso, siguiendo con mucha atención el desarrollo de la historia hasta la resolución final del conflicto");

//Usuarios
let u1=new User("jorgerodri","jorgerodricaro@gmail.com","Cliente");
let u2=new User("bono","bonou2@gmail.com","WithorWithoutYou");
//Usuario que repite el nombre de usuario con u1
let u3=new User("jorgerodri","george@gmail.com","ABCD1234");
//Usuario que repite el email con u2
let u4=new User("arnold","bonou2@gmail.com","24 DE ENERO");

//Productions
let pr1=new Movie("La milla verde","EE.UU",new Date("Feb 18 2000"),"Paul Edgecomb es un funcionario de prisiones que vigila la milla verde, el pasillo de linóleo que los condenados a muerte recorren hasta llegar a la silla eléctrica. John Coffey, un gigantesco convicto acusado de violar y asesinar a dos niñas de nueve años, está esperando su inminente ejecución.");
let pr2=new Movie("Terminator","EE.UU",new Date("Feb 12 1984"),"En el año 2029 las máquinas dominan el mundo. Los rebeldes que luchan contra ellas tienen como líder a John Connor, un hombre que nació en los años ochenta");
let pr3=new Serie("Breaking Bad","EE.UU",new Date("Mar 12 2008"),"Walter White, profesor de química en un instituto, descubre que tiene cáncer de pulmón y decide trabajar junto con un ex-alumno elaborando metanfetamina de alta calidad para poder ganar dinero para que su familia se mantenga.");
let pr4=new Movie("Vértigo","United Kingdom",new Date("Mar 12 1958"),"Scottie Fergusson (James Stewart) es un detective de la policía de San Francisco que padece de vértigo. Cuando un compañero cae al vacío desde una cornisa mientras persiguen a un delincuente, Scottie decide retirarse.");
let pr5=new Movie("Psicosis","United Kingdom",new Date("Jun 16 1960"),"La secretaria de una empresa inmobiliaria, Marion Crane, no puede casarse con su amante, Sam Loomis. El destino pone en sus manos 40.000 dólares en efectivo que su jefe le confía para depositarlos en el banco.");
let pr6=new Movie("The Birds","EE.UU",new Date("Jun 25 1963"),"Melanie, una joven rica mujer, conoce en una pajarería al abogado Mitch Brenner. Tras el encuentro, Melanie persigue al hombre hasta Bodega Bay, lugar en el que es atacada por bandadas de pájaros enfurecidos.");
let pr7=new Movie("Forrest Gump","EE.UU",new Date("Sep 23 1994"),"Sentado en un banco en Savannah, Georgia, Forrest Gump espera al autobús. Mientras éste tarda en llegar, el joven cuenta su vida a las personas que se sientan a esperar con él. Aunque sufre un pequeño retraso mental, esto no le impide hacer cosas maravillosas.");
let pr8=new Movie("Interstellar","EE.UU",new Date("Nov 7 2014"),"Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.");
let prNull=null;

//Singleton VideoSystem
let vs1=new VideoSystem.getInstance("Maestre");

console.log("Instancio el objeto Videosystem y compruebo su nombre");
console.log(vs1.name);

console.log("\nDespués de instanciar tres categorías, las añado a VideoSystem");
console.log(vs1.addCategory(c1));
console.log(vs1.addCategory(c2));
console.log(vs1.addCategory(c3));
console.log("Y compruebo el contenido de la lista de categorías:");
console.log(...vs1.categorias);

try{
    console.log("Intento añadir una categoría ya existente en VideoSystem");
    console.log(vs1.addCategory(c1));
}catch(error){
    console.log(error.message);
}

try{
    console.log("\nAhora intento añadir una persona a las categorías");
    console.log(vs1.addCategory(a1));
}catch(error){
    console.log(error.message);
}

console.log("\nInstancio 4 usuarios y añado dos a VideoSystem");
console.log(vs1.addUser(u1));
console.log(vs1.addUser(u2));
console.log("Compruebo el contenido de la lista de Usuarios: ");
console.log(...vs1.users);

try{
    console.log("\nIntento añadir un usuario con el mismo nombre de usuario que el primero: ");
    console.log(vs1.addUser(u3));
}catch(error){
    console.log(error.message);
}

try{
    console.log("Intento añadir un usuario con el mismo email que el segundo usuario añadido: ");
    console.log(vs1.addUser(u4));
}catch(error){
    console.log(error.message);
}

console.log("Ahora elimino el primer usuario añadido:");
console.log(vs1.removeUser(u1));
console.log("Y compruebo de nuevo el contenido de la lista de Usuarios: ");
console.log(...vs1.users);

console.log("Instancio varias producciones y añado tres de ellas a la lista de producciones: ");
console.log(vs1.addProduction(pr1));
console.log(vs1.addProduction(pr2));
console.log(vs1.addProduction(pr3));
console.log("Compruebo el contenido de la lista de Productions: ");
console.log(...vs1.productions);

try{
    console.log("\nIntento eliminar un objeto igual a null de la lista de producciones: ");
    console.log(vs1.removeProduction(prNull));
}catch(error){
    console.log(error.message);
}

console.log("\nElimino la primera producción añadida a la lista de producciones(La milla Verde): ");
console.log(vs1.removeProduction(pr1));
console.log("Y compruebo de nuevo su contenido");
console.log(...vs1.productions);

try{
    console.log("\nAhora intento eliminar un actor de la lista de actores, cuando esta vacía: ");
    console.log(vs1.removeActor(a1));
}catch(error){
    console.log(error.message);
}

console.log("\nAñado tres actores a la lista de actores: ");
console.log(vs1.addActor(a1));
console.log(vs1.addActor(a2));
console.log(vs1.addActor(a3));
console.log("Y compruebo su contenido: ");
console.log(...vs1.actors);

try{
    console.log("Intento eliminar una produccion de la lista de actores");
    console.log(vs1.removeActor(pr1));
}catch(error){
    console.log(error.message);
}

console.log("Añado 3 directores a la lista de directores");
console.log(vs1.addDirector(d1));
console.log(vs1.addDirector(d2));
console.log(vs1.addDirector(d3));
console.log("Y compruebo el contenido de la lista");
console.log(...vs1.directors);

try{
    console.log("\nIntento añadir un objeto igual a null en la lista de directores: ");
    console.log(vs1.addDirector(prNull));
}catch(error){
    console.log(error.message);
}

console.log("\nElimino el primer director añadido a la lista: ");
console.log(vs1.removeDirector(d1));

try{
    console.log("E intento volver a borrar el director que acabo de borrar: ");
    console.log(vs1.removeDirector(d1));
}catch(error){
    console.log(error.message);
}

console.log("\n----------ASIGNACIONES----------");

console.log("Asigno dos películas a la categoría Ciencia Ficción, una de ellas no está añadida a la lista de producciones:");
console.log("Lista Producción Antes: \n");
console.log(...vs1.productions);
console.log(vs1.assignCategory(c2,pr2,pr8));
console.log("\nLista Producción Después: \n");
console.log(...vs1.productions);
console.log("\nDesasigno una de las producciones");
console.log(vs1.deassignCategory(c2,pr2));
console.log("Compruebo las categorias asignadas a ciencia ficción: ");
console.log(...vs1.getProductionsCategory(c2));

try{
    console.log("\nIntento desasignar Terminator de una categoría que no está añadida");
    console.log(vs1.deassignCategory(c1,pr3));
}catch(error){
    console.log(error.message);
}

console.log("\nAsigno tres películas no añadidas al sistema a un director (Hitchcock): ");
console.log(vs1.assignDirector(d1,pr4,pr5,pr6));
console.log("\nCompruebo el contenido de la lista de producciones");
console.log(...vs1.productions);

try{
    console.log("\nIntento desasignar una produccion igual a null: ");
    console.log(vs1.deassignDirector(d1,prNull));
}catch(error){
    console.log(error.message);
}

console.log("\nCompruebo las películas asignadas a Hitchcock: ");
console.log(...vs1.getProductionsDirector(d1));

console.log("\nAsigno dos producciones a un actor (Tom Hanks):");
console.log(vs1.assignActor(a1,pr1));
console.log(vs1.assignActor(a1,pr7));
console.log("Compruebo las producciones asignadas a Tom Hanks:");
console.log(...vs1.getProductionsActor(a1));
console.log("Elimino una de las producciones:")
console.log(vs1.deassignActor(a1,pr7));
console.log("Y vuelvo a comprobar el contenido: ")
console.log(...vs1.getProductionsActor(a1));

try{
    console.log("\nIntento desasignar un director igual a null de una producción: ");
    console.log(vs1.deassignDirector(dNull,pr5));
}catch(error){
    console.log(error.message);
}

console.log("Y por último compruebo la lista de producciones tras añadirse otras dos:")
console.log(...vs1.productions);