/* eslint-disable no-unused-vars */
'use strict';
const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water', 'glass'];
let left = 0;
let mid = 0;
let right = 0;
let start = 1;
let votes = [];
let views = [];
let iterationDub = [];
let storage = localStorage;

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


}
function storeData() {
  let storeData = JSON.stringify(Product.all);
  storage.setItem('products', storeData);
}
function getData() {
  let getData = localStorage.getItem('products');

  let normalData = JSON.parse(getData);
  console.log(normalData);
  list();
}

Product.all = [];
for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i]);
}
left = randomNumber(0, Product.all.length - 1);
mid = randomNumber(0, Product.all.length - 1);
right = randomNumber(0, Product.all.length - 1);
iterationDub[0] = left;
iterationDub[1] = mid;
iterationDub[2] = right;

function render() {

  while (left === mid || mid === right || left === right || iterationDub.includes(left) || iterationDub.includes(mid) || iterationDub.includes(right)) {
    left = randomNumber(0, Product.all.length - 1);
    mid = randomNumber(0, Product.all.length - 1);
    right = randomNumber(0, Product.all.length - 1);
  }
  iterationDub[0] = left;
  iterationDub[1] = mid;
  iterationDub[2] = right;

  leftImage.src = Product.all[left].imgPath;
  leftImage.alt = Product.all[left].productNames;
  leftImage.title = Product.all[left].productNames;
  Product.all[left].viewCount++;


  rightImage.src = Product.all[right].imgPath;
  rightImage.alt = Product.all[right].productNames;
  rightImage.title = Product.all[right].productNames;
  Product.all[right].viewCount++;

  midImage.src = Product.all[mid].imgPath;
  midImage.alt = Product.all[mid].productNames;
  midImage.title = Product.all[mid].productNames;
  Product.all[mid].viewCount++;



  // // if(iterationDub.includes(right)||iterationDub.includes(mid)||iterationDub.includes(left))
  // // {
  // //   right=randomNumber(0,Product.all.length-1);
  // //   mid=randomNumber(0,Product.all.length-1);
  // //   left=randomNumber(0,Product.all.length-1);
  // // }
  // // else{
  // //   leftImage.src = Product.all[left].imgPath;
  // //   leftImage.alt = Product.all[left].productNames;
  // //   leftImage.title = Product.all[left].productNames;
  // //   Product.all[left].viewCount++;
  // //   rightImage.src = Product.all[right].imgPath;
  // //   rightImage.alt = Product.all[right].productNames;
  // //   rightImage.title = Product.all[right].productNames;
  // //   midImage.src = Product.all[mid].imgPath;
  // //   midImage.alt = Product.all[mid].productNames;
  // //   midImage.title = Product.all[mid].productNames;
  // //   Product.all[mid].viewCount++;
  // // }
  randomGen.length = 0;
  console.log(iterationDub);
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
imgSec.addEventListener('click', timeClicked);
function timeClicked(event) {
  start++;
  if (start <= 25) {
    if (event.target.id !== 'imgSec')
      for (let i = 0; i < Product.all.length; i++) {
        if (Product.all[i].productNames === event.target.title)
          // products.all[i].viewCount++;
          Product.all[i].vote++;
      }
    console.table(Product.all);
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
    storeData();

    // const listItem = document.createElement('li');
    // listItem.textContent = `${productNames[i]} has ${Product.all[i].vote}.and was seen ${Product.all[i].viewCount}`;
    // unorderdList.appendChild(listItem);
  }
  console.log(storeData);
  // document.getElementById('btn').textContent="Reset";
  document.getElementById('btn').removeEventListener('click', list);
  console.log('votes :', votes);
  console.log('views :', views);
  chartRender();
  render();
}
function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
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
