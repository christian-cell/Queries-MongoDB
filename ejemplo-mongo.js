// use movies
// show 

db.movies.insertMany([
    { title:"Fight Club" , writer:"Chuck Palaniuk" , year:1989 , actors:["Brad Pitt" , "Edward Norton"]},
    { title:"Chacal" , writer:"Bruce Linux" , year:2002 , actors:["Bruce willish" , "Richard Gare"]},
    { title:"Caza al terrorista" , writer:"Lendsey Hadway" , year:1995 , actors:["Tom larson" , "Stephany loutery"]},
    { title:"The Gremlings" , writer:"Robertson" , year: 1990 , actors:["Rott Hermes" , "Linkon"]},
    { title:"Toy Stories" , writer:"Luccila Coppledlly" , year:2001 , actors:["Tom lee" , "Lina Karad"]},
    { title:"Anaconda" , writer:"María De La Hoya" , year: 1988 , actors:["Aledd Walding" , "Elisa Carpetana"],franchise:"En un vuelo en el que viajan más de 399 personas se llena misteriosamente de serpientes en mitad del océano" },
    { title:"James Bond" , writer:"Tom Polansky" , year:1999 , actors:["Pierce Brosnan" , "Erika Alled"] , synopsis:"El agente 007 del MI6 se enfrentará a peligrosos terroristas haciéndoles creer que están en el mismo bando" },
    { title:"Pulp Fiction" , writer:"Quentin Tarantino" , year:1999 , actors:["Jhon Travolta" , "Uma Thurman"]},
    { title:"Inglorius Bastards" , writer:"Quentin Tarantino" , year:2009 , actors:["Brad Pitt" , "Diane Krugger","Eli Root"]},
    { title:"The Hobbit" , writer:"J.R.R Tolkien" , year:2013 , franchise:"The hobbit" },
    { title:"The Hobbit" , writer:"J.R.R Tolkien" , year:2014 , synopsis:"El hobbit Frodo Bolson se enfrentará a muchos enemigos en su busqueda por el anillo"}
]
)

// muestra todas las entradas de la coleccion movies con pretty()
db.movies.find({})

//mostrar las peliculas cuyo escritor sea Quentin Tarantino
db.movies.find({writer:"Quentin Tarantino"}).pretty();

//mostrar todas las peliculas en las que actue Brad Pitt
db.movies.find({actors:"Brad Pitt"},{title:1 , _id:0}).pretty()

//mostrar todas las peliculas cuyo titulo contenga The hobbit
db.movies.find({franchise:"The hobbit"}, {title:1  , _id:0})

//mostrar todas las películas que hayan sido hechas en el año 1990
db.movies.find({year:1990}, {title:1 , _id:0}).pretty()

//mostrar todas las películas con su año que hayan sido hechas en la decada de los 90s
db.movies.find({ year:{$gte:1990 , $lte:2000} } , { title:1 ,year:1, _id:0 } )

//mostrar las películas hechas entre el año 1995 y el año 2001
db.movies.find({ year:{$gte:1995 , $lte:2001} } , { title:1 , _id:0 })

//vamos a añadir una propiedad de fecha a ciertas películas , no la fecha en la que fué hecha si no la fecha de entrada
//en la base de datos , tan solo aquellas en las que el autor sea Quentin Tarantino
db.movies.updateMany({writer:"Quentin Tarantino"}, { $set: {f_revision: new Date()} })

//vamos a quitarle una propiedad a un documento en concreto , por ejemplo a quitarle la f_revision a las anteriores
db.movies.updateMany(
    {} , {$unset:{"f_revision":""}}
)

//para actualizar alguna de las entradas vamos a añadir una propiedad synopsis a aquellas que hayan sido hechas
//a posteriori o igual al 2000
db.movies.updateMany(
    {year:{$gte:2000}},
    {$set:{synopsis:"sinopsis cambiada"}}
)

//vamos a borrar una entrada en concreto: aquella en la que el título sea Pulp Fiction
db.movies.deleteMany(
    { title:"Pulp Fiction" }
)

