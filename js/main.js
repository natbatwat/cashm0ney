var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('banknote', 'assets/banknote.png');
    game.load.image('fire', 'assets/fire.png');
    game.load.image('lab', 'assets/lab.png');
    game.load.image('paperplane', 'assets/paperplane.png');
}

var board;
var money;
var plane;
var emitter;
var moneyText;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#A6ECDF";
    
    money = 0;
    moneyText = game.add.text(600, 550,"$");

    plane = game.add.sprite(game.world.centerX, game.world.centerY, 'paperplane');

    emitter = game.add.emitter(game.world.centerX, 0, 100); // creating emitter 
    emitter.name = "money-maker"; // naming the emitter
    emitter.makeParticles('banknote'); // use banknote image as particle

    // emitter properties
    emitter.minParticleSpeed.setTo(-300, 30);
    emitter.maxParticleSpeed.setTo(300, 100);
    emitter.gravity = 50;
    emitter.flow(5000, 1000, 3, -1);

    game.physics.arcade.enable(plane);

    board = game.add.group();
    board.enableBody = true;
    board.physicsBodyType = Phaser.Physics.ARCADE;

    game.input.addMoveCallback(move, this);
}

function move(pointer, x, y){
    plane.x = x;
    plane.y = y;
}

function update() {
    game.physics.arcade.collide(emitter, plane, collectedMoney);
}

function collectedMoney() {
    money++;
    moneyText.setText("$" + money);

}