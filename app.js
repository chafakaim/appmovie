// appele une api avec les promess
const key='ca451e264da44b3b907051f63fa549e8';
let i=1;
let container=document.querySelector('.container')
let tab=[];
let clear=setInterval(() => {
    let res=fetch(`https://api.themoviedb.org/3/movie/${550+i}?api_key=${key}`).then(res=>{
        return res.json()
        }).then(data=>{
            tab.push(data);
            console.log(tab);
     })
        i++;
        if(tab.length === 3){
            clearInterval(clear);
            tab.forEach(e => {
                console.log(e.original_title);
                
            });
        }
}, 1000);