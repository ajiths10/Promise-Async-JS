const posts=[
    {title:'Post One', body:'This is Post One',CreatedAt :new Date().getTime()},
    {title:'Post Two', body:'This is Post Two',CreatedAt :new Date().getTime()}
];
let intervalId =0;
let divSelector=document.getElementById('divSelect');
function getposts(){
        clearInterval(intervalId);    
        intervalId= setInterval(()=>{
            let output = ''; 
            posts.forEach((post)=>{
            output+=`<li> ${post.title} Last Updated = ${(new Date().getTime() - post.CreatedAt)/1000} seconds ago</li>`;
            });
            //console.log( `Timer id=${intervalId}`)
        //document.body.innerHTML=output;
        divSelector.innerHTML=output;
        },1000)
        
    }


function createPost(post){
    return new Promise((resolve,reject)=>{

        setTimeout(() => {
            posts.push({...post, CreatedAt: new Date().getTime()});
            const error=false;
            if(!error){
                resolve();
            }else{
                reject('Error : Something went wrong');
            }
        }, 1000);
    });
    
}

createPost({title:'Post Three',body:'This is Post Three'})
 .then(getposts)
 .catch(err=> console.log(err));


function create4thPost(post){
    return new Promise((resolve)=>{
        setTimeout(() => {
            posts.push({...post, CreatedAt: new Date().getTime()});
             resolve()
         }, 4000);

    });  
}
create4thPost({title:'Post Four',body:'This is Post Four'})



//delete function
function Deletes(){
    return new Promise((resolve,reject)=>{
        if(posts.length>0){
            setTimeout(() => {
                posts.pop();
                resolve();
            }, 5000);
        }else{
            reject('Error : Array is empty now');
        }

    });
}
let timerId=setInterval(()=>{
    Deletes()
    .then(console.log(`Last Post Deleted`))
    .catch(err=> {
        console.log(err)
        clearInterval(timerId);
    });
}, 1000)



//delete function immidietly 
function DeleteNew(){
    return new Promise((resolve,reject)=>{
        if(posts.length>0){
            setTimeout(() => {
                posts.pop();
                resolve();
            }, 1000);
        }else{
            reject('Error : Array is empty now');
        }

    });
}
create4thPost({title:'Post Five',body:'This is Post Five'})
.then(DeleteNew)
.catch(err=> console.log(err));



//delete function immidietly which not depend on setTimeout timer value
function DeleteImmidelty(){
    return new Promise((resolve,reject)=>{
        if(posts.length>0){
                posts.pop();
                resolve();   
        }else{
            divSelector.innerHTML= 'err';
            reject('Error : Array is empty now');
        }
    });
}


create4thPost({title:'Post Six',body:'This is Post Six'})
.then(DeleteImmidelty)
.catch(err=> console.log(err));


//
const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve,reject)=>
    setTimeout(resolve,2000,'Goodbye')
    );
const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
.then(res=>res.json());

Promise.all([promise1,promise2,promise3,promise4])
.then(values=>console.log(values));






//Async / Await
async function init(){
    await create4thPost({title:'Post Seven',body:'This is Post Sven'});
    getposts();
}
init ();




//Async /Await / fetch
async function fetchUser(){
    const ress = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await ress.json();
    console.log(data);
}
fetchUser();



//
// const lastActivicty =updatelastActivityTime (()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             posts.lastActivictyTime=new Date().getTime();
//             resolve(posts.lastActivictyTime)
//         },1000);
//     })
// });