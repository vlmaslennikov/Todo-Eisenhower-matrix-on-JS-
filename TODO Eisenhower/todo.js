let taskBlockElement1 = document.querySelector('#taskBlock1');
let taskBlockElement2 = document.querySelector('#taskBlock2');
let taskBlockElement3 = document.querySelector('#taskBlock3');
let taskBlockElement4 = document.querySelector('#taskBlock4');

let bksElements=document.querySelectorAll('.bks');
let taskElements=document.querySelectorAll('.task');

for(let el of taskElements){
    el.draggable=true;
}
for(let el of bksElements ){
    el.addEventListener('dragstart', addSelected );
    el.addEventListener('dragend', removeSelected)
    el.addEventListener('dragover', function(event){
        event.preventDefault();
    })
    el.addEventListener('drop', trasportInBlocks ) 
}

function addSelected(event){
    if(event.target.tagName=="LI"){
    event.target.classList.add('selected');};
    console.log(event.target)
}
function removeSelected(event){
    event.target.classList.remove('selected');
}
function trasportInBlocks(event){
    let activeElement=document.querySelector('.selected')
    let currentElement;
    if (activeElement.parentElement == this){
        switch('LI') {
            case(event.target.tagName):
            {
                currentElement=event.target;
            };
            break;
            case(event.target.parentElement.tagName):
            {
                currentElement=event.target.parentElement;
            };
            break;
            case(event.target.parentElement.parentElement.tagName):
            {
                currentElement=event.target.parentElement.parentElement;
            };
            break;
            default:
                return;
         }
            
        let indexOfCurrentElement=Array.from(this.children).indexOf(currentElement);
        let indexOfActiveElement=Array.from(this.children).indexOf(activeElement);
        console.log('indexOfCurrentElement'+indexOfCurrentElement);
        console.log('indexOfActiveElement'+indexOfActiveElement);
        let nextElement;
        if(indexOfCurrentElement > indexOfActiveElement){
            nextElement=currentElement.nextElementSibling;
        }else if(indexOfCurrentElement < indexOfActiveElement){nextElement=currentElement;
        }else{return};
        nextElement!==null ? nextElement.before(activeElement) : this.lastElementChild.after(activeElement);
    }else{
        this.append(activeElement);
    };

    for(let el of bksElements ){
         taskCount(el);
    };
}
 
const lastWordsOfJsElement={};
addTask.addEventListener('click', newTask);

