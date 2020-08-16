// Updates the page
function render(){

    let toDoFromLocalStorage = JSON.parse(localStorage.getItem("toDo"));
    let finishedFromLocalStorage = JSON.parse(localStorage.getItem("finished"));

    let listToDoParent = document.getElementById("listToDo");
    let listFinishedParent = document.getElementById("listFinished");

    // First remove children to avoid doublets
    while (listToDoParent.hasChildNodes()) {
        listToDoParent.removeChild(listToDoParent.lastChild);
    }
    
    while (listFinishedParent.hasChildNodes()) {
        listFinishedParent.removeChild(listFinishedParent.lastChild);
    }  
    /*
    <tr>
    <th>title</th>
    <th>author</th>
    <th>pages</th>
    <th>genre</th>
    <th>have you red the book yet</th>
  </tr> */
    //Print lists with a loop. Set an array in local storage if they don't exist
    if(toDoFromLocalStorage != null){
        for(let i = 0; i < toDoFromLocalStorage.length; i++){

            let listChildren = "<td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].text + "</td><td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].author + "</td><td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].pages + "</td><td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].genre + "</td><td><input type='checkbox' class='todo' id='todo" + [i] + "' name='todo" + [i] + "'></td>";
    
            listToDoParent.innerHTML += "<td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].text + "</td><td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].author + "</td><td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].pages + "</td><td for='todo" + [i] + "' id='label" + [i] + "'>" + toDoFromLocalStorage[i].genre + "</td><td><input type='checkbox' class='todo' id='todo" + [i] + "' name='todo" + [i] + "'></td>";
    
        }
    }else{
        let toDoList = ["Add to-do 1", "Add to-do 2", "Add to-do 3", "Add to-do 4"];
        localStorage.setItem("toDo", JSON.stringify(toDoList));
        render();
    }

    if(finishedFromLocalStorage != null){
        for(let i = 0; i < finishedFromLocalStorage.length; i++){

            let listChildren = "<td  for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].text + "</td><td for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].author + "</td><td for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].pages + "</td><td for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].genre + "</td><td><input class='finished' type='checkbox' id='finished" + [i] + "' name='finished" + [i] + "'></td>";
    
            listFinishedParent.innerHTML += "<td for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].text + "</td><td for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].author + "</td><td for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].pages + "</td><td for='finished" + [i] + "' id='labelFinished" + [i] + "'>" + finishedFromLocalStorage[i].genre + "</td><td><input class='finished' type='checkbox' id='finished" + [i] + "' name='finished" + [i] + "'></td>";
    
        }
    }else{
        let finished = [];
        localStorage.setItem("finished", JSON.stringify(finished));
        render();
    }

    // Hide or show lists if empty
    if(toDoFromLocalStorage.length === 0){
        document.getElementById("toDoWrapper").style.display = "none";
    }else{
        document.getElementById("toDoWrapper").style.display = "block";
    }

    if(finishedFromLocalStorage.length === 0){
        document.getElementById("finishedWrapper").style.display = "none";
    }else{
        document.getElementById("finishedWrapper").style.display = "block";
    }

    draggableToDoList();

}

function moveFinished(){

    let toDoFromLocalStorage = JSON.parse(localStorage.getItem("toDo"));
    let finishedFromLocalStorage = JSON.parse(localStorage.getItem("finished"));

    for (let i = finishedFromLocalStorage.length - 1; i >= 0; i--){

        let input = document.getElementById("listFinished").getElementsByTagName("input")[i];

        if(input.checked){

            // Moves checked item from finished list to to-do.
            toDoFromLocalStorage = finishedFromLocalStorage.splice([i], 1).concat(toDoFromLocalStorage);
            
        }

    }

    // Update the manipulated arrays to local storage
    localStorage.setItem("toDo", JSON.stringify(toDoFromLocalStorage));
    localStorage.setItem("finished", JSON.stringify(finishedFromLocalStorage));

    render();
    
}

function moveToDo(){

    let toDoFromLocalStorage = JSON.parse(localStorage.getItem("toDo"));
    let finishedFromLocalStorage = JSON.parse(localStorage.getItem("finished"));

    for (let i = toDoFromLocalStorage.length - 1; i >= 0; i--){

        let input = document.getElementById("listToDo").getElementsByTagName("input")[i];

        if(input.checked){

            // Moves checked item from to do list to finished.
            finishedFromLocalStorage = toDoFromLocalStorage.splice([i], 1).concat(finishedFromLocalStorage);
            
        }

    }

    // Update the manipulated arrays to local storage
    localStorage.setItem("toDo", JSON.stringify(toDoFromLocalStorage));
    localStorage.setItem("finished", JSON.stringify(finishedFromLocalStorage));

    render();

}



function addToDo(){

    let toDoLists = JSON.parse(localStorage.getItem("toDo"));
    let text = document.getElementById("createToDo").value;
    let author = document.getElementById("createAuthor").value;
    let pages = document.getElementById("createToPages").value;
    let genre = document.getElementById("genre").value;
    const toDo = {
        text,
        author,
        pages,
        genre
       
      };
    toDoLists.push(toDo);
    localStorage.setItem("toDo", JSON.stringify(toDoLists));
    console.log(toDoLists);

    render();
    
}

function eraseItems(){
    
    let finishedFromLocalStorage = JSON.parse(localStorage.getItem("finished"));

    for (let i = finishedFromLocalStorage.length - 1; i >= 0; i--){

        let input = document.getElementById("listFinished").getElementsByTagName("input")[i];

        if(input.checked){

            finishedFromLocalStorage.splice([i], 1);
            
        }

    }

    localStorage.setItem("finished", JSON.stringify(finishedFromLocalStorage));

    render();

}
function selectall(source) {
    checkboxes = document.getElementsByClassName('todo');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = source.checked;
    }
  }

  function togglethis(source) {
    checkboxes = document.getElementsByClassName('finished');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = source.checked;
    }
  }
function draggableToDoList() {

    var dragSrcEl = null;

    function handleDragStart(e) {

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
    }

    function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }

    function handleDrop(e) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }

        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');

            // Update the list in local storage after item is dropped
            let mainDiv = document.getElementById('listToDo');
            let newList = []; 
            for(let i = 0; i < mainDiv.children.length; i++){
                let x = mainDiv.children[i].children[0].innerHTML;
                newList.push(x);
            }
            localStorage.setItem("toDo", JSON.stringify(newList)); 
        }

        return false;
    }

    function handleDragEnd(e) {
        // this/e.target is the source node.

        [].forEach.call(cols, function (col) {
            col.classList.remove('over');
        });
    }

    var cols = document.querySelectorAll('#listToDo .itemToDo');
    [].forEach.call(cols, function (col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false)
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });
        
}