//para encontrar todos y que me los muestre por alguna propiedad en concreto;
db.movies.find(
    {},
    { title:1 , _id:0 }
)


//vamos a actualizar el valor de la propiedad synopsis al documento con título : "The Hobbit"
db.movies.updateMany(
    { title:"The Hobbit" },
    { $set: {synopsis: "A frodo le persiguen y logra escapar"} }
)

//añade una propiedad directores con el valor directores conocidos despues del 2000 a todas aquellas películas
//que hayan sido hechas a posterior del 2000
db.movies.updateMany(
    { year:{$gte:2000} },
    { $set: {directores:"directores conocidos a posterior del año 2000"} }
)

//añade una propiedad directores con un valor "directores conocidos después del 2014 " en todos aquellos documentos
// en el que el "year" sea superior o igual a 2104
db.movies.updateMany(
    { year:{$gte:2014} },
    { $set: { directores:"directores conocidos después del 2014" } }
)

//vamos a remplazar el valor de la propiedad actors de la película chacal por Bruce en vez de Bruce Willis
// ************************** si nos fijamos bien al usar el método replaceOne no solo cambia 
//la propiedad indicada del documento
//si no que también elimina el resto asi que en el replaceOne tenemos que volver a escribir de nuevo todas las
//propiedades*************************************************+
db.movies.replaceOne(
    { title:"Chacal" },
    { actors:"Bruce" }
)

//ya hemos usado $gte y $lte vamos a usar tan solo $eq : equal , para encontrar aquella película cuyo año sea igual
//a 2013 , como vemos es una manera distinta de realizar la query asi que veremos la LATENCIA DE TIEMPO
//para ver cual nos interesa más
db.movies.find(
    { year:{$eq:2013} }
)
 
//encontrar todas las películas que no hayan sido hechas en el año 2013
db.movies.find(
    { year:{$ne: 2013}},
    {title:1 , _id:0 , year:1}
)

//encuentra todas las películas que sean de un año igual o superior 1995 
db.movies.find(
    { year:{$gte:1995} },
    {title:1 , year:1 , _id:0}
)

//encuentra todas las películas que han sido hechas antes del 2009
db.movies.find(
    { year:{ $lte: 2009 } },
    { title: 1 , year:1 , _id:0 }
)

//encuentra todas las películas que hayan sido hechas entre el año 2012 y el año 2014
db.movies.find(
    { year: {$gte:2012, $lte: 2014} },
    { title:1 , year:1 , _id:0 }
)

//encuentra todas las películas hechas entre el 2012 y el 2014 excluyendo ambos
db.movies.find(
    { year:{$gt:2012, $lt:2014} },
    {title:1 , year:1 , _id:0}
)

//OPERADOR "$in" , cuando queremos por ejemplo saber las películas hechas o en un año o en otro pero no entre medias
//el tipo de dato que espera el operador $In es un array ya que le vamos a pedir que busque entre 2 o mas valores
db.movies.find(
    { year:{$in:[1990 , 2010]} },
    {title:1 , year:1 , _id:0}
)

//lo mismo pero cuando queremos que encuentre todas las que no fueron hechas en una año determinado o en otro
//en este caso en concreto le pedimos todas las películas que no hayan sido hechas en el 1990 o en el 2010 con $nin
db.movies.find(
    {year:{$nin:[1990 , 2010]}},
    { title:1 , year:1 , _id:0 }
)

//OPERADORES DE PERTENENCIA
//vamos a añadir una propiedad llamada rates a aquellas películas hechas entre el 2013 y el 2014 ambos incluidos
//DE NUEVO hay una manera alternativa asi que toca ver cual de las dos tiene mejor ĹATENCIA
db.movies.updateMany(
    { year:{$gte:2013 , $lte:2014} },
    {$set:{rates:"5 estrellas"}}
)

db.movies.updateMany(
    { year:{$in:[2013 , 2014]} },
    {$set : {opiniones: "5 estrellas"}}
)

