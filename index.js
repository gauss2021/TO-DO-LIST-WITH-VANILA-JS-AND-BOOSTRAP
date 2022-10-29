import { createElementWithAttribute, createTask, tachesAfaire,addTask,removeTask,todo,done,all,checkBox } from "./function/api.js";


try {
    //recuperation des taches
    const taches=await tachesAfaire();
    let index=0;
    taches.forEach(element => {
    //affichage des taches
        index=element.id;

        const ul=document.querySelector("ul");
        const task=createTask(element);
        //console.log(task);
        ul.append(task);
        //On associe chauque boutton delete a un event

        const deleteButton=document.getElementById(`tache-${element.id}`);
        deleteButton.addEventListener("click",removeTask);

        //On associe a chacque checkbox un evenement change

        const checkbox=document.getElementById(`todo-${element.id}`);
            checkbox.addEventListener('change',checkBox);

    });


    const form=document.querySelector("form");
    //ajout des taches
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const value=event.target['title'].value;
        index=index+1;
        addTask(index,value)});

//des taches a faire

const toDo=document.getElementById("do");

toDo.addEventListener("click",todo);

//des taches finies

const don=document.getElementById("done");

don.addEventListener("click",done);

//toutes les taches

const allTask=document.getElementById("all");

    allTask.addEventListener("click",all)


} catch (error) {
    console.log(error);
    const el=createElementWithAttribute("div",{class:"alert alert-danger container mt-2"});
        el.innerText="Un probleme est survenue lors de la recuperation des donnees";
        document.body.prepend(el);

}




