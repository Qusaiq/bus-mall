/* eslint-disable no-unused-vars */
'use strict';
const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water', 'glass'];

let left;
let mid;
let right;
let start = 1;
let votes=[];
let views=[];

const imgSec = document.getElementById('imgSec');
const leftImage = document.getElementById('leftImage');
const midImage = document.getElementById('midImage');
const rightImage = document.getElementById('rightImage');
let randomGen = [];

function Product(productNames) {
  this.productNames = productNames;
  this.imgPath = `./img/products/${productNames}.jpg`;
  this.vote = 0;
  this.viewCount = 0;
  Product.all.push(this);
  if (productNames === 'usb') {
    this.imgPath = `./img/products/${productNames}.gif`;
  }
  // console.table(products.all);
}

Product.all = [];
for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i]);
}

function render() {
  let left = randomNumber(0, Product.all.length - 1);
  // console.log('let', left, products.all[left].imgPath);
  randomGen.push(left);

  leftImage.src = Product.all[left].imgPath;
  leftImage.alt = Product.all[left].productNames;
  leftImage.title = Product.all[left].productNames;
  Product.all[left].viewCount++;


  let right = randomNumber(0, Product.all.length - 1);
  while (right === randomGen[0]) {
    right = randomNumber(0, Product.all.length - 1);
  }
  randomGen.push(right);

  rightImage.src = Product.all[right].imgPath;
  rightImage.alt = Product.all[right].productNames;
  rightImage.title = Product.all[right].productNames;
  Product.all[right].viewCount++;
  let mid = randomNumber(0, Product.all.length - 1);
  while (mid === randomGen[0] || mid === randomGen[1]) {
    mid = randomNumber(0, Product.all.length - 1);
  }
  randomGen.push(mid);
  midImage.src = Product.all[mid].imgPath;
  midImage.alt = Product.all[mid].productNames;
  midImage.title = Product.all[mid].productNames;
  Product.all[mid].viewCount++;

  randomGen.length = 0;

}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

imgSec.addEventListener('click', timeClicked);
function timeClicked(event) {
  if (start <= 25) {


    if (event.target.id !== 'imgSec')
      for (let i = 0; i < Product.all.length; i++) {
        if (Product.all[i].productNames === event.target.title)
          // products.all[i].viewCount++;
          Product.all[i].vote++;

      }
    console.table(Product.all);

    start++;
    render();
  }
  else {
    console.log('done');
    imgSec.removeEventListener('click', timeClicked);
    document.getElementById('btn').style.visibility = 'visible';
  }
  // let x= productNames.indexOf(event.target.title);
  // productNames.splice(x,1);
  // products.all.splice(x,1) ;
  // console.log(products.all);
}

document.getElementById('btn').addEventListener('click', list);
function list(event) {
  let unorderdList = document.getElementById('unorderList');
  for (let i = 0; i < Product.all.length; i++) {
    votes.push(Product.all[i].vote);
    views.push(Product.all[i].viewCount);
    // const listItem = document.createElement('li');
    // listItem.textContent = `${productNames[i]} has ${Product.all[i].vote}.and was seen ${Product.all[i].viewCount}`;
    // unorderdList.appendChild(listItem);
  }
  // document.getElementById('btn').textContent="Reset";
  document.getElementById('btn').removeEventListener('click', list);
  console.log('votes :',votes);
  console.log('views :',views);
  chartRender();
  render();
}

function chartRender(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productNames,
      datasets: [{
        label: 'Products Votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: votes
      
      },
      {
        label: 'Products Views',
        backgroundColor: 'yellow',
        borderColor: 'rgb(255, 99, 132)',
        data: views
      }]
    },

    // Configuration options go here
    // options: {}
  });

}
render();


