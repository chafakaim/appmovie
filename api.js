class Apimovie{
    constructor(container,keyapi,url){
        this.keyapi=keyapi;
        this.container=container;
        this.url=url;
        this.tab=[];
        // methode qui va faire la requete a l'api
    }
    /**
     * 
     * @param {string} key  
     */
    fetchapi=function(key){
        let i=1;
        let clear=setInterval(() => {
            fetch(`https://api.themoviedb.org/3/movie/${550+i}?api_key=${key}&?language=FR`)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
            this.tab.push(data);
            })

            // clean du set intervale a une longeur volue du this.tab
            if(this.tab.length === 50){
                clearInterval(clear);
            }
        }, 100);
        return this.tab;
    }
    display=function(){
        const urls='https://image.tmdb.org/t/p/w500';
        this.tab.forEach(e => {
        this.container.innerHTML=`<div class="box">
       <div class="image"><img src=${urls+e.backdrop_path}></div>
       <h2 class="title">${e.title}</h2>
       <p class="logo">${e.overview}</p>
       </div>`      
        });
      
    }.bind(this);
}