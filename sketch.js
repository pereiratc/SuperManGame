

// PLEASE OPEN INDEX.HTML WITH MOZILLA FIREFOX //

var score = [0, 'SCORE: ', 745, 20];
var explosion;
var meteors = [];
var GRAVITY = 0.2;
var superman;
var meteor;
var title = ['SUPERMAN APOCALYPSE', 132, 80];
var state = 0;
//var themesong;
var img1;
var img2;
var helptext = ['Use Left and Right Arrows to move left and right', 100, 390];
var helptext2 = ['Press ENTER to save the world from the meteor shower!', 30, 480];
var helptext3 = ['Use UP ARROW to destroy the meteors', 145, 435];
var button = {
  x: 300,
  y: 370,
  height: 60,
  width: 210,
  textbutton: "PLAY GAME",
  tx: 318,
  ty: 412,
}
var i = 0;

function preload() {
  img1 = loadImage("assets/skyline.jpg");
  img2 = loadImage('assets/superman_logo.png');

  //themesong = loadSound('supermanthemesong.mp3')

}

function setup() {
  createCanvas(820, 675);

  img1.resize(820, 675);
  image(img1);

  img2.resize(300, 210);

  //themesong.setVolume(1);
  //themesong.play();

  superman = createSprite(400, 590);
  var supermanAnimation = superman.addAnimation("floating", "assets/superman1new.png", "assets/superman3new.png");
  superman.addAnimation("punching", "assets/punch1.png", "assets/punch6.png");

}

function draw() {

  if (state == 0) {

    // Play button design
    fill('#e6ffff');
    strokeWeight(6);
    stroke('#0f1f3d');

    image(img2, 260, 120);

    // Play button click and mouseover 
    if (state == 0 && mouseX > button.x && mouseY > button.y && mouseX < 530 && mouseY < 430) {
      cursor(HAND);
      stroke(255, 0, 0);
      fill('#0f1f3d');
      // console.log("ac");
    } else {
      cursor(ARROW)
    }

    // Play button      
    rect(button.x, button.y, button.width, button.height);
    textSize(30);
    textFont('Lucida Console');
    fill('#ffff00');
    strokeWeight(7);
    stroke('#ff3300');
    text(button.textbutton, button.tx, button.ty);


    // Title state 0
    strokeWeight(3);
    fill(0);
    textSize(45);
    text(title[0], title[1], title[2]);
  }

  if (state == 1) {

    // Images state 1
    image(img1);
    image(img2, 260, 120); //superman logo

    // Help text
    fill(255, 255, 255);
    strokeWeight(2);
    textSize(30);
    stroke('#0f1f3d');
    text(helptext[0], helptext[1], helptext[2]);
    text(helptext3[0], helptext3[1], helptext3[2]);
    text(helptext2[0], helptext2[1], helptext2[2]);
    


    drawSprites()

    //Title state 1
    strokeWeight(3);
    stroke('#ff3300');
    fill(0);
    textSize(45);
    text(title[0], title[1], title[2]);

    borders();
    movement();


  }
  if (state == 2) {

    //background state2
    image(img1);
    drawSprites();
    borders();
    movement();

    //create meteor & meteor speed
    for (; i < 5; i++) {
      meteor = createSprite(random(0, width), 0);
      var meteorAnimation = meteor.addAnimation("falling", "assets/meteor1.png", "assets/meteor8.png");
      meteor.velocity.y = (random(1, 6))
      meteors.push(meteor)

    }
    //meteor position
    for (let j = 0; j < meteors.length; j++) {

      if (meteors[j].position.y > 675) {
        meteors[j].position.x = random(0, width);
        meteors[j].position.y = -50;

      }
    //meteor-superman collide & score
      if (meteors[j].collide(superman) && keyIsDown(UP_ARROW)) {
      	explosion = createSprite(meteors[j].position.x, meteors[j].position.y);
  		var explosionAnimation = explosion.addAnimation("explode", "assets/exp1.png", "assets/exp5.png");
        meteors[j].position.x = random(0, width);
        meteors[j].position.y = -50; 
        explosion.life = 20; 
        if (explosion.life === 20) {
        	score[0] += 1;
        }    
      }
    }
  text(score[1]+ score[0], score[2], score[3]);
 } 	  
}

function mousePressed() {
  if (state == 0 && mouseX > button.x && mouseY > button.y && mouseX < 530 && mouseY < 430) {
    state = 1;
  }
}

function keyPressed() {
  if (state == 1 && keyCode === ENTER) {
    state = 2;
  }
}
//movement functions
function movement() {
  if (keyIsDown(LEFT_ARROW)) {
    superman.changeAnimation("floating");
    superman.mirrorX(-1);
    superman.position.x -= 10;
  } else if (keyIsDown(RIGHT_ARROW)) {
    superman.changeAnimation("floating");
    superman.mirrorX(1);
    superman.position.x += 10;
  }
  if (keyIsDown(UP_ARROW)) {
    superman.changeAnimation("punching");
  } else {
    superman.changeAnimation("floating");
  }

}
//borders function
function borders() {
  if (superman.position.x < 0) {
    superman.changeAnimation("floating");
    superman.mirrorX(-1);
    superman.position.x = 800;
  }

  if (superman.position.x > width) {
    superman.changeAnimation("floating");
    superman.mirrorX(1);
    superman.position.x = 0;
  }
}
