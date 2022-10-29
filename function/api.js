export  async function tachesAfaire(){
            const response= await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5",
            {
            headers: {
            'Content-Type': 'application/json'
            }
            });       
            if(response.ok){
                //console.log("ici");
                return response.json();
            }
            throw new Error("Echec de recuperation des donnees");    
}


/**
 * Cette fonction permet de crer des elements html
 * @param {string} tagName 
 * @param {object} attribute 
 */
export const createElementWithAttribute=function(tagName,attribute={}){

    const el= document.createElement(tagName);

    for (const [key, value] of Object.entries(attribute)) {
        el.setAttribute(key,value);
    }

    return el;
}


export const createTask= function(task){

    if(task.completed){
        const li= createElementWithAttribute("li",{class:"todo list-group-item d-flex align-items-center fait"});
        
        li.innerHTML=`<input class="form-check-input" type="checkbox" id="todo-${task.id}" checked>
        <label class="ms-2 form-check-label" for="todo-${task.id}">
            ${task.title}
        </label>
        <label class="ms-auto btn btn-danger btn-sm">
        <i class="bi-trash" id="tache-${task.id}">
        </i>
        </label>`;
        
        return li;

    }else{
        const li= createElementWithAttribute("li",{class:"todo list-group-item d-flex align-items-center encore"});
        li.innerHTML=`<input class="form-check-input" type="checkbox" id="todo-${task.id}">
        <label class="ms-2 form-check-label" for="todo-${task.id}">
            ${task.title}
        </label>
        <label class="ms-auto btn btn-danger btn-sm">
        <i class="bi-trash" id="tache-${task.id}">
        </i>
        </label>`;

        return li;
    }


}

// let tableau=[];

export const addTask=function (index,value,taches){
    const task={
        id:index,
        title:value,
        completed:false
    }
    taches.push(task);
    const el=createTask(task)

    const ul=document.querySelector('ul');
    ul.append(el);
    

    const deleteButton=document.getElementById(`tache-${task.id}`);
    deleteButton.addEventListener("click",removeTask);

    const checkbox=document.getElementById(`todo-${task.id}`);
        checkbox.addEventListener('change',checkBox);

    localStorage.setItem("task",JSON.stringify(taches));
}

export const removeTask=function(e,taches){
    const split=e.target.id.split("-");

    const index=split[1];
    console.log(taches);

    taches.forEach(element => {
        if(!element !=null){
            if(element.id==index){

                const indexof=  taches.indexOf(element);
      
                delete taches[indexof];
      
              }
        }
            
    });
    console.log(taches);

    const tachesFinal=taches;

    localStorage.setItem('task',JSON.stringify(tachesFinal));

    
    console.log('delete');
       const firstParent=e.target.parentElement;
       const secondParent=firstParent.parentElement;
       secondParent.remove();
    
}

export const todo=function (){
    //partie style des bouttons
    
    const allButton=document.getElementById("all");
        allButton.classList.remove('active');

    const doneButton=document.getElementById("done");
        doneButton.classList.remove('active');
    
    const doButton=document.getElementById("do");
        doButton.classList.add('active');


    const fait=document.getElementsByClassName("fait");
    for(const [key,value] of Object.entries(fait)){
        value.classList.add('d-none');
    }

    const encore=document.getElementsByClassName("encore");

    for(const [key,value] of Object.entries(encore)){
         value.classList.remove('d-none');
    }
}

export const done= function (){
    //partie style des bouttons

    const allButton=document.getElementById("all");
        allButton.classList.remove('active');

    const doButton=document.getElementById("do");
        doButton.classList.remove('active');
    
    const doneButton=document.getElementById("done");
    doneButton.classList.add('active');


    //console.log("faites");
    const checked=document.getElementsByClassName("encore");
    //console.log(checked);
    for(const [key,value] of Object.entries(checked)){
        //console.log(value);
        value.classList.add("d-none");   
    }

    const checked1=document.getElementsByClassName("fait");
    //console.log(checked1);
    for(const [key,value] of Object.entries(checked1)){
        value.classList.remove("d-none");    
    }

}

export const all=function (){

    //partie style des bouttons
    const doButton=document.getElementById("do");
        doButton.classList.remove('active');

    const doneButton=document.getElementById("done");
        doneButton.classList.remove('active');
    
    const allButton=document.getElementById("all");
        allButton.classList.add('active');



    const checked=document.getElementsByClassName("encore");
    //console.log(checked);
    for(const [key,value] of Object.entries(checked)){
       // console.log(value);
        value.classList.remove("d-none");   
    }

    const checked1=document.getElementsByClassName("fait");
    //console.log(checked1);
    for(const [key,value] of Object.entries(checked1)){
        value.classList.remove("d-none");    
    }


    


}

export const checkBox=function(e){

    const validate=e.target.checked;
    const parent=e.target.parentElement;
    if(validate){
       parent.classList.add('fait');
       parent.classList.remove('encore');
    }else{
        parent.classList.add('encore');
       parent.classList.remove('fait');
    }
}