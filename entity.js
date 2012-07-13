function Entity( position ){
    this.position = position;
    this.icon = new Image();
    this.icon.src = "http://www.google.com/logos/pacman10-hp-sprite-2.png";
    this.direction = "";
    this.nextMove = "";
    this.speed = 6.5; //steps / sec
}


Entity.prototype = {
    mapToVector: {
        37: new Vector( -1, 0 ),
        38: new Vector( 0, -1 ),
        39: new Vector( 1, 0 ),
        40: new Vector( 0, 1 )
    },
    mapToDirection: {
        37: "W",
        38: "N",
        39: "E",
        40: "S"
    },
    DirectionToVector: {
        "":  new Vector( 0, 0 ),
        "W": new Vector( -1, 0 ),
        "N": new Vector( 0, -1 ),
        "E": new Vector( 1, 0 ),
        "S": new Vector( 0, 1 )
    },
    drawFrame: function(){
        if( this.nextMove.length != 0 ){
            var testpos = this.position.round( 0.1 ).add( 
                this.DirectionToVector[ this.nextMove ]
            );
            if( !this.collides( testpos ) ){
                this.position = this.position.round( 0.1 );
                this.direction = this.nextMove;
                this.nextMove = '';
            }
        }
        var newpos = this.position.add( 
            this.DirectionToVector[ this.direction ].scale( this.speed * this.platform.datediff / 1000 )
        );
        if( !this.collides( newpos ) ){
            this.position = newpos;
        }

        var g = this.position.scale( this.platform.step );
        var p = this.icon.spritePosition;
        var s = this.icon.size;
        this.platform.bullets.remove( this.position.round( 0.5 ) );
        this.platform.ctx.drawImage( this.icon, p[ 0 ], p[ 1 ], s[ 0 ], s[ 1 ], g.x, g.y, platform.step, platform.step );
    },
    collides: function( point ){
        return  point.y < 0 ||
                point.y > this.platform.rows - 1 ||
                point.x < 0 ||
                point.x > this.platform.columns - 1 ||
                this.platform.walls.contains( new Point( Math.floor( point.x ), Math.floor( point.y ) ) ) ||
                this.platform.walls.contains( new Point( Math.floor( point.x ), Math.ceil( point.y ) ) ) ||
                this.platform.walls.contains( new Point( Math.ceil( point.x ), Math.floor( point.y ) ) ) ||
                this.platform.walls.contains( new Point( Math.ceil( point.x ), Math.ceil( point.y ) ) );
    },
}

function Pacman( position ){
    Entity.call( this, position );
    
    this.states = {
        '':  [
            [ 42, 2 ],
            [ 2,  2 ],
            [ 22, 2 ],
            [ 2,  2 ]
        ],
        'W': [ 
            [ 42, 2 ],
            [ 2,  2 ],
            [ 22, 2 ],
            [ 2,  2 ]
        ],
        'E': [
            [ 42, 2 ],
            [ 2,  22 ],
            [ 22, 22 ],
            [ 2,  22 ]
        ],
        'N': [
            [ 42, 2 ],
            [ 2,  42 ],
            [ 22, 42 ],
            [ 2,  42 ]
        ],
        'S': [
            [ 42, 2 ],
            [ 2,  62 ],
            [ 22, 61 ],
            [ 2,  62 ]
        ]
    };
    this.icon.spritePosition = this.states.W[ 0 ];
    this.icon.state = 0;
    this.icon.size = [ 16, 16 ];
    
    var that = this;
    
    setInterval( function(){
        that.icon.state = that.icon.state == 3 ? 0 : that.icon.state + 1;
        that.icon.spritePosition = that.states[ that.direction ][ that.icon.state ];
    }, 100 );
    
    
    // Captures keydown event
    var that = this;
    window.onkeydown = function( e ){
        if( [ 37, 38, 39, 40 ].contains( e.which ) ){
            that.nextMove = that.mapToDirection[ e.which ];
        }
    }
    setTimeout( function(){
        that.direction = "W";
    }, 1000 );
}
Pacman.prototype = {
    constructor: Pacman
}
Pacman.extend( Entity );





/*

function Blinky( position ){
    this.prototype = new Entity( position );
    this.icon = new Image();
    this.icon.src = 'blinky.png';
    this.evaluate = ghostEvaluate;
}
Blinky.extend( Entity );
function Pinky( position ){
    this.prototype = new Entity( position );
    this.icon = new Image();
    this.icon.src = "pinky.png";
    this.evaluate = ghostEvaluate;
}
Pinky.extend( Entity );
function Inky( position ){
    this.prototype = new Entity( position );
    this.icon = new Image();
    this.icon.src = "inky.png";
    this.evaluate = ghostEvaluate;
}
Inky.extend( Entity );
function Clyde( position ){
    this.prototype = new Entity( position );
    this.icon = new Image();
    this.icon.src = "clyde.png";
    this.evaluate = ghostEvaluate;
}
Clyde.extend( Entity );
*/
function ghostEvaluate(){
    return new Vector( "W" );
}

