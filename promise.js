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
        }, 2000);
    });
    
}

createPost({title:'Post Three',body:'This is Post Three'})
 .then(getposts)
 .catch(err=> console.log(err));

// getposts();
//createPost({title:'Post Three',body:'This is Post Three'},getposts);

function create4thPost(post){
    return new Promise((resolve)=>{
        setTimeout(() => {
            posts.push({...post, CreatedAt: new Date().getTime()});
             resolve()
         }, 4000);

    });
    
}
create4thPost({title:'Post Four',body:'This is Post Four'})
