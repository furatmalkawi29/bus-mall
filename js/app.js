

'use strict';

let productArray = [
  'bag', 'banana', 'boots', 'breakfast', 'bathroom',
  'chair', 'dragon', 'bubblegum', 'cthulhu', 'dog-duck',
  'pen', 'shark', 'sweep', 'scissors', 'pet-sweep',
  'tauntaun', 'wine-glass', 'water-can', 'usb', 'unicorn',
];




const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const middleImage = document.getElementById( 'middleImage' );
const rightImage = document.getElementById( 'rightImage' );
const resultBtn = document.getElementById( 'resultBtn' );
const resulList = document.getElementById( 'resultList' );






function Product( name ) {
  this.name = name;

  if ( this.name === 'sweep' )
  { this.image = `./img/${name}.PNG`;}
  else if ( this.name === 'usb' )
  { this.image = `./img/${name}.GIF`;}
  else
  { this.image = `./img/${name}.jpg`;}
  this.clicks = 0;
  this.shown = 0;
  Product.all.push( this );

}



Product.all = [];
Product.counter = 0;



let leftProdIndex = 0;
let middleProdIndex = 0;
let rightProdIndex = 0;
let clickCounter = 20;


for( let i = 0; i < productArray.length; i++ ) {
  new Product( productArray[i] );
}




function renderNewProduct() {

  let leftIndex = randomNumber( 0, Product.all.length - 1 );
  leftImage.src = Product.all[leftIndex].image;
  leftImage.alt = Product.all[leftIndex].name;

  leftProdIndex = leftIndex;




  let middleIndex;
  do {
    middleIndex = randomNumber( 0, Product.all.length - 1 );
  } while( leftIndex === middleIndex );

  middleImage.src = Product.all[middleIndex].image;
  middleImage.alt = Product.all[middleIndex].name;

  middleProdIndex = middleIndex;




  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Product.all.length - 1 );
  } while( middleIndex === rightIndex || rightIndex === leftIndex );

  rightImage.src = Product.all[rightIndex].image;
  rightImage.alt = Product.all[rightIndex].name;

  rightProdIndex = rightIndex;




  Product.all[leftIndex].shown++;
  Product.all[middleIndex].shown++;
  Product.all[rightIndex].shown++;

  //console.log(Product.all[rightIndex].name,Product.all[rightIndex].shown );

}


renderNewProduct();


function handelClick( event ) {
  const clickedElement = event.target;

  if( Product.counter < clickCounter ) {

    if( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' ||
   clickedElement.id === 'middleImage' )
    {
      if( clickedElement.id === 'leftImage' ) {
        Product.all[leftProdIndex].clicks++;
      }

      if( clickedElement.id === 'middleImage' ) {
        Product.all[middleProdIndex].clicks++;
      }


      if( clickedElement.id === 'rightImage' ) {
        Product.all[rightProdIndex].clicks++;
      }
      //console.log( Product.all[rightProdIndex].name,Product.all[rightProdIndex].clicks );
      //console.log( event, event.target );
      Product.counter++;

      renderNewProduct();
    }
  } else {
    console.log( 'else' );
    imageSection.removeEventListener( 'click', handelClick );
    resultBtn.style.visibility = 'visible';
    resultBtn.addEventListener( 'click', viewResults );

  }


}


imageSection.addEventListener( 'click', handelClick );
console.log( Product.all );



const viewResults = function ( )
{
  console.log( 'hanler' );

  const parentElement = document.getElementById ( 'resultList' );

  for ( let i = 0 ; i < Product.all.length ;i++ )
  {
    const liElement = document.createElement ( 'li' );
    parentElement.appendChild( liElement );

    liElement.textContent = `${Product.all[i].name} has ( ${Product.all[i].clicks} ) votes, and was seen ( ${Product.all[i].shown} ) times`;
  }

};


// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}



