/******************************************************

	Example from p5.speech library
	http://ability.nyu.edu/p5.js-speech/

******************************************************/

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)


/* 
	Store poem text into a variable
*/
var poemText = "It is the invisible\n" + 
			"Dark matter we are not made of\n" +
			"That I am afraid of\n" +
			"Most of the universe consists of this\n\n" +

            "I put a single normal ice cube\n" +
            "In my drink\n" +
            "It weighs one hundred million tons\n" + 
            "It is a sample from the densest star\n\n" +

            "I read my way across \n" +
            "The awe I wrote\n" +
            "That you are reading now.\n" +
            "I can't believe that you are there\n\n" +

            "Except you aren’t. I wonder what\n" +
            "Cosmologists don't know\n" +
            "That could be everything\n" + 
            "There is.\n\n" +

            "The someone looking at the page\n" +
            "Could be the everything there is,\n" +
            "Material that shines,\n" + 
            "Or shined.\n\n" +

            "Dark matter is another\n" +
            "Matter. Cosmologists don't know.\n" +
            "The physicists do not.\n" +
            "The stars are not.\n\n" +

            "Another thing beside\n" +
            "The row of things is\n" +
            "Standing there. It is invisible\n" +
            "And reads without a sound.\n\n" +

            "It doesn't matter\n" +
            "That it doesn't really.\n" + 
            "I need to take its hand\n" +
            "To cross the street."



/* 
	Create a variable for each image
*/
var universeImage, standImage, icecubesImage, youImage, shineImage, nowImage, handImage, starImage;

var bg;
/*
	These values change to "true" once the word is recognized,
	in the parseResult() function.
*/
var saidUniverse = false;
var saidStand = false;
var saidIce = false;
var saidYou = false;
var saidShine = false;
var saidNow = false;
var saidHand = false;
var saidStar = false;

// ImageObject is used to move each image
function ImageObject(xPos, yPos, xSpeed, ySpeed) {
	this.x = xPos;
	this.y = yPos;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;

	this.move = function() {
		this.x += this.xSpeed;
		
		if (this.x > windowWidth || this.x < 0)  {
	   		this.xSpeed = -this.xSpeed;
		}

		this.y += this.ySpeed;

		if (this.y > windowHeight || this.y < 0)  {
	   		this.ySpeed = -this.ySpeed;
		}
	}

}

function preload() {

	// Load all images here, using the variables you created.	
	universeImage = loadImage("imgs/universe.jpg");
	standImage = loadImage("imgs/stand.jpg");	
	icecubesImage = loadImage("imgs/icecubes.jpg");
	youImage = loadImage("imgs/you.jpg");
	shineImage = loadImage("imgs/shine.jpg");
	nowImage = loadImage("imgs/now.jpg");
	handImage = loadImage ("imgs/hand.jpg");
	starImage = loadImage("imgs/star.png");
}

function setup(){

	createCanvas(windowWidth, windowHeight);
	bg = loadImage("imgs/BackgroundPoem.jpg");

	/* 
		Create a new Object for each image using ImageObject(xPos, yPos, xSpeed, ySpeed)
		set a random value for xPos, yPos, xSpeed, ySpeed
	*/
	universeObject = new ImageObject(random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
	standObject = new ImageObject(random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
    icecubesObject = new ImageObject(random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
    youObject = new ImageObject(random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
    shineObject = new ImageObject(random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
    nowObject = new ImageObject(random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
    handObject = new ImageObject(random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
    starObject = new ImageObject (random(0, width-100), random(0, height-100), random(0.5, 1.5), random(0.5, 1.5));
	/*
		Speech recognition stuff
	*/
	myRec.onResult = parseResult; // recognition callback
	myRec.start(); // start engine
}

function draw(){

	background(bg);

	/* 
		Display poem text

	*/
	
	
    
	/* 
		Check if each word is said.
		If yes, display the image, then move it.
	*/
	if (saidUniverse) {
		imageMode(CENTER);
		//Display the image, using the existing image variable.
		image(universeImage, universeObject.x, universeObject.y);
		// Move the image using the existing image object.		
		universeObject.move();
	}

	if (saidStand) {
		imageMode(CENTER);
		image(standImage, standObject.x, standObject.y);		
		standObject.move();
	}
	
    if (saidIce) {
        imageMode(CENTER);
		image(icecubesImage, icecubesObject.x, icecubesObject.y);		
		icecubesObject.move();
	}
	
	if (saidYou) {
        imageMode(CENTER);
		image(youImage, youObject.x, youObject.y);		
		youObject.move();
	}
	if (saidShine) {
        imageMode(CENTER);
		image(shineImage, shineObject.x, shineObject.y);		
		shineObject.move();
	}
	if (saidNow) {
        imageMode(CENTER);
		image(nowImage, nowObject.x, nowObject.y);		
		nowObject.move();
	}
	if (saidHand) {
        imageMode(CENTER);
		image(handImage, handObject.x, handObject.y);		
		handObject.move();
	}
	if (saidStar) {
        imageMode(CENTER);
		image(starImage, starObject.x, starObject.y);		
		starObject.move();
	}
	textSize(13);
	textAlign(CENTER);
	fill(255, 255, 255);
	noStroke();
	text(poemText, windowWidth/2, 30);
}

function parseResult(){
	// recognition system will often append words into phrases.
	// so hack here is to only use the last word:
	var mostrecentword = myRec.resultString.split(' ').pop();
	if(mostrecentword.indexOf("universe")!==-1 || mostrecentword.indexOf("Universe")!==-1) {
		saidUniverse = true;
		console.log("SAID UNIVERSE");
	}

	else if(mostrecentword.indexOf("stand")!==-1 || mostrecentword.indexOf("Stand")!==-1) {
		saidStand = true;
		console.log("SAID STAND");
	}

	else if(mostrecentword.indexOf("ice")!==-1 || mostrecentword.indexOf("Ice")!==-1) {
		saidIce = true;
		console.log("SAID ICE");
	}
    
		else if(mostrecentword.indexOf("you")!==-1 || mostrecentword.indexOf("you")!==-1) {
		saidYou = true;
		console.log("SAID YOU");
	}
	else if(mostrecentword.indexOf("shine")!==-1 || mostrecentword.indexOf("shine")!==-1) {
		saidShine = true;
		console.log("SAID SHINE");
	}
	else if(mostrecentword.indexOf("now")!==-1 || mostrecentword.indexOf("now")!==-1) {
		saidNow = true;
		console.log("SAID NOW");
	}
	else if(mostrecentword.indexOf("hand")!==-1 || mostrecentword.indexOf("hand")!==-1) {
		saidHand = true;
		console.log("SAID HAND");
	}
	else if(mostrecentword.indexOf("star")!==-1 || mostrecentword.indexOf("star")!==-1) {
		saidStar = true;
		console.log("SAID STAR");
	}
	console.log(mostrecentword);

	}
