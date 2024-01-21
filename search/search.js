"use strict";

let start = null;
let searchActor = [];
let searchMovie = [];

/*
SEARCH
Checks if the input is already in the database with one value. If so, display that entry. Else, then display the search results of that input.
O(1)
*/
function Search(input) {

  let searchTime = performance.now();

  if (input == null) {
    input = document.getElementById("searchBar").value;
  }
  
  //Check if value exists in the database, if it does, then just display that entry
  if (database.get(input) != undefined) {
    //Actor
    if (input.slice(0, 2) === "nm") { //NOT ARRAY ITS A STRING!
      DisplayActor(input);
    }
    else {
      DisplayMovie(input);
    }
  }
  else {
    //Check if that input is in the ID hashmap. If there's only one entry, just display it.
    input = StripString(input)
    if (ids.get(input) != undefined && ids.get(input).length === 1 && StripString(database.get(ids.get(input)[0]).name) == input && input != "") {
      Search(ids.get(input)[0]);
    }
    else {
      //Else, link to the Search display
      DisplaySearch(input)
    }
  }

  document.getElementById("time").innerHTML = "Search Time: " + String(performance.now() - searchTime) + "ms";
}

/*
DISPLAYSEACH
Displays the search results from the ID hashmap
O(n)
*/
function DisplaySearch(input) {

  input = StripString(input);

  let results = null
  if (ids.get(input) != undefined) {
    results = ids.get(input)
    console.log(results)
  }
  else {
    return;
  }

  searchActor = [];
  searchMovie = [];

  for (let i = 0; i < results.length; i++) {
    if (results[i].slice(0, 2) === "nm") { //still a string nto an array method
      searchActor[searchActor.length] = results[i];
    }
    else {
      searchMovie[searchMovie.length] = results[i];
    }
  }

  //Basic HTML
  document.getElementById("table").classList.add("hidden");
  document.getElementById("display").classList.add("hidden"); 
  document.getElementById("entries").classList.remove("hidden");
  document.getElementById("entries").classList.remove("hidden");
  document.getElementById("kevin").classList.add("hidden");
  document.getElementById("entryName").innerHTML = "Actors (Click for Movies)";
  document.getElementById("profile").classList.add("hidden");
  document.getElementById("user").classList.add("hidden");
  document.getElementById("path").classList.add("hidden");

  //Display movies
  index = 0;
  pageCount = 1;
  currentList = searchActor;
  DisplayElements();
  console.log(performance.now() - start);
}

/*
TOGGLESEARCH TYPE
changes the filter from showing movies to actors to movies to actors etc etc
also does the same thing for the profile page
*/
function ToggleSearchType() {
  if (currentList == searchActor) {
    currentList = searchMovie;
    document.getElementById("entryName").innerHTML = "Movies (Click for Actors)";
  }
  else if (currentList == searchMovie) {
    currentList = searchActor;
    document.getElementById("entryName").innerHTML = "Actors (Click for Movies)";
  }
  else if(currentList == currentUser.favoriteActors){
    currentList = currentUser.favoriteMovies;
    document.getElementById("entryName").innerHTML = "Movies (Click for Actors)";
  }
  else if(currentList == currentUser.favoriteMovies){
    currentList = currentUser.favoriteActors;
    document.getElementById("entryName").innerHTML = "Actors (Click for Movies)";
  }
  
  index = 0;
  pageCount = 1;
  DisplayElements();
}