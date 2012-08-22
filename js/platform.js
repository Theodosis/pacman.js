function Platform( columns, rows ){
    this.columns = columns;
    this.rows = rows;
    this.walls = levels.lvl1.walls;
    this.bg = new Image();
    this.bg.src = levels.lvl1.bg;
    this.bullets = levels.lvl1.bullets;
    this.energizers = levels.lvl1.energizers;
    this.paused = false;
    this.started = false;
    this.score = 0;
    
    this.canvas = document.getElementById( 'canvas' );
    
    var stepX = parseInt( window.innerWidth / columns );
    var stepY = parseInt( window.innerHeight / rows );
    
    this.step = stepX < stepY ? stepX : stepY;
    this.step = 20;
    
    this.canvas.width = columns * this.step + 10;
    this.canvas.height = rows * this.step + 100;
    
    this.ctx = this.canvas.getContext( '2d' );

    this.TS = new Date().getTime();
    this.datediff = new Date().getTime() - this.TS;
}
Platform.prototype = {
    entities: [],
    addEntity: function( entity ){
        entity.platform = this;
        this.entities.push( entity );
    },
    play: function(){
        var that = this;
        window.onkeydown = function( e ){
            if( [ 37, 38, 39, 40 ].contains( e.which ) ){
                var nextMove = Directions.mapToDirection[ e.which ];
                if( nextMove == that.entities[ 0 ].direction ){
                    return;
                }
                that.entities[ 0 ].nextMove = nextMove;
            }
            if( e.which == 80 ){
                !that.paused ? that.pause() : that.resume();
            }
        }
        window.onblur = function(){
            that.pause();
        }
        this.started = true;
        this.entities[ 0 ].direction = 'W';
    },
    pause: function(){
        this.paused = true;
    },
    resume: function(){
        this.paused = false;
        this.datediff = 1;
        this.TS = new Date().getTime();
    },
    energize: function(){

    },
    drawMessage: function( message, size, color, font ){
        size = size ? size : '26px';
        color = color ? color : '#fff';
        font = font ? font : 'Joystix';
        
        this.ctx.fillStyle = color;
        this.ctx.font = size + ' ' + font;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText( message, this.columns * this.step / 2, 17 * this.step );
    },
    drawLevel: function(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
        this.ctx.fill();

        /*
        this.ctx.fillStyle = "#111";
        for( var i in this.walls ){
            var x = this.walls[ i ].x;
            var y = this.walls[ i ].y;
            this.ctx.fillRect( x * this.step + 1, y * this.step + 1, this.step - 1, this.step - 1 );
        }
        */
        this.ctx.drawImage( this.bg, 52, 42, 385, 425, 0, 0, this.columns * this.step, this.rows * this.step );

        this.ctx.fillStyle = "#ccc";
        for( var i in this.bullets ){
            var x = this.bullets[ i ].x;
            var y = this.bullets[ i ].y;
            this.ctx.fillRect( ( x + 0.5 ) * this.step - 1, ( y + 0.5 ) * this.step - 1, 2, 2 );
        }
        for( var i in this.energizers ){
            var x = this.energizers[ i ].x;
            var y = this.energizers[ i ].y;
            this.ctx.beginPath();
            this.ctx.arc( ( x + 0.5 ) * this.step - 1, ( y + 0.5 ) * this.step - 1, 8, 0, Math.PI * 2, true );
            this.ctx.closePath();
            this.ctx.fill();
        }
        this.ctx.fillStyle = 'white';
        this.ctx.font = '26px Joystix';
        this.ctx.fillText( 'SCORE', 50, ( this.rows + 1 ) * this.step );
        this.ctx.fillStyle = '#fc0';
        this.ctx.fillText( this.score, 150, ( this.rows + 1 ) * this.step );

        if( this.paused ){
            this.ctx.fillStyle = "rgba(0,0,0,0.75)";
            this.ctx.fillRect( 0, 0, this.step * this.columns, this.step * this.rows );
            
            this.drawMessage( 'PAUSED!' );
        }
        if( !this.started ){
            this.drawMessage( 'GET READY!' );
        }
    },
    drawFrame: function(){
        this.drawLevel();
        if( !this.paused ){
            for( var i in this.entities ){
                this.entities[ i ].drawFrame();
            }
        }
        this.datediff = new Date().getTime() - this.TS;
        this.TS = new Date().getTime();
        var that = this;
        requestAnimationFrame( function(){
            that.drawFrame.call( that );
        } );
    },
    Initialize: function(){
        //AudioPlayer.Initialize();
        this.drawFrame();
        var that = this;
        setTimeout( function(){
            that.play();
        }, 4000 );
    }
};
