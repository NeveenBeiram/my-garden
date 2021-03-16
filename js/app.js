'use strict';


const Flower = function( name,category,season ){
  this.name=name;
  this.category=category;
  this.season=season;
  Flower.all.push( this );
  //   localStorage.setItem( 'Flower',JSON.stringify( Flower.all ) );
};


Flower.all=[];

Flower.prototype.save =function(){
  for ( let i =0 ; i<Flower.all.length;i++ ){
    localStorage.setItem( 'Flower',JSON.stringify( Flower.all[i] ) );
  }
};

let tempLocalStorage=[];

function getItems(){
  tempLocalStorage=JSON.parse( localStorage.getItem( 'Flower' ) )|| [];
  for ( let i = 0 ; i<tempLocalStorage.length;i++ ){
    Flower.all.push( tempLocalStorage[i] );
    // console.log( Flower.all );
  }
}

let tableDiv = document.getElementById( 'tableDiv' );

let table = document.createElement( 'table' );
tableDiv.appendChild( table );

const handelSubmit= function( event ){
  event.preventDefault();
  let flower=new Flower( event.target.name.value,
    event.target.select.value,event.target.season.value );
  //Flower.save();
  localStorage.setItem( 'Flower',JSON.stringify( flower ) );
  getItems();
  if ( Flower.all ){//localStorage.Flower
    table.innerHTML='';
    for ( let i = 0; i<Flower.all.length;i++ ){
      const tr= document.createElement( 'tr' );

      const td4 = document.createElement( 'td' );
      let tt=document.createElement( 'a' );
      tt.setAttribute( 'href',`#${i}` );
      tt.setAttribute( 'name','delete' );
      tt.textContent='x';
      td4.appendChild( tt );
      tr.appendChild( td4 );

      const td1 = document.createElement( 'td' );
      //   let t= document.createElement( 'img' );
      //   t.setAttribute( 'href',`${event.target.select.value}.jpeg` );
      td1.textContent=event.target.select.value;//`${event.target.select.value}.jpeg`; ;`${t}`
      tr.appendChild( td1 );

      const td2 = document.createElement( 'td' );
      td2.textContent=event.target.name.value;
      tr.appendChild( td2 );

      const td3 = document.createElement( 'td' );
      td3.textContent=event.target.season.value;
      tr.appendChild( td3 );

      table.appendChild( tr );

    }


  }



};
const deleteElement = function ( event ){

  if( event.target.name === 'delete' ){

    Flower.all.splice( event.target.href.split( ( '#' ),[1] ),1 );
    for( let i =0 ; i<Flower.all.length;i++ ){
      localStorage.setItem( 'Flower',JSON.stringify( Flower.all[i] ) );
      handelSubmit();
    }
  }

};


const form = document.getElementById( 'form' );

// getItems();
form.addEventListener( 'submit',handelSubmit );

tableDiv.addEventListener( 'click',deleteElement );

