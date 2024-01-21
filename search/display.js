"use strict";

let index;
let pageCount;
let currentList;
let indexIncrement = 8;
let currentEntry;

/*
DISPLAY ACTOR
Displays actor info
O(n)
*/
function DisplayActor(id){
  let actor = database.get(id);
  currentEntry = id;

  //Basic HTML
  document.getElementById("path").classList.add("hidden");
  document.getElementById("table").classList.add("hidden");
  document.getElementById("display").classList.remove("hidden");
  document.getElementById("entries").classList.remove("hidden");
  document.getElementById("kevin").classList.add("hidden");
  document.getElementById("user").classList.add("hidden");

  //Calculate Average
  let total = 0;
  for(let i = 0; i < actor.movies.length; i++){
    total += Number(database.get(actor.movies[i]).rating)
  }

  CheckFavorite(id);
  document.getElementById("name").innerHTML = actor.name;
  document.getElementById("id").innerHTML = id;

  let averageRating = Math.round((total / actor.movies.length)*100) / 100;
  document.getElementById("entryData").innerHTML = `Average Movie Rating: ${averageRating}`;
  
  //Display movies
  index = 0;
  pageCount = 1;
  currentList = actor.movies;
  DisplayElements(); //display the actor's movies
}

/*
DISPLAY MOVIE
display movie info
O(1)
*/
function DisplayMovie(id){
  let movie = database.get(id);
  currentEntry = id;

  //Basic HTML
  document.getElementById("path").classList.add("hidden");
  document.getElementById("table").classList.add("hidden");
  document.getElementById("display").classList.remove("hidden");
  document.getElementById("entries").classList.remove("hidden");
  document.getElementById("kevin").classList.add("hidden");
  document.getElementById("user").classList.add("hidden");

  CheckFavorite(id);
  document.getElementById("name").innerHTML = movie.name;
  document.getElementById("entryData").innerHTML = `Released: ${movie.releaseDate}<br>Rating: ${movie.rating}&#9733 with ${movie.votes} votes.`;
  document.getElementById("id").innerHTML = id;
  
  //Display movies
  index = 0;
  pageCount = 1;
  currentList = movie.actors;
  DisplayElements(); //display movies list
}

/*
DISPLAY ELEMENTS
Displays the actor/movie's actors/movies.
O(n)
*/
function DisplayElements(){
  const elements = [];
  for(let i = 0; i < indexIncrement; i++){
    elements[elements.length] = document.getElementById(`entry${i}`);
    elements[i].classList.add("hidden");
  }
  for(let i = 0; i < indexIncrement; i++){
    if(i+index >= currentList.length){
      break;
    }
    elements[i].innerHTML = `${database.get(currentList[i+index]).name}`;
    elements[i].classList.remove("hidden");
  }
}

/*
CHANGE PAGE
changs index depending on the page
O(1)
*/
function ChangePage(increment){
  if(index+indexIncrement*increment < 0 || index+indexIncrement*increment >= currentList.length){
    return;
  }
  index+=indexIncrement*increment;
  pageCount += increment;
  DisplayElements();
}

/*
ENTRY CLICK
Displays the actor or movie page if you click on that entry
O(1)
*/
function EntryClick(click){
  Search(currentList[index+click]);
}

function DisplaySearch2(){
  document.getElementById("search").classList.remove("hidden");
  document.getElementById("display").classList.add("hidden");
  document.getElementById("user").classList.add("hidden");
  document.getElementById("kevin").classList.add("hidden");
  document.getElementById("table").classList.add("hidden");
}

/*
CHECKFAVORITE
checks if this entry is favorited by the user. This is to make sure the button's HTML is right
O(n)
*/
function CheckFavorite(id){
  if(currentUser != undefined){
    document.getElementById("star").classList.remove("hidden")
    if(currentUser.hasFilm(id) != undefined || currentUser.hasActor(id) !=undefined){
      document.getElementById("star").innerHTML = "Unfavorite";
    }else{
      document.getElementById("star").innerHTML = "Favorite";
    }
  }else{
    document.getElementById("star").classList.add("hidden")
  }
  
}