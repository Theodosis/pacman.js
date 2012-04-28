function Entity( position ){
    this.position = position;
    this.icon = new Image();
    this.icon.src = "http://www.google.com/logos/pacman10-hp-sprite-2.png";
    this.direction = "W";
    this.nextMove = "W";
}

Entity.prototype = {
    drawFrame: function(){
        var g = this.position.scale( this.platform.step );
        var p = this.icon.pos;
        var s = this.icon.size;
        this.platform.ctx.drawImage( this.icon, p[0], p[1], s[0], s[1], g.x, g.y, platform.step, platform.step );
    },
    collides: function( point ){
        return  point.y < 0 ||
                point.y > this.platform.rows - 1 ||
                point.x < 0 ||
                point.x > this.platform.columns - 1;
    },
    move: function( vec ){
        var point = this.position.add( vec );
        if( this.collides( point ) ){
            return false;
        }
        this.nextMove = direction;
        this.position = point;
    },

}

function Pacman( position ){
    Entity.call( this, position );
    
    this.states = {
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
            [ 22, 62 ],
            [ 2,  62 ]
        ]
    };
    this.icon.pos = this.states.W[ 0 ];
    this.icon.state = 0;
    this.icon.size = [ 16, 16 ];
    
    var that = this;
    
    setInterval( function(){
        that.icon.state = that.icon.state == 3 ? 0 : that.icon.state + 1;
        that.icon.pos = that.states[ that.direction ][ that.icon.state ];
    }, 100 );
    
    
    // Captures keydown event
    var that = this;
    window.onkeydown = function( e ){
        var mapToVector = {
            37: new Vector( -1, 0 ),
            38: new Vector( 0, -1 ),
            39: new Vector( 1, 0 ),
            40: new Vector( 0, 1 )
        };
        var mapToDirection = {
            37: "W",
            38: "N",
            39: "E",
            40: "S"
        };
        if( [ 37, 38, 39, 40 ].contains( e.which ) ){
            that.move( mapToVector[ e.which ] ); 
            that.direction = mapToDirection[ e.which ];
        }
    }
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

