let yearNum = document.querySelector('.yearNum');
let monthName = document.querySelector('.monthName');
let dates = document.querySelector('.dates');
let prevY = document.querySelector('.prevY');
let nextY = document.querySelector('.nextY');
let prevM = document.querySelector('.prevM');
let nextM= document.querySelector('.nextM');
let calendar= document.querySelector('.calendar'); 

let current = new Date();
let desiredYear=current.getFullYear();
let desiredMonth=current.getMonth();

createCalendar(desiredYear,desiredMonth)

prevY.addEventListener('click',prevYFunction)
nextY.addEventListener('click',nextYFunction)
prevM.addEventListener('click',prevMFunction)
nextM.addEventListener('click',nextMFunction)

dates.addEventListener('click',choisedDay);
   
function createCalendar(desiredYear,desiredMonth){
    let arr;
    arr=lastDay(desiredYear,desiredMonth);
        console.log(arr);
    arr=createBlocks(arr);
        console.log(arr);
    dates.innerHTML='';
    arr.forEach(d=>addDays(d));
    yearNum.textContent=desiredYear;
    monthName.textContent=getMonthName();
}
function lastDay(y , m){
    let lastday = new Date(y ,m+1,0);
    let firstday = new Date(y ,m,1);
    return [firstday.getDay(),lastday.getDate() , lastday.getDay()];
}
function createBlocks(a){
    let daysbefore =a[0];
    let daysafter =a[2];
    let arrDays =[];
    arrDays.length=a[1];
    arrDays=arrDays.fill('.',0,arrDays.length).map((el,ind)=>ind+1);
    console.log('после fill'+'+'+arrDays+'+'+arrDays.length);
    if(daysbefore==0){daysbefore=7};
    while(daysbefore>1){
        arrDays.unshift('');
        daysbefore--;
    };
    if(daysafter!=0){
    while(daysafter<7){
        arrDays.push('');
        daysafter++;
    };}
    console.log(arrDays)
    return arrDays;
    
}
function addDays(day){
    let el= document.createElement('div');
    el.classList.add('box');
    el.innerHTML=`<span>${day}</span>`;
    
    dates.append(el);
    if(!el.textContent){el.classList.add('othermonth')}
    if(el.offsetLeft>250){el.classList.add('weekend')}
     
}
function getMonthName(){
    let names=["January","February","March","April","May","June","July","August","September","October" ,"November" ,"December" ];
    return names[desiredMonth];
}
function prevYFunction(){
    desiredYear-=1;
    createCalendar(desiredYear,desiredMonth)
}
function prevMFunction(){
    if(desiredMonth>0){
        desiredMonth-=1;
    }else{
        desiredYear-=1;
        desiredMonth=11;
    }
    createCalendar(desiredYear,desiredMonth)
}
function nextYFunction(){
    desiredYear+=1;
    createCalendar(desiredYear,desiredMonth)
}
function nextMFunction(){
    if(desiredMonth<11){
        desiredMonth+=1;
    }else{
        desiredYear+=1;
        desiredMonth=0;
    }
    createCalendar(desiredYear,desiredMonth)
}

function choisedDay(event){
    if(event.target.classList.contains('box')&& !event.target.classList.contains('othermonth')){
        event.target.classList.toggle('choisedDay')
    }
}

 



