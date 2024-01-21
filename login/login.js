const users = new Map();
let currentUser;

/*
SIGNUP
if user clicks sign up, check if this is a valid username/password to sign up and if so, then make a new user
O(1)
*/
function SignUp(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let error = document.getElementById("error")
  error.innerHTML = "";

  if(users.get(username) === undefined){
    users.set(username, new User(password));
    error.innerHTML = "signed up!"
  }else{
    error.innerHTML = "a user by that username already exists"
  }
}

/*
LOGIN
same as sign up basically, check if valid login and if so login.
O(1)
*/
function Login(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let error = document.getElementById("error");

  if(users.get(username) === undefined){
    error.innerHTML = "a user by that username does not exist";
    return;
  }

  if(users.get(username).password === password){
    currentUser = users.get(username);
    document.getElementById("usernameCool!").innerHTML = "user: " + username;
    document.getElementById("user").classList.add("hidden")
    document.getElementById("displayLogin").classList.add("hidden")
    document.getElementById("displayProfile").classList.remove("hidden")
    error.innerHTML = "logged in!"
    return;
  }

  error.innerHTML = "incorrect password!"
}

/*
DISPLAY LOGIN AND DISPLAY PROFILE
changes html stuff
O(1)
*/
function DisplayLogin(){
  document.getElementById("user").classList.remove("hidden")
  document.getElementById("entries").classList.add("hidden")
  document.getElementById("display").classList.add("hidden")
  document.getElementById("kevin").classList.add("hidden")
  document.getElementById("path").classList.add("hidden")
  document.getElementById("table").classList.add("hidden")
  document.getElementById("profile").classList.add("hidden");
}

function DisplayProfile(){
  document.getElementById("profile").classList.remove("hidden")
  document.getElementById("entries").classList.remove("hidden")
  document.getElementById("display").classList.add("hidden")
  document.getElementById("kevin").classList.add("hidden")
  document.getElementById("table").classList.add("hidden")
  document.getElementById("path").classList.add("hidden")

  currentList = currentUser.favoriteActors
  DisplayElements();
  document.getElementById("entries").classList.remove("hidden")
}

/*
FAVORITE
check if this is already favorited. If not, add it to favorites, else, remove from favorites.
*/
function Favorite(){

  if(currentEntry[0] === "n"){
    let has = currentUser.hasActor(currentEntry)
    
    if(has == undefined){
      push(currentUser.favoriteActors, currentEntry);
      document.getElementById("star").innerHTML = "Unfavorite";
    }else{
      removeElement(currentUser.favoriteActors, has)
      document.getElementById("star").innerHTML = "Favorite";
    }
  }else{
    let has = currentUser.hasFilm(currentEntry)
    
    if(has == undefined){
      push(currentUser.favoriteMovies, currentEntry);
      document.getElementById("star").innerHTML = "Unfavorite";
    }else{
      removeElement(currentUser.favoriteMovies, has)
      document.getElementById("star").innerHTML = "Favorite";
    }
  }
  
}


/*
MERGE2 and MERGESORT2
embarrassing code since its a copy of the merge sort from earlier but that one used index since it was using a 2d array and this one isnt using a 2d array and god knows its not worth it at this point to change the ENTIRE array system to NOT use 2d arrays so just a copy and paste works fine its ok god bless!
O(nlogn)
*/
function Merge2(left, right, arr) {
  let i = 0;
  let j = 0;

  for (let k = 0; k < arr.length; k++) {
    if (i === left.length) {
      arr[k] = right[j];
      j++;
    } else if (j === right.length) {
      arr[k] = left[i];
      i++;
    } else if (left[i].localeCompare(right[j]) === -1) {
      arr[k] = left[i];
      i++
    } else {
      arr[k] = right[j];
      j++;
    }
  }

  return arr;
}

function MergeSort2(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);
  let left = slice(arr, 0, mid);
  let right = slice(arr, mid, arr.length);

  left = MergeSort2(left);
  right = MergeSort2(right);

  return Merge2(left, right, arr);
}

function BinarySearch(target, arr){
  let L = 0;
  let R = arr.length - 1;

  while (L <= R) {
    let M = Math.floor((L + R) / 2);

    if (arr[M].localeCompare(target) == -1) {
      L = M + 1;
    } else if (arr[M].localeCompare(target) == 1) {
      R = M - 1;
    } else{
      return M;
    }
  }
}

/*
LOGOUT
html changes!
O(1)
*/
function Logout(){
  currentUser = null;
  document.getElementById("error").innerHTML = "";
  document.getElementById("user").classList.remove("hidden")
  document.getElementById("entries").classList.add("hidden")
  document.getElementById("profile").classList.add("hidden")
  document.getElementById("displayLogin").classList.remove("hidden")
  document.getElementById("displayProfile").classList.add("hidden")
}