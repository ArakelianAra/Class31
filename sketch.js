//NAME SPACING
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground
var rope
let engine;
let world;
var fruit
var fruitcon
var backgroundImg
var rabbitImg
var melonImg
var bunny
var button
var blink
var sad
var eat
function preload(){
  backgroundImg = loadImage('background.png');
  melonImg=loadImage("melon.png")
  rabbit = loadImage('Rabbit-01.png');
  eat = loadAnimation("eat_0.png","eat_1.png", "eat_2.png","eat_3.png","eat_4.png")
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  
  sad.playing= true
  sad.looping=false;
  blink.playing = true;
  eat.playing=true;
  eat.looping=false;
}


function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world; 

  button=createImg("cut_btn.png")
  button.position(190,30)
  button.size(50,50)
  button.mouseClicked(drop)

  ground=new Ground(200,690,600,20)
  rope=new Rope(6,{x:200,y:30})
  fruit = Bodies.circle(200,300,20)
  Composite.add(rope.body, fruit);
  fruitcon=new Link(rope,fruit)

  blink.frameDelay = 20
  eat.frameDelay=20
  sad.frameDelay=20
  
  bunny=createSprite(250,650)
  bunny.scale=0.2

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying",sad);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,width,height)

  Engine.update(engine);
   ground.display()
   rope.show()
   if(fruit!=null){
    image(melonImg,fruit.position.x,fruit.position.y,65,65)
   }
   if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eating")
   }
   if(collide(fruit,ground.body.position)==true){
     bunny.changeAnimation("crying")
   }
   drawSprites()
}

function drop(){
  rope.break()
  fruitcon.detach()
}

function collide(body, sprite){
  if(body!=null){
    var d=dist(body.position.x,body.position.y,sprite.x,sprite.y)
    console.log(d)
    if(d<=70){
      World.remove(world,fruit)
      //null = empty/nothing
      fruit=null

      return true;
    }
    else{
      return false;
    }

  }
    
}

