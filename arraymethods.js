//some bootleg arrayy methods for that 4+!!!!

// isnt really necessary but its easier for me to write
function push(arr, input){
  arr[arr.length] = input;
}

function shift(arr){
  let temp = arr[0]
  for(let i = 0; i < arr.length-1; i++){
    arr[i] = arr[i+1];
  }
  arr.length--;
  return temp;
}

//removes element
function removeElement(arr, index){
  for(let i = index; i < arr.length-1; i++){
    arr[i] = arr[i+1];
  }
  arr.length--;
}

function slice(arr, start, end){
  let temp = [];
  for(let i = start; i < end; i++){
    temp[temp.length] = arr[i];
  }
  return temp;
}