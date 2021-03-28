/* eslint-disable no-unused-vars */
'use strict';
const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water', 'glass'];

let left;
let mid;
let right;
let start = 1;

const imgSec = document.getElementById('imgSec');
const leftImage = document.getElementById('leftImage');
const midImage = document.getElementById('midImage');
const rightImage = document.getElementById('rightImage');
let randomGen = [];

function products(productNames) {
  this.productNames = productNames;
  this.imgPath = `./img/products/${productNames}.jpg`;
  this.vote = 0;
  this.viewCount = 0;
  products.all.push(this);
  if (productNames === 'usb') {
    this.imgPath = `./img/products/${productNames}.gif`;
  }
  // console.table(products.all);
}

products.all = [];
for (let i = 0; i < productNames.length; i++) {
  new products(productNames[i]);
}

function render() {
  let left = randomNumber(0, products.all.length - 1);
  // console.log('let', left, products.all[left].imgPath);
  randomGen.push(left);

  leftImage.src = products.all[left].imgPath;
  leftImage.alt = products.all[left].productNames;
  leftImage.title = products.all[left].productNames;
  products.all[left].viewCount++;


  let right = randomNumber(0, products.all.length - 1);
  while (right === randomGen[0]) {
    right = randomNumber(0, products.all.length - 1);
  }
  randomGen.push(right);

  rightImage.src = products.all[right].imgPath;
  rightImage.alt = products.all[right].productNames;
  rightImage.title = products.all[right].productNames;
  products.all[right].viewCount++;
  let mid = randomNumber(0, products.all.length - 1);
  while (mid === randomGen[0] || mid === randomGen[1]) {
    mid = randomNumber(0, products.all.length - 1);
  }
  randomGen.push(mid);
  midImage.src = products.all[mid].imgPath;
  midImage.alt = products.all[mid].productNames;
  midImage.title = products.all[mid].productNames;
  products.all[mid].viewCount++;

  randomGen.length = 0;

}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

imgSec.addEventListener('click', timeClicked);
function timeClicked(event) {
  if (start <= 25) {


    if (event.target.id !== 'imgSec')
      for (let i = 0; i < products.all.length; i++) {
        if (products.all[i].productNames === event.target.title)
          // products.all[i].viewCount++;
          products.all[i].vote++;

      }
    console.table(products.all);

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
  for (let i = 0; i < productNames.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = `${productNames[i]} has ${products.all[i].vote}.and was seen ${products.all[i].viewCount}`;
    unorderdList.appendChild(listItem);
  }
  document.getElementById('btn').textContent="Reset";
  document.getElementById('btn').removeEventListener('click', list);
  render();
}


render();


