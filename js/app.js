

'use strict';

let productArray = [
  'bag.jpg', 'banana.jpg', 'boots.jpg', 'breakfast.jpg', 'bathroom.jpg',
  'chair.jpg', 'dragon.jpg', 'bubblegum.jpg', 'cthulhu.jpg', 'dog-duck.jpg',
  'pen.jpg', 'shark.jpg', 'sweep.png', 'scissors.jpg', 'pet-sweep.jpg',
  'tauntaun.jpg', 'wine-glass.jpg', 'water-can.jpg', 'usb.gif', 'unicorn.jpg',
];


//------------------------------------------------------------------------------------



const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const middleImage = document.getElementById( 'middleImage' );
const rightImage = document.getElementById( 'rightImage' );
const resultBtn = document.getElementById( 'resultBtn' );


//------------------------------------------------------------------------------------



let leftProdIndex = 0;
let middleProdIndex = 0;
let rightProdIndex = 0;
let clickCounter = 25;

let prevRandomNumArr = [];

//------------------------------------------------------------------------------------



function Product( imageName ) {
  this.imageName = imageName; // 'bag.jpg'

  let dir = './img/' ;
  this.image = dir + imageName;

  let str = imageName.split( '.' ); // str =  ['bag','jpg']
  this.name = str[0]; // name = 'bag'


  this.clicks = 0;
  this.shown = 0;

  Product.all.push( this );

  Product.nameArr.push( this.name );
}


Product.all = [];
Product.nameArr = [];
Product.shownArr = [];
Product.clickArr = [];
Product.counter = 0;


//------------------------------------------------------------------------------------



for( let i = 0; i < productArray.length; i++ ) {
  new Product( productArray[i] );

}


//------------------------------------------------------------------------------------

function renderNewProduct() {

  let imageIndex = randomNumber( 0, Product.all.length - 1 ); // gets set of random numbers : [3,15,4] ;

  console.log( imageIndex );



  let leftIndex = imageIndex [0] ; // leftIndex = 3 ;

  leftImage.src = Product.all[leftIndex].image; // sends image src --> shows the image
  leftImage.alt = Product.all[leftIndex].name;

  leftProdIndex = leftIndex;




  let middleIndex = imageIndex [1] ;

  middleImage.src = Product.all[middleIndex].image;
  middleImage.alt = Product.all[middleIndex].name;

  middleProdIndex = middleIndex;




  let rightIndex = imageIndex [2];

  rightImage.src = Product.all[rightIndex].image;
  rightImage.alt = Product.all[rightIndex].name;

  rightProdIndex = rightIndex;




  Product.all[leftIndex].shown++;
  Product.all[middleIndex].shown++;
  Product.all[rightIndex].shown++;
}


//------------------------------------------------------------------------------------

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

      //console.log( event, event.target );

      Product.counter++;

      renderNewProduct();
    }
  } else {
    imageSection.removeEventListener( 'click', handelClick );
    resultBtn.style.visibility = 'visible';
    resultBtn.addEventListener( 'click', viewResults );

  }

}

//------------------------------------------------------------------------------------
const viewChart = function ( )
{
  console.log( Product.clickArr );
  let ctx = document.getElementById( 'myCanvas' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar', //type of chart
    data: {
      labels: Product.nameArr,
      datasets: [

        // first DataSet
        {label: '# of clicks',
          data: Product.clickArr,
          backgroundColor:
            'rgba(255, 99, 132, 0.2)',
          borderColor:
            'rgba(255, 99, 132, 1)',

          borderWidth: 1
        }, // dont forget the comma !

        // second DataSet
        {label: '# of times shown',
          data: Product.shownArr,
          backgroundColor:
            'rgba(153, 102, 255, 0.2)',
          borderColor:
            'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }


      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );




};

//------------------------------------------------------------------------------------

const viewResults = function ( )
{

  const parentElement = document.getElementById ( 'resultList' );

  for ( let i = 0 ; i < Product.all.length ;i++ )
  {
    Product.shownArr.push( Product.all[i].shown );
    Product.clickArr.push( Product.all[i].clicks );

    const liElement = document.createElement ( 'li' );
    parentElement.appendChild( liElement );

    liElement.textContent = `${Product.all[i].name} has ( ${Product.all[i].clicks} ) votes, and was seen ( ${Product.all[i].shown} ) times`;
  }

  console.log( 'result : ' + Product.clickArr );

  viewChart();
};

//------------------------------------------------------------------------------------


renderNewProduct();

imageSection.addEventListener( 'click', handelClick );

//------------------------------------------------------------------------------------

// Helper function
function randomNumber( min, max ) {

  let leftIndex;
  let middleIndex ;
  let rightIndex ;


  do {
    leftIndex = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  } while( leftIndex === prevRandomNumArr[0] // not showing pictures in subsequent itirations
    || leftIndex === prevRandomNumArr[1] || leftIndex === prevRandomNumArr[2] );


  do {
    middleIndex = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  } while( leftIndex === middleIndex || // not showing pictures in same itiration
     middleIndex === prevRandomNumArr[0] // not showing pictures in subsequent itirations
    || middleIndex === prevRandomNumArr[1] || middleIndex === prevRandomNumArr[2] );

  do {
    rightIndex = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  } while( middleIndex === rightIndex || rightIndex === leftIndex ||
    rightIndex === prevRandomNumArr[0] // not showing pictures in subsequent itirations
    || rightIndex === prevRandomNumArr[1] || rightIndex === prevRandomNumArr[2] );


  prevRandomNumArr = [leftIndex,middleIndex,rightIndex]; // saves set of randoms to compare with it next itiration

  return [leftIndex,middleIndex,rightIndex];
}


