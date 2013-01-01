function Entity( position ){
    this.initPos = position;
    this.position = position;
    this.icon = new Image();
    this.icon.src = "sprite.png";
    this.direction = "";
    this.nextMove = "";
    this.speed = 6; //steps / sec
    this.currentSpeed = this.speed;
}


Entity.prototype = {
    reset: function(){
        this.direction = '';
        this.nextMove = '';
        this.position = this.initPos;
    },
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
                    .scale( this.currentSpeed * this.platform.datediff / 1000 )
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

        if( this.goal && this.position.round( 0.5 ).equals( this.goal ) ){
            this.goal = false;
            this.targetcb();
        }
        var p = this.icon.spritePosition;
        var s = this.icon.size;
        var g = this.position.scale( this.platform.step );
        if( !p ){ console.log( [ g, p, s ] ) }
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
    availableDirections: function(){
        var dirs = [];
        var all = [ 'W', 'N', 'E', 'S' ];
        for( var i in all ){
            if( 
                all[ i ] == Directions.oppositeDirection[ this.direction ] || 
                !this.canMove( this.position, Directions.directionToVector[ all[ i ] ] )
                //all[ i ] == this.direction
            ){
                continue;
            }
            dirs.push( all[ i ] );
        }
        return dirs;
    },
    target: function( point, callback ){
        this.goal = point;
        this.targetcb = callback;
    },
    navigateTo: function( point ){
        var available = this.availableDirections();
        var dp = this.position.negative().add( this.goal );
        var consistent = [];
        for( var i = 0; i < available.length; ++i ){
            var dir = Directions.directionToVector[ available[ i ] ].dot( dp );
            if( dir.x > 0 || dir.y > 0 ){
                consistent.push( available[ i ] );
            }
        }
        if( consistent.length ){
            return consistent[ Math.floor( consistent.length * Math.random() ) ];
        }
        return available[ Math.floor( available.length * Math.random() ) ];
    }
}
