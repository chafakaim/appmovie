import Apimovie from "./api.js"

let key='ca451e264da44b3b907051f63fa549e8';
let container= document.querySelector('.container');
let form=document.querySelector('form')
let load=document.querySelector('.lodding');
let input=document.querySelector('input[type="text"]');
let apimovie=new Apimovie(container,key,load,form);
