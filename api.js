class Apimovie{
    constructor(container,keyapi,load,form){
        this.keyapi=keyapi;
        this.load=load;
        this.form=form;
        this.container=container;
        this.tab=[];
        this.page=50
        this.urls='https://image.tmdb.org/t/p/w500';
        this.lodding=true;

        // methode qui va faire la requete a l'api
        this.fetchapi(this.keyapi,this.tab,this.page,load);
        //gestion du loder

        //   getion de la recherche dans l'application
          this.form.addEventListener('submit',(e)=>{
              e.preventDefault();
            this.serch(this.tab,this.container,this.form,load);
          })
          
        //getion de la recherche de plus de movie
        let button=container.parentNode.querySelector('.pagination button');
        button.addEventListener('click',()=>{
            this.page+=10;
            this.fetchapi(this.keyapi,this.tab,this.page);
        })

        // gestion des details de l'affichage
        document.body.addEventListener('click',(e)=>{
            if(e.target.className === 'box'){
                console.log('click');
              this.detailscontent(e.target);
            }
        })
        document.body.addEventListener('click',(e)=>{
            if(e.target.className === 'delate'){
                console.log('delate')
              this.deletecontent(e.target);
            }
        })
        }
// ************fin du constructeur**************************

// gestion du delate du details 
       deletecontent=function(div){
           div.parentNode.parentNode.removeChild(div.parentNode);
       }

        /**
         * @param {HTMLElement} root
         */

     detailscontent=function(root){
        let h2=root.querySelector('h2').innerText;
        let p=root.querySelector('p').innerText;
        let image=document.querySelector('.image img').src;
        console.log(image);
        let details=document.createElement('div')
        details.className='details';
        details.innerHTML=`
        <div class='delate'>x</div>
        <div class="content">
        <h2>${h2}</h2>
        <p>${p}</p>
        <div class='image'><img src=${image}></div>          
        </div>
        `;

        document.body.appendChild(details)
     }.bind(this)   
    /**
     * 
     * @param {string} key  
     */
    fetchapi=function(key,tab,page=50,load){
        let i=1;
        let clear=setInterval(() => {
            fetch(`https://api.themoviedb.org/3/movie/${(page === 50? 550 :550+page)+i}?api_key=${key}`)
            .then(res=>{
                return res.json();
            })
            .then(data=>{
            tab.push(data);
            })
              console.log(tab)
            // clean du set intervale a une longeur volue du this.tab
            if(tab.length >= page){
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
        if(tab.length === page){
            return this.tab;
        }
    }.bind(this);

    /**
     * @param {array} tab
     * @param {HTMLElement} container
     */
    display=function(tab,container){
     container.innerHTML='';
        tab.forEach(e => {
            if(!e.status_message){
                let div=document.createElement('div')
                div.className='box';
                let image=document.createElement('div')
                image.className='image';
                let img=document.createElement('img')
                img.setAttribute('src',this.urls+e.backdrop_path);
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

    serch=function(tab,container,form){
        {
                let input=form.querySelector('input');
                Array.from(container.children).forEach(e=>{
                    container.removeChild(e);
                })

                tab=tab.filter(ele=>{
                    if(ele.title !== undefined){
                        let string=input.value.charAt(0).toUpperCase()+input.value.slice(1,input.value.length); 
                      if(ele.title.includes(string)){
                          console.log(ele);
                          return ele;
                      }
                     }
                })
                if(tab.length === 0){
                     container.innerHTML='desolé on pas trouver de resultats dans cette api veuillez essayer.'
                }else{
                    tab.forEach(e => {
                        if(!e.status_message){
                            let div=document.createElement('div')
                            div.className='box';
                            let image=document.createElement('div')
                            image.className='image';
                            let img=document.createElement('img')
                            img.setAttribute('src',this.urls+e.backdrop_path);
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
                }
                
      }     


    }.bind(this);
};
export default Apimovie;