//VAMOS con los filtros EXISTS , TYPE , REGEX  , con estos podemos encontrar por cualquier propiedad señalando el valor o
//parte del valor que contiene esa propiedad , TIPO de la propiedad ...

//en este ejemplo nos traemos todos los documentos en los que contiene una propiedad rates
db.movies.find(
    {"rates":{$exists:true}}
).pretty()

//con false también nos podemos traer todos aquellos documentos que no tengan una propiedad llamada rates
db.movies.find(
    { "rates": {$exists:false} }
).pretty()

//TYPE nos permite filtrar por el tipo de dato : string , boolean...
db.movies.find(
    {
        rates:{$type:"string"}
    }
).pretty()

//filtros REGEX
//retorna todos los documentos que tengas como valor de la propiedad writer la "I"
db.movies.find(
    { writer:{$regex:"i"} }
).pretty()

//también con regex podemos especificar en que posición se encuentra la letra por la cual queremos filtrar
db.movies.find(
    { writer:{$regex:"^Q"} }
).pretty()

//podemos decirle también que retorne todas las entradas donde el valor de la propiedad writer termine en o
db.movies.find(
    { writer:{$regex:"o$"} }
).pretty()

//devuelve todos aquellos que tenga una "R" en el valor de la propiedad writer
db.movies.find(
    { writer:{$regex:/R/} }
).pretty()


//OPERADORES LOGICOS : or , and ,not, nor
//vamos con el or: en este caso como vamos a darle varios parámetros de busqueda vamos a meterlos en un array
//le decimos que busque todos aquellos documentos con year  menor a 2010 o writer : "Quentin Tarantino"
db.movies.find(
    {$or:[ {year: {$lt:2010}} , {writer:"Quentin Tarantino"}] }
)
//en este caso con el año 2010 o el writer "Quentin Tarantino"
db.movies.find(
    {$or:[ {year: {$eq:2010}} , {writer:"Quentin Tarantino"}] }
)


//retorna los documentos que contengan las siguientes condiciones: año 2009 y director "Quentin Tarantino"
db.movies.find(
    {$and: [ {year:2009} , {writer:"Quentin Tarantino"} ]}
).pretty()

//vamos con el not , osea aquellos documentos que no cumplan con una condición u otra
//devuelve todos los documentos que no tengan una fecha menor a 2013
db.movies.find(
    {year:{$not: {$lt:2013}}}
).pretty()

//OPERADOR NOR en para todas aquellas que no cumplan ni una condición o la otra , como hay varias
//condiciones , estás las metemos dentro de un array de objetos que serán las condiciones
//en este caso le decimos devuelve todos aquellos documentos que no tengan un year : 2013 ni un writer: "Quentin Tarantino"
db.movies.find(
    {$nor: [{ year:2013 } , {writer:"Quentin Tarantino"}]}
).pretty()



// db.movies.insertMany([
//     {title:"Fight Club",writer:"Chuck Palahniuk",year:1989,actors:["Brad Pitt","Edward Norton"]},
//     {title:"Pulp Fiction",writer:"Quentin Tarantino",year:1999,actors:["Jonh Travolta","Uma thurman"]},
//     {title:"Inglorius Bastards",writer:"Quentin Tarantino",year:2009,actors:["Brad Pitt","Diane Kruger","Eli Roth"]},
//     {title:"The Hobbit:An Unxpected Journey",writer:"J.R.R Tolkien",year:2012,franchise:"the hobbit"},
//     {title:"The Hobbit",writer:"J.R.R Tolkien",year:2013,franchise:"the hobbit"},
//     {title:"The Hobbit",writer:"J.R.R Tolkien",year:2014,franchise:"the hobbit",synopsis:"Bilbo and Company are forced to engage in a war against an array of combatants and keepthe Lonely Mountain from falling into the hands of a rising darkness"},
//     {title:"Pee Wee Herman's Big Adventures"},
//     {title:"Avatar"},
// ])