function Entity( position ){
    this.position = position;
    this.icon = new Image();
    this.icon.src = "http://www.google.com/logos/pacman10-hp-sprite-2.png";
    this.direction = "";
    this.nextMove = "";
    this.speed = 6.5; //steps / sec
}


Entity.prototype = {
    drawFrame: function(){
        if( this.nextMove.length != 0 ){
            var testpos = this.position.round( 0.1 ).add( 
                Directions.DirectionToVector[ this.nextMove ]
            );
            if( !this.collides( testpos ) ){
                this.position = this.position.round( 0.5 );
                this.direction = this.nextMove;
                // forcing the entity to change it's direction before next icon update
                this.icon.spritePosition = this.states[ this.direction ][ this.icon.state ];
                this.nextMove = '';
            }
        }
        var newpos = this.position.add( 
            Directions.DirectionToVector[ this.direction ].scale( this.speed * this.platform.datediff / 1000 )
        );
        newpos = newpos.x < -1 ? new Point( this.platform.columns, newpos.y ) : newpos;
        newpos = newpos.x > this.platform.columns ? new Point( -1, newpos.y ) : newpos;

        if( this.collides( newpos ) ){
            this.position = this.position.round( 0.5 );
        }
        else{
            this.position = newpos;
        }

        var g = this.position.scale( this.platform.step );
        var p = this.icon.spritePosition;
        var s = this.icon.size;
        this.platform.ctx.drawImage( this.icon, p[ 0 ], p[ 1 ], s[ 0 ], s[ 1 ], g.x - 5, g.y - 5, platform.step + 10, platform.step + 10 );
    },
    collides: function( point ){
        var ret =   !( point.y == 14 && point.x <= 1 ) &&
                    !( point.y == 14 && point.x >= this.platform.columns - 2 ) &&
                    (
                        point.y < 1 ||
                        point.y > this.platform.rows - 2 ||
                        point.x < 1 ||
                        point.x > this.platform.columns - 2 ||
                        this.platform.walls.contains( new Point( Math.floor( point.x ), Math.floor( point.y ) ) ) ||
                        this.platform.walls.contains( new Point( Math.floor( point.x ), Math.ceil( point.y ) ) ) ||
                        this.platform.walls.contains( new Point( Math.ceil( point.x ), Math.floor( point.y ) ) ) ||
                        this.platform.walls.contains( new Point( Math.ceil( point.x ), Math.ceil( point.y ) ) )
                    );

        return ret;
    },
}

function Pacman( position ){
    Entity.call( this, position );
    
    this.states = pacman.states;
    this.icon.spritePosition = this.states.W[ 0 ];
    this.icon.state = 0;
    this.icon.size = [ 16, 16 ];
    
    var that = this;
    
    setInterval( function(){
        that.icon.state = that.icon.state == 3 ? 0 : that.icon.state + 1;
        that.icon.spritePosition = that.states[ that.direction ][ that.icon.state ];
    }, 80 );
    
    
    // Captures keydown event
}

Pacman.prototype = {
    constructor: Pacman,
    drawFrame: function(){
        this.Entity_drawFrame();

        if( this.platform.bullets.remove( this.position.round( 0.5 ) ) ){
            AudioPlayer.consume();
            this.platform.score += 10;
        }
        if( this.platform.energizers.remove( this.position.round( 0.5 ) ) ){
            this.platform.energize();
            this.platform.score += 50;
        }
    }
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

