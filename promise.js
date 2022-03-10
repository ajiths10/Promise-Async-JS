const posts=[
    {title:'Post One', body:'This is Post One',CreatedAt :new Date().getTime()},
    {title:'Post Two', body:'This is Post Two',CreatedAt :new Date().getTime()}
];
let intervalId =0;

function getposts(){
        clearInterval(intervalId);    
        intervalId= setInterval(()=>{
            let output = ''; 
            posts.forEach((post)=>{
            output+=`<li> ${post.title} Last Updated = ${(new Date().getTime() - post.CreatedAt)/1000} seconds ago</li>`;
            });
            //console.log( `Timer id=${intervalId}`)
        document.body.innerHTML=output;
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
function DeleteImmidelty(){
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
.then(DeleteImmidelty)
.catch(err=> console.log(err));
