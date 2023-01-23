//Categorias
let c1=new Category("Drama","Pelicula dirigida para personas con un cierto retraso mental");
let c2=new Category("Ciencia-Ficción","Pelicula dirigida para personas con un cierto retraso mental");

//Usuarios
let u1=new User("jorgerodri","jorgerodricaro@gmail.com","HolaAmigosDelYoutube");
let u2=new User("jorgerodri","jorgerodricar@gmail.com","HolaAmigosDelYoutube");
let u3=null;

//Productions
let pr1=new Movie("La milla verde","EE.UU",new Date("Jan 27 2001"),"Un hombre condenado a muerte");
let pr2=null;

//Actores/Actrices
let a1=new Person("Jorge","Rodríguez-Caro","Molero",new Date ("Jan 27 2000"));

let vs1=new VideoSystem.getInstance("Por algo");
// console.log(vs1);
// console.log(vs1.addCategory(c1));
// console.log(vs1.addCategory(c2));
// console.log(...vs1.categorias);
// console.log(vs1.removeCategory(c1));
// console.log(...vs1.categorias);
// console.log(vs1.removeCategory(c2));
// console.log(...vs1.categorias);

// console.log(vs1.addUser(u3));
// console.log(vs1.addUser(u2));
// console.log(...vs1.users);

console.log(vs1.addProduction(pr1));
console.log(vs1.addActor(a1));