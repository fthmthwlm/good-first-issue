let rt=""
const array1 = [
 "#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33FFF5",
 "#FFBD33", "#33FFBD", "#F533FF", "#A1FF33", "#3357FF",
 "#FFA133", "#57FF33", "#FF5733", "#A133FF", "#33A1FF",
 "#F5FF33", "#FF33F5", "#BD33FF", "#33FFA1", "#5733A1",
 "#A157FF", "#33FFD1", "#FF3381", "#33FF81", "#FFA1D1",
 "#57A1FF"
];
while(rt==""){
rt=prompt('enter your name')
}
let names=document.getElementById('name')
let namess=document.getElementById('hacker')
console.log(rt)
function changing(){
setInterval(() => {
 let rt=parseInt(Math.random()*27)
 console.log(rt)
 document.body.style.backgroundColor=`${array1[rt]}`
},1000);
}
let greeting=""
let date=new Date()
let er=date.getHours()
const amPm = date.toLocaleTimeString('en-US').split(' ')[1];
if(amPm=='PM' && er>=12 && er<=16){
 greeting="afternoon"
}
if(amPm=="PM" && er>=16 && er<=24){
 greeting="night"
}
if(amPm=='AM' && er>=5 && er<=12){
 greeting="morning"
}
if(rt!==""){
names.innerText=`Welcome and Thanks ${rt} To visit our website`
namess.innerText=`Good ${greeting} ${rt}`
changing()
}