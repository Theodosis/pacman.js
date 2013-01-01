function Entity( position ){
    this.initPos = position;
    this.position = position;
    this.icon = new Image();
    this.icon.src = "http://www.google.com/logos/pacman10-hp-sprite-2.png";
    this.direction = "";
    this.nextMove = "";
    this.speed = 6.5; //steps / sec
}


Entity.prototype = {
    drawFrame: function(){
        if( !this.dead ){
            if( this.nextMove.length != 0 && this.canMove( this.position, Directions.directionToVector[ this.nextMove ] ) ) {
                this.position = this.position.round( 0.5 );
                this.direction = this.nextMove;
                // forcing the entity to change it's direction before next icon update
                this.icon.spritePosition = this.states[ this.direction ][ this.icon.state ];
                this.nextMove = '';
            }
            var newpos = this.move( this.position, 
                Directions.directionToVector[ this.direction ]
                    .scale( this.speed * this.platform.datediff / 1000 )
            );
            
            // instant transport
            newpos = newpos.x < -1 ? new Point( this.platform.columns, newpos.y ) : newpos;
            newpos = newpos.x > this.platform.columns ? new Point( -1, newpos.y ) : newpos;

            if( this.collides( newpos ) ){
                var collides = true;
                this.position = this.position.round( 0.5 );
            }
            else{
                var collides = true;
                this.position = newpos;
            }
        }

        var g = this.position.scale( this.platform.step );
        var p = this.icon.spritePosition;
        var s = this.icon.size;
        this.platform.ctx.drawImage( this.icon, p[ 0 ], p[ 1 ], s[ 0 ], s[ 1 ], g.x - 5, g.y - 5, platform.step + 10, platform.step + 10 );
        return collides;
    },
    move: function( current, direction ){
        return current.add( direction );
    },
    canMove: function( current, direction ){
        return !this.collides( this.move( current.round( 0.1 ), direction.scale( 0.01 ) ) );
    },
    collides: function( point ){
        fx = Math.floor( point.x );
        fy = Math.floor( point.y );
        cx = Math.ceil( point.x );
        cy = Math.ceil( point.y );
        var ret = !( point.y == 14 && point.x <= 1 ) &&
                  !( point.y == 14 && point.x >= this.platform.columns - 2 ) &&
            (
                point.y < 1 ||
                point.y > this.platform.rows - 2 ||
                point.x < 1 ||
                point.x > this.platform.columns - 2 ||
                
                this.platform.wallraw[ fy ][ fx ] == 1 ||
                this.platform.wallraw[ fy ][ cx ] == 1 || 
                this.platform.wallraw[ cy ][ fx ] == 1 ||
                this.platform.wallraw[ cy ][ cx ] == 1
            );

        return ret;
    },
}






/*
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
