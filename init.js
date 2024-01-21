"use strict";

//Initalize Hashmaps that are used to store all the Actor and Movie data, used across the entire site.
const database = new Map();
const ids = new Map();

//Load and initalize the data
let loadTime = performance.now();
const data = loadJSON('./DO_NOT_TOUCH/data.json'); //Don't delete this line. All your data is here. It does take a few seconds for Replit to load the data because it's so large.
console.log(data);
Initalize();
InitTable();
document.getElementById("time").innerHTML = "Load Time: " + String(performance.now() - loadTime) + "ms";


/*
INITALIZE
Puts all entries into a 2D entry array for ease of access
Checks if the movie/actor for every entry is in the database. If so, simply add the movie/actor to that object's entry array. Else, create a new object and insert it into  the hashmap.
O(n)
*/
function Initalize() {

  for (let i = 0; i < data.actorID.length; i++) {
    entries.push([data.actorID[i], data.actorName[i], data.filmID[i], data.filmName[i], data.rating[i], data.votes[i], data.yearReleased[i]])
    /*
    ACTORS
    If actor isn't in the database, create an entry for them using their ID
    Else, add the movie this entry is for in their movies list
    */
    if (database.get(data.actorID[i]) === undefined) {
      const actor = new Actor(data.actorID[i], data.actorName[i])
      actor.movies[actor.movies.length] = data.filmID[i]
      database.set(data.actorID[i], actor);
      
      IDHASH(data.actorName[i], data.actorID[i]); //Hash this actors name into the ID hash database
    }
    else {
      const actor = database.get(data.actorID[i]);
      actor.movies[actor.movies.length] = data.filmID[i];
    }

    /*
    MOVIES
    If a movie isn't in the database, create and entry for it using it's ID
    Else, add the actor this entry is for in their actor list
    */
    if (database.get(data.filmID[i]) === undefined) {
      const movie = new Movie(data.filmID[i], data.filmName[i], data.rating[i], data.votes[i], data.yearReleased[i])
      movie.actors[movie.actors.length] = data.actorID[i];
      database.set(data.filmID[i], movie)
      
      IDHASH(data.filmName[i], data.filmID[i]); //Hash this movie's name into the ID hash database

      //Hash this movie's year into the ID database
      if (ids.get(data.yearReleased[i]) === undefined) {
        ids.set(data.yearReleased[i], [data.filmID[i]])
      }
      else {
        ids.get(data.yearReleased[i])[ids.get(data.yearReleased[i]).length] = data.filmID[i];
      }

    }
    else {
      const movie = database.get(data.filmID[i]);
      movie.actors[movie.actors.length] = data.actorID[i];
    }
  }
}

/*
IDHASH
Seperates an actor/movie name into seperate words and puts it into the ID hashmap. This is used so that searching individual words will show up in search.
O(n^2)
*/
function IDHASH(input, id) {
  input = input.toString();
  input = StripString(input)
  input = input.toLowerCase();

  const words = input.split(" ");
  const wordsDone = new Set(); //makes sure words dont repeat (ie. Evangelion: End of Evangelion has EVANGELION twice.)

  if (words.length > 1) {
    for (let i = 0; i < words.length; i++) {
      const hash = words[i]
      if(hash != ""){      

        //Check that this word hasn't been inserted already
        if(wordsDone.has(hash)){
          return;
        }else{
          wordsDone.add(hash)
        }
  
        if (ids.get(hash) === undefined) {
          ids.set(hash, [id])
        }
        else {
          ids.get(hash)[ids.get(hash).length] = id;
        }
      }

    }
  }

  //Adding the full name
  if (ids.get(input) === undefined) {
    ids.set(input, [id])
  }
  else {
    ids.get(input)[ids.get(input).length] = id
  }
}

/*
STRIPSTRING
Strips a string of a lot of stuff so everything in the ID hash is clear !!!
O(n) <- string.toLowerCase and probably replace too.
*/
function StripString(string) {
  string = string.replace(/[.,\/#!$%\^\*;:{}=\_`~()]/g, "")
  string = string.toLowerCase();
  return string;
}


