"use strict"
let frontier = [];
let explored = new Set();

/*
DISPLAYKEVIN
html changes
O(1)
*/
function DisplayKevin(){
  document.getElementById("table").classList.add("hidden");
  document.getElementById("display").classList.add("hidden");
  document.getElementById("entries").classList.add("hidden");
  document.getElementById("user").classList.add("hidden");
  document.getElementById("profile").classList.add("hidden");
  document.getElementById("kevin").classList.remove("hidden");
  document.getElementById("path").classList.remove("hidden");
}

/*
KEVINBACON
Gets the input from the text boxes and starts the recursion. After it's found a path, display it.
*/
function KevinBacon(){
  document.getElementById("path").classList.remove("hidden");
  let actor1 = StripString(document.getElementById("kevinBar").value);
  let actor2 = StripString(document.getElementById("kevinBar2").value);

  //Finding actor id based on input if it's a full name.
  if(database.get(actor1) === undefined){
    if(ids.get(actor1) != undefined && ids.get(actor1).length == 1){
      actor1 = ids.get(actor1)[0];
    }else{
      return;
    }
  }

  if(database.get(actor2) === undefined){
    if(ids.get(actor2) != undefined && ids.get(actor2).length == 1){
      actor2 = ids.get(actor2)[0];
    }else{
      return;
    }
  }

  frontier = [];
  explored.clear();
  let path = recurse([["", actor1]], actor2); //get the path!!!
  console.log(path)

  //rest of this is ltierally jsut html stuff dont worry about it.
  let ans = document.getElementById("path");
  ans.innerHTML = "";

  let start = document.createElement("div")
  start.appendChild(document.createTextNode(database.get(path[0][1]).name))
  start.classList.add("box")
  ans.appendChild(start);

  for(let i  = 1; i < path.length; i++){
    let arrow = document.createElement("div");
    arrow.appendChild(document.createTextNode(">"));
    arrow.classList.add("box");
    ans.appendChild(arrow);
    
    let div =document.createElement("div");
    div.appendChild(document.createTextNode(database.get(path[i][1]).name + " in " +  database.get(path[i][0]).name))
    div.classList.add("box")
    ans.appendChild(div);
  }

  document.getElementById("count").innerHTML = `Count: ${path.length-1}`

  
  // ans.innerHTML = "";
  // ans.innerHTML += database.get(actor1).name + " -> "
  // for(let i = 1; i < path.length-1; i++){
  //   ans.innerHTML += database.get(path[i][1]).name + " in " +  database.get(path[i][0]).name + " -> ";
  // }
  // ans.innerHTML += database.get(path[path.length-1][1]).name + " in " +  database.get(path[path.length-1][0]).name;
}

/*
RECURSE
bfs
takes the first actor and checks if the actors in any of its movies is the target actor. If not, then add those actors to the frontier to check
O(n+m)
*/
function recurse(path, target){
  while(true){  
    let actor = database.get(path[path.length-1][1]);
  
    for(let i = 0; i < actor.movies.length; i++){
      let movie = database.get(actor.movies[i]);
  
      for(let j = 0; j < movie.actors.length; j++){
        if(movie.actors[j] == target){
          push(path, [movie.id, movie.actors[j]])
          return path;
        }else{
          if(!explored.has(movie.actors[j])){
            explored.add(movie.actors[j])
            let temp = JSON.parse(JSON.stringify(path));
            push(temp,[movie.id, movie.actors[j]])
            push(frontier, temp);
          }
        }
      }
    }
    path = shift(frontier);
  }
}




// function recurse(path, target){
//   let counter = 0;
//   while(true){
//     let actor = database.get(path[path.length-1]);
  
//     if(actor.name === target.name){
//       console.log(counter)
//       return path;
//     }
  
//     for(let i = 0; i < actor.movies.length; i++){
//       let movie = database.get(actor.movies[i]);
//       for(let j = 0; j < movie.actors.length; j++){
//         if(BinarySearch(movie.actors[j], explored) === undefined){
//           inputExplored(movie.actors[j], explored)
//           let temp = [...path];
//           temp.push(movie.actors[j])
//           frontier.push(temp);
//         }else{
//           counter++;
//         }
//       }
//     }
//     path = frontier.shift();
//   }
// }

// function BinarySearch(target, arr){
//   let L = 0;
//   let R = arr.length - 1;

//   while (L <= R) {
//     let M = Math.floor((L + R) / 2);

//     if (arr[M].localeCompare(target) == -1) {
//       L = M + 1;
//     } else if (arr[M].localeCompare(target) == 1) {
//       R = M - 1;
//     } else{
//       return M;
//     }
//   }
// }

// function inputExplored(target, arr){

//   if(target.localeCompare(arr[0]) == 1){
//     arr.unshift(target);
//   }
//   else if(target.localeCompare(arr[arr.length-1]) == -1){
//     arr.push(target);
//   }
  
//   for(let i = 0; i < arr.length; i++){
//     if(target.localeCompare(arr[i-1]) == 1 && target.localeCompare(arr[i+1]) == -1){
//       arr.splice(i,0,target);
//       return;
//     }
//   }
// }