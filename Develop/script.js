// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let events = {...localStorage};
let buttons = document.querySelectorAll(".saveBtn");
let dayEl = $("#currentDay");
let timeBlocks = document.querySelectorAll(".time-block");
let clearBtn = $("#clearBtn");

const saveEvent = (event) => {
  let block = event.target.parentElement;
  if(block.children[1]===undefined){
    return;
  }
    localStorage.setItem(block.id, block.children[1].value);
  
}

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  clearBtn.on("click", () => {
    localStorage.clear();
    location.reload();
  });

  for(let x=0;x<buttons.length;x++){
    buttons[x].addEventListener("click", saveEvent);
  }
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  for(let x=0; x<timeBlocks.length;x++){
    let time = dayjs().$H;
    let timeBlockTime = Number(timeBlocks[x].attributes[1].nodeValue);

    if(timeBlockTime<time){
      timeBlocks[x].className = "row time-block past";
    } else if(timeBlockTime===time){
      timeBlocks[x].className = "row time-block present";
    } else {
      timeBlocks[x].className = "row time-block future";
    }

  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for(let x=0;x<localStorage.length;x++){
    let timeID = "#" +  localStorage.key(x);

    let timeblock = $(timeID).children();
    timeblock[1].value = localStorage.getItem(localStorage.key(x));
  }
  // TODO: Add code to display the current date in the header of the page.
  dayEl.text(dayjs().format("MMMM DD, YYYY"));
});
