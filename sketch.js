
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world,database;
var  dog, happyDog, database, foodS, foodStock,dogImg,happyDogImg;
var x;
function preload(){
dogImg=loadImage("Dog.png");
happyDogImg=loadImage("happydog.png");
}
function setup(){
  var canvas = createCanvas(500,500);
  database = firebase.database();
  dog=createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.5;
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}
function draw(){
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}
drawSprites();
fill("red");
textSize(40);
text("Food left:"+foodS,0,40);
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
database.ref("/").update({
  Food:x
})
}