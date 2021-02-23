
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;

var treeObj, stoneObj, groundObj, sling;
var mango1, mango2, mango3;
var world, boy;

function preload() {
  boy = loadImage("images/boy.png");
}

function setup() {
  createCanvas(1300, 600);
  engine = Engine.create();
  world = engine.world;

  mango1 = new mango(1100, 100, 30);
  mango2 = new mango(1200, 230, 30);
  mango3 = new mango(1000, 230, 30);

  stoneObj = new Stone(240, 420, 30);
  treeObj = new tree(1050, 580);
  groundObj = new ground(width / 2, 600, width, 20);
  sling = new Slingshot(stoneObj.body, { x: 230, y: 420 });
  Engine.run(engine);
}

function draw() {

  background(230);
  //Add code for displaying text here!
  image(boy, 200, 340, 200, 300);

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();

  stoneObj.display();
  sling.display();
  groundObj.display();

  detectCollision(stoneObj, mango1);
  detectCollision(stoneObj, mango2);
  detectCollision(stoneObj, mango3);
}

function mouseDragged() {
  Matter.Body.setPosition(stoneObj.body, { x: mouseX, y: mouseY });

}
function mouseReleased() {
  sling.fly();
}

function KeyPressed(){
  if (keyCode == "space"){
    Matter.Body.setPosition(stoneObj.body, {x:230, y:390});
    sling.attach(stoneObj.body);
  }
}

function detectCollision(lstone, lmango){
  stoneObjPos = lstone.body.position;
  mangoPos = lmango.body.position;

  var distance = dist(stoneObjPos.x, stoneObjPos.y, mangoPos.x, mangoPos.y);
  if(distance <= lmango.r + lstone.r){
    Matter.Body.setStatic(lmango.body, false);
  }
}