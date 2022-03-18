// lodding de la page
let load=document.querySelector('.lodding')
let form=document.forms;
console.log(form);
// appele une api avec les promess
const key='ca451e264da44b3b907051f63fa549e8';
let i=1;
let url='https://image.tmdb.org/t/p/w500'
let container=document.querySelector('.container')
let tab=[];
let clear=setInterval(() => {
    let res=fetch(`https://api.themoviedb.org/3/movie/${550+i}?api_key=${key}&?language=FR`).then(res=>{
        return res.json()
        }).then(data=>{
            tab.push(data);
     })
        i=i+2;
        if(tab.length === 40){
            clearInterval(clear);
            // remove the loader from container
            load.classList.add('fade');
            load.addEventListener('transitionend',function(){
                if(this.classList.contains('fade')){
                    this.classList.add('in');
                }
            })

            // faire l'evenement du submit dans le formulaire
            form[0].addEventListener('submit',function(e){
                e.preventDefault();
                let tab2=[];
                Array.from(container.childNodes).forEach(child=> {
                    container.removeChild(child);
                }) 
                 tab2=tab.filter(element=>{
                   if(element.title !== undefined){
                      let string=form[0][0].value.charAt(0).toUpperCase()+form[0][0].value.slice(1,form[0][0].value.length); 
                    if(element.title.indexOf(string) !== -1){
                        console.log(element);
                        return element;
                    }
                   }
                })  
                console.log(tab2);
                tab2.forEach(e => {
                
                    if(!e.status_message){   
                        let div=document.createElement('div')
                        div.className='box';
                        let image=document.createElement('div')
                        image.className='image';
                        let img=document.createElement('img')
                        img.setAttribute('src',url+e.backdrop_path);
                        let p=document.createElement('p')
                        p.innerHTML=e.overview;
        
                        image.appendChild(img);
                        div.appendChild(image);
                        
                        let title =document.createElement('h2')
                        title.innerHTML=e.original_title;
                        div.appendChild(title);
                        div.appendChild(p);
                        container.appendChild(div);
                    }
                    
                });          
              })

            // etirer sur le tableau de data de l'API 
            tab.forEach(e => {               
                if(!e.status_message){
                  
                    let div=document.createElement('div')
                    div.className='box';
                    let image=document.createElement('div')
                    image.className='image';
                    let img=document.createElement('img')
                    img.setAttribute('src',url+e.backdrop_path);
                    let p=document.createElement('p')
                    p.innerHTML=e.overview;
    
                    image.appendChild(img);
                    div.appendChild(image);
                    
                    let title =document.createElement('h2')
                    title.innerHTML=e.original_title;
                    div.appendChild(title);
                    div.appendChild(p);
                    container.appendChild(div);
                }
                
            });
        }
}, 100);