function newTask(){
    let timerSelector = +timerInput.options[timerInput.selectedIndex].value;
    let booleanTime= Boolean(+hours.value + +minutes.value);
    if(timerSelector && !booleanTime){return alert('Параметры таймера не заданы!')};
    if(input.value.trim()==''){return alert('Отсутствует описание задания !') };
    let newTask = document.createElement('li');
    newTask.classList.add('task');
    newTask.draggable=true;

    let pBlock = document.createElement('p');
    pBlock.classList.add('taskText');
    pBlock.setAttribute('style','word-break:break-all');
    pBlock.textContent=input.value;;
    newTask.append(pBlock);

    let divTaskControlBlock = document.createElement('div');
    divTaskControlBlock.classList.add('task-control');
    newTask.append(divTaskControlBlock);
    
    let divBtnsBlock = document.createElement('div');
    divBtnsBlock.classList.add('btns-block');
    divTaskControlBlock.append(divBtnsBlock);

    let btnCompletedTask = document.createElement('button');
    btnCompletedTask.classList.add('btns');
    btnCompletedTask.classList.add('complete');
    let imgComplete = document.createElement('img');
    imgComplete.setAttribute('src','https://icon-icons.com/icons2/510/PNG/32/checkmark-round_icon-icons.com_50430.png');
    imgComplete.setAttribute('draggable','false');
    btnCompletedTask.append(imgComplete);
    divBtnsBlock.append(btnCompletedTask);

    let btnDeleteTask = document.createElement('button');
    btnDeleteTask.classList.add('btns');
    btnDeleteTask.classList.add('delete');
    let imgDelete = document.createElement('img');
    imgDelete.setAttribute('src','https://icon-icons.com/icons2/2024/PNG/32/waste_bin_delete_remove_recycle_icon_123840.png');
    imgDelete.setAttribute('draggable','false');
    btnDeleteTask.append(imgDelete);
    divBtnsBlock.append(btnDeleteTask);

    let timerCriterion = timerSelector && booleanTime;
    let position = taskCategory.options[taskCategory.selectedIndex].value;
    let currentList = document.getElementById(position);
    switch(timerCriterion)
    {  
        case(true):
               { 
                let bntTimerRemove = document.createElement('button');
                bntTimerRemove.classList.add('btns');
                bntTimerRemove.classList.add('remove');
                let imgRemoveTimer = document.createElement('img');
                imgRemoveTimer.setAttribute('src','https://icon-icons.com/icons2/878/PNG/32/timer-off_icon-icons.com_68470.png');
                imgRemoveTimer.setAttribute('draggable','false');
                bntTimerRemove.append(imgRemoveTimer);
                divBtnsBlock.append(bntTimerRemove);
    
                let pTimer = document.createElement('p');  
                let timeVisualiser=returnTimer();   
                let startTimer = setInterval(function(){
                    timeVisualiser(pTimer,startTimer,newTask) 
                },1000) ;
                
                bntTimerRemove.addEventListener('click',function(){
                    clearInterval(startTimer);
                    pTimer.remove();
                    bntTimerRemove.remove();     
                });
                
                btnCompletedTask.addEventListener('click',function(){
                    if(pTimer){
                        clearInterval(startTimer);
                        pTimer.remove();
                        bntTimerRemove.remove();
                        btnCompletedTask.remove();
                    };
                    newTask.classList.add('completedTask'); 
                    taskCount(newTask.parentElement);
                });
                btnDeleteTask.addEventListener('click',function(){
                    if(pTimer){clearInterval(startTimer);}
                    lastWordsOfJsElement.parent=newTask.parentElement;
                    newTask.remove();
                    taskCount(lastWordsOfJsElement.parent);
                   ;
                });
                divTaskControlBlock.append(pTimer);
                currentList.append(newTask); 
                taskCount(newTask.parentElement);
            }
        break;
        default:
              { 
                btnCompletedTask.addEventListener('click',function(){
                    btnCompletedTask.remove();
                    newTask.classList.add('completedTask'); 
                    taskCount(newTask.parentElement);
                });        
                btnDeleteTask.addEventListener('click',function(){ 
                    lastWordsOfJsElement.parent = newTask.parentElement;
                    newTask.remove();
                    taskCount(lastWordsOfJsElement.parent);     
                });
                currentList.append(newTask); 
                taskCount(newTask.parentElement);
              };
         break;
    };
} 
function taskCount(parent){
    let counterAllTasks = parent.previousElementSibling.querySelector('.countAllTasks');
    let countAllTasks  = parent.children.length;
    counterAllTasks.textContent = countAllTasks ;

    let counterCompletedTask = parent.previousElementSibling.querySelector('.countCompletedTask');
    let countCompletedTask  = parent.querySelectorAll('.completedTask').length || 0;
    counterCompletedTask.textContent = countCompletedTask ;

    let counterExpiredTask = parent.previousElementSibling.querySelector('.countExpiredTask');
    let countExpiredTask  = parent.querySelectorAll('.expiredTask').length ||0;
    counterExpiredTask.textContent =  countExpiredTask;
};

function returnTimer(){
    let time =  hours.value*3600 + minutes.value*60 ;
    return  (timerPlace,timerBeginer,argTaskBlock)=>{
        let hours = Math.floor((time/60)/60);
        let minutes = Math.floor(time/60)%60;
        let seconds =time%60;
        hours= hours<10 ? '0'+hours :hours;
        minutes= minutes<10 ? '0'+minutes :minutes;
        seconds= seconds<10 ? '0'+seconds :seconds;
        timerPlace.textContent=`${hours}:${minutes}:${seconds}`
        time--; 
        if(time<0){
            clearInterval(timerBeginer);
            colorTimerZero(argTaskBlock);
        };
    };
};

function colorTimerZero(el){
    el.classList.add('expiredTask');
    taskCount(el.parentElement)
}

document.addEventListener('DOMContentLoaded',()=>{
    if(timerInput.value=='0'){
        hours.setAttribute('disabled','disabled');
        minutes.setAttribute('disabled','disabled');
        hours.value = minutes.value =0;
    };
});

timerInput.addEventListener('change',(event)=>{
    if(event.target.value=='0'){
        hours.setAttribute('disabled','disabled');
        minutes.setAttribute('disabled','disabled');
        hours.value = minutes.value =0;
    }else{
        hours.removeAttribute('disabled');
        minutes.removeAttribute('disabled');
        };
});


 