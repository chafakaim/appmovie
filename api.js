class Apimovie{
    constructor(container,keyapi,load){
        this.keyapi=keyapi;
        this.load=load;
        this.container=container;
        this.tab=[];
        this.lodding=true;
        // methode qui va faire la requete a l'api
        this.fetchapi(this.keyapi,this.tab);
        // appele de la methode de display des donner dans l'application

        //   fade du lodding
      


    }

    /**
     * 
     * @param {string} key  
     */
    fetchapi=function(key,tab){
        let i=1;
        let clear=setInterval(() => {
            fetch(`https://api.themoviedb.org/3/movie/${550+i}?api_key=${key}`)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
            tab.push(data);
            })
              console.log(tab)
            // clean du set intervale a une longeur volue du this.tab
            if(tab.length >= 50){
                clearInterval(clear);
                this.lodding=false;
                this.display(tab,this.container);
                   
                // gestion du lodeur de la page
                if(this.lodding === false){
                    load.classList.add('fade');
                    load.addEventListener('transitionend',function(){
                       if(this.classList.contains('fade')){
                           this.classList.add('in');
                       }
                    })
                    }
            }
            i++;
        }, 100);
        if(tab.length === 50){
            return this.tab;
        }
    }.bind(this);

    /**
     * @param {array} tab
     * @param {HTMLElement} container
     */
    display=function(tab,container){
        const urls='https://image.tmdb.org/t/p/w500';
        tab.forEach(e => {
            if(!e.status_message){
                let div=document.createElement('div')
                div.className='box';
                let image=document.createElement('div')
                image.className='image';
                let img=document.createElement('img')
                img.setAttribute('src',urls+e.backdrop_path);
                let p=document.createElement('p')
                p.innerHTML=e.overview;

                image.appendChild(img);
                div.appendChild(image);
                
                let title =document.createElement('h2')
                title.innerHTML=e.title;
                div.appendChild(title);
                div.appendChild(p);
                container.appendChild(div);
            }
        });
      
    }.bind(this);
}
const key='ca451e264da44b3b907051f63fa549e8';
let container= document.querySelector('.container');
let load=document.querySelector('.lodding');
let apimovie=new Apimovie(container,key,load);
