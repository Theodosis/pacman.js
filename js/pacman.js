function Pacman( position ){
    Entity.call( this, position );
    
    this.states = pacman.states;
    this.deadStates = pacman.dying;
    this.icon.spritePosition = this.states.W[ 0 ];
    this.icon.state = 0;
    this.icon.size = [ 16, 16 ];
    
    var that = this;
    
    setInterval( function(){
        if( that.dead ){
            return;
        }
        that.icon.state = that.icon.state == 3 ? 0 : that.icon.state + 1;
        that.icon.spritePosition = that.states[ that.direction ][ that.icon.state ];
    }, 80 );
    
    window.onkeydown = function( e ){
        if( [ 37, 38, 39, 40 ].contains( e.which ) ){
            var nextMove = Directions.mapToDirection[ e.which ];
            if( nextMove == that.direction ){
                return;
            }
            that.nextMove = nextMove;
        }
        if( e.which == 80 ){
            !that.platform.paused ? that.platform.pause() : that.platform.resume();
        }
    }
}

Pacman.prototype = {
    constructor: Pacman,
    drawFrame: function(){
        this.Entity_drawFrame();

        if( this.platform.bullets.remove( this.position.round( 0.5 ) ) ){
            //AudioPlayer.consume();
            this.platform.score += 10;
        }
        if( this.platform.energizers.remove( this.position.round( 0.5 ) ) ){
            this.platform.energize();
            this.platform.score += 50;
        }
    },
    die: function(){
        this.dead = true;
        var that = this;
        for( var i = 0; i < that.deadStates.length; ++i ){
            // closure needed to pass the correct i
            (function( i ){
                setTimeout( function(){
                    that.icon.spritePosition = that.deadStates[ i ];
                }, i * 100 ) 
            } )( i );
        }
        setTimeout( function(){
            that.position = that.initPos;
            that.direction = '';
            that.dead = false;
            that.platform.started = false;
            setTimeout( function(){
                that.platform.play();
            }, 4000 );
        }, 100 * 12 );
    }
}

Pacman.extend( Entity );
