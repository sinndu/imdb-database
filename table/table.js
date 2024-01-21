"use strict"

let top100 = [];
let bottom100 = [];
let table;
let entries = [];
let tableIndex = 0;
let tablePageCount = 0;
let sortType;
let timeout;
let reverse = false;


/*
INITTABLE
Sets up the HTML table for columns and rows because a 100x7 table in the index.html would be weird
O(n^2)
*/
function InitTable() {
  table = document.getElementById("table2")
  for (let i = 1; i < 101; i++) {
    let row = table.insertRow(i);

    for (let j = 0; j < 7; j++) {
      row.insertCell(j);
    }
  }

  InitTop100(); //Inits the top and bottom 100 for filter display
}

/*
DISPLAYFILTER
displays the filter selected from the top/bottom100 arrays stored
*/
function DisplayFilter(index) {
  let start = performance.now();

  //check if this filter is already selected. If so, reverse it (array isn't reversed just a boolean that changes future code)
  if(sortType == index){
    reverse = !reverse;
  }
  
  sortType = index;
  tableIndex = 0;
  tablePageCount = 0;
  document.getElementById("path").classList.add("hidden");
  document.getElementById("table").classList.remove("hidden");
  document.getElementById("display").classList.add("hidden");
  document.getElementById("entries").classList.add("hidden");
  document.getElementById("kevin").classList.add("hidden");
  document.getElementById("user").classList.add("hidden");
  document.getElementById("profile").classList.add("hidden");
  document.getElementById("tablePageCount").innerHTML = `Page: ${tablePageCount+1}`;

  //display the top 100 or bottom 100 depending if the display is meant to be reversed or not.
  if(!reverse){
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].cells[0].innerHTML = top100[index][i - 1][0];
      table.rows[i].cells[1].innerHTML = top100[index][i - 1][1];
      table.rows[i].cells[2].innerHTML = top100[index][i - 1][2];
      table.rows[i].cells[3].innerHTML = top100[index][i - 1][3];
      table.rows[i].cells[4].innerHTML = top100[index][i - 1][4];
      table.rows[i].cells[5].innerHTML = top100[index][i - 1][5];
      table.rows[i].cells[6].innerHTML = top100[index][i - 1][6];
    }
  }else{
    for(let i = 1; i < table.rows.length; i++){
      table.rows[i].cells[0].innerHTML = bottom100[index][i - 1][0];
      table.rows[i].cells[1].innerHTML = bottom100[index][i - 1][1];
      table.rows[i].cells[2].innerHTML = bottom100[index][i - 1][2];
      table.rows[i].cells[3].innerHTML = bottom100[index][i - 1][3];
      table.rows[i].cells[4].innerHTML = bottom100[index][i - 1][4];
      table.rows[i].cells[5].innerHTML = bottom100[index][i - 1][5];
      table.rows[i].cells[6].innerHTML = bottom100[index][i - 1][6];
    }
  }

  //Merge sorts the data into that filter (on a delay so that html can load)
  clearTimeout(timeout)
  timeout = setTimeout(function() {
    MergeSort(entries, index);
  }, 10)

  document.getElementById("time").innerHTML = "Filter Time: " + String(performance.now() - start) + "ms";
}

/*
INITTOP100
Merge sorts the data for each of the 7 catergories and stores the top/bottom 100. This lets filtering be fast since the top/bottom 100 is already stored and the merge sort can then happen in the background.
O(n^2)
*/
function InitTop100() {
  for(let i = 0; i < 7; i++){
    MergeSort(entries, i);
    let temp = [];
    let temp2 = [];
    for(let j = 0; j < 100; j++){
      push(temp, entries[j]);
      push(temp2, entries[entries.length-1-j]);
    }
    push(top100, temp);
    push(bottom100, temp2);
  }
}

/*
MERGE AND MERGESORT
merge sort
O(nlogn)
*/

function Merge(left, right, arr, index) {
  let i = 0;
  let j = 0;

  for (let k = 0; k < arr.length; k++) {
    if (i === left.length) {
      arr[k] = right[j];
      j++;
    } else if (j === right.length) {
      arr[k] = left[i];
      i++;
    } else if (isNaN(Number(left[i][index])) && left[i][index].localeCompare(right[j][index]) === -1) {
      arr[k] = left[i];
      i++
    } else if(!isNaN(Number(left[i][index])) && Number(left[i][index]) < Number(right[j][index])){
      arr[k] = left[i];
      i++
    }
    else {
      arr[k] = right[j];
      j++;
    }
  }

  return arr;
}

function MergeSort(arr, index) {
  if (arr.length === 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);
  let left = slice(arr, 0, mid);
  let right = slice(arr, mid, arr.length);

  left = MergeSort(left, index);
  right = MergeSort(right, index);

  return Merge(left, right, arr, index);
}


/*
CHANGETABLEPAGE
Changing the index of the table
O(1)
*/
function ChangeTablePage(increment) {
  if (tableIndex + 100 * increment < 0 || tableIndex + 100 * increment >= entries.length) {
    return;
  }
  tableIndex += 100 * increment;
  tablePageCount += increment;
  document.getElementById("tablePageCount").innerHTML = `Page: ${tablePageCount + 1}`;

  SortedDisplay();
}

/*
SORTEDDISPLAY
Displays the merge sort data
O(n^2)
*/
function SortedDisplay() {
  let start = performance.now();

  if(!reverse){
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].cells[0].innerHTML = entries[i + tableIndex - 1][0];
      table.rows[i].cells[1].innerHTML = entries[i + tableIndex - 1][1];
      table.rows[i].cells[2].innerHTML = entries[i + tableIndex - 1][2];
      table.rows[i].cells[3].innerHTML = entries[i + tableIndex - 1][3];
      table.rows[i].cells[4].innerHTML = entries[i + tableIndex - 1][4];
      table.rows[i].cells[5].innerHTML = entries[i + tableIndex - 1][5];
      table.rows[i].cells[6].innerHTML = entries[i + tableIndex - 1][6];
    }
  }
  else{
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].cells[0].innerHTML = entries[191873 - i - tableIndex - 1][0];
      table.rows[i].cells[1].innerHTML = entries[191873 - i - tableIndex - 1][1];
      table.rows[i].cells[2].innerHTML = entries[191873 - i - tableIndex - 1][2];
      table.rows[i].cells[3].innerHTML = entries[191873 - i - tableIndex - 1][3];
      table.rows[i].cells[4].innerHTML = entries[191873 - i - tableIndex - 1][4];
      table.rows[i].cells[5].innerHTML = entries[191873 - i - tableIndex - 1][5];
      table.rows[i].cells[6].innerHTML = entries[191873 - i - tableIndex - 1][6];
    }
  }
  document.getElementById("time").innerHTML = "Index Time: " + String(performance.now() - start) + "ms";
}