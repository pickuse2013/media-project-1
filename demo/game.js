var game = new Phaser.Game(1024, 608, Phaser.CANVAS, 'phaser-example', {
//var game = new Phaser.Game(1366, 768, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    game.load.tilemap('desert', '../examples/assets/tilemaps/maps/desert.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.tilemap('desert', 'desert.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '../examples/assets/tilemaps/tiles/tmw_desert_spacing.png');
    game.load.image('car', '../examples/assets/sprites/car90.png');

}

var map;
var layer;

var cursors;
var sprite;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('desert');

    map.addTilesetImage('Desert', 'tiles');
	
	map.setCollisionBetween(1, 2);
	map.setCollisionBetween(8, 10);
	map.setCollisionBetween(16, 18);

	
    layer = map.createLayer('Ground');

    layer.resizeWorld();

    sprite = game.add.sprite(450, 80, 'car');
    sprite.anchor.setTo(0.5, 0.5);

    game.physics.enable(sprite);

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(fillTiles, this);

}

function fillTiles() {

    map.fill(31, layer.getTileX(sprite.x), layer.getTileY(sprite.y), 8, 8);

}

function update() {

    game.physics.arcade.collide(sprite, layer);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;

    if (cursors.left.isDown) {
        sprite.body.angularVelocity = -200;
    } else if (cursors.right.isDown) {
        sprite.body.angularVelocity = 200;
    }

    if (cursors.up.isDown) {
        sprite.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(sprite.angle, 300));
    }

}

function render() {

    //game.debug.text('Click to fill tiles', 32, 32, 'rgb(0,0,0)');
    game.debug.text('Tile X: ' + layer.getTileX(sprite.x), 32, 48, 'rgb(0,0,0)');
    game.debug.text('Tile Y: ' + layer.getTileY(sprite.y), 32, 64, 'rgb(0,0,0)');

}
