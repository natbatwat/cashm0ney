var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('banknote', 'assets/banknote.png');
    game.load.image('fire', 'assets/fire.png');
    game.load.image('lab', 'assets/lab.png');
    game.load.image('paperplane', 'assets/paperplane.png');
}

var platforms;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#A6ECDF";
    
    plane = game.add.sprite(game.world.centerX, game.world.centerY, 'paperplane');

    emitter = game.add.emitter(game.world.centerX, 0, 100);
    emitter.makeParticles('banknote');

    emitter.minParticleSpeed.setTo(-300, 30);
    emitter.maxParticleSpeed.setTo(300, 100);
    emitter.gravity = 50;

    //  This will emit a quantity of 5 particles every 500ms. Each particle will live for 2000ms.
    emitter.flow(5000, 1000, 3, -1);

    platforms = game.add.group();
    platforms.enableBody = true;

    game.input.addMoveCallback(move, this);

}

function move(pointer, x, y){
    plane.x = x;
    plane.y = y;
}

function collectedMoney()

function update() {
}