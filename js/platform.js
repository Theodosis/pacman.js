function Platform( columns, rows ){
    this.lvldata = levels.lvl1;

    this.columns = columns;
    this.rows = rows;
    this.walls = this.lvldata.walls.slice();
    this.wallraw = this.lvldata.raw.slice();
    this.bg = new Image();
    this.bg.src = this.lvldata.bg;
    this.bullets = this.lvldata.bullets.slice();
    this.energizers = this.lvldata.energizers.slice();
    this.paused = false;
    this.started = false;
    this.ended = false;
    this.energized = false;
    this.lvl = 0;
    this.score = 0;
    
    this.canvas = document.getElementById( 'canvas' );
    
    var stepX = parseInt( window.innerWidth / this.columns );
    var stepY = parseInt( window.innerHeight / this.rows );
    
    this.step = stepX < stepY ? stepX : stepY;
    this.step-=1;
    this.canvas.width = this.columns * this.step;
    this.canvas.height = this.rows * this.step + 2 * this.rows;
    
    this.ctx = this.canvas.getContext( '2d' );

    this.TS = new Date().getTime();
    this.datediff = new Date().getTime() - this.TS;
    var that = this;
    window.onblur = function(){
        that.pause();
    }
}
Platform.prototype = {
    entities: [],
    addEntity: function( entity ){
        entity.platform = this;
        this.entities.push( entity );
    },
    play: function(){
        var that = this;
        this.started = true;
        this.entities[ 0 ].direction = 'W';
        for( i = 0; i < this.entities.length; ++i ){
            if( !( this.entities[ i ] instanceof Ghost ) ){
                continue;
            }
            this.entities[ i ].reset();
            ( function( i ) {
                setTimeout( function(){
                    if( !that.started ){
                        return;
                    }
                    that.entities[ i ].direction = that.entities[ i ].navigate();
                }, i * 2000 );
            } ) ( i );
        }
    },
    pause: function(){
        this.paused = true;
    },
    resume: function(){
        this.paused = false;
        this.datediff = 1;
        this.TS = new Date().getTime();
    },
    reset: function(){
        this.started = false;
        for( var i = 0; i < this.entities.length; ++i ){
            this.entities[ i ].reset();
        }
    },
    energize: function(){
        var that = this;
        this.energized = true;
        this.eatenGhosts = 0;
        for( var i = 1; i < this.entities.length; ++i ){
            this.entities[ i ].energize();
        }
        clearTimeout( this.energizetm );
        this.energizetm = setTimeout( function(){
            for( var i = 1; i < that.entities.length; ++i ){
                that.entities[ i ].deenergize();
            }
            that.energized = false;
        }, 10000 * Math.exp( - this.lvl / 10 ) );

    },
    checkState: function(){
        if( this.bullets.length + this.energizers.length == 0 ){
            ++this.lvl;
            for( var i = 0; i < this.entities.length; ++i ){
                this.entities[ i ].speed *= 1.1;
                this.entities[ i ].currentSpeed = this.entities[ i ].speed;
            }
            this.reset();
            this.bullets = this.lvldata.bullets.slice();
            this.energizers = this.lvldata.energizers.slice();
            var that = this;
            setTimeout( function(){
                that.play();
            }, 1000 );
        }
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
        var stepX = parseInt( window.innerWidth / this.columns );
        var stepY = parseInt( window.innerHeight / this.rows );
        this.step = stepX < stepY ? stepX : stepY;
        this.step-=1;
        this.canvas.width = this.columns * this.step;
        this.canvas.height = this.rows * this.step + 2 * this.rows;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
        this.ctx.fill();

        this.ctx.fillStyle = [  "#113", "#311", "#131",
                                "#116", "#611", "#161",
                                "#339", "#933", "#393", "#990"
                            ][ this.lvl % 10 ];
        for( var i in this.walls ){
            var x = this.walls[ i ].x;
            var y = this.walls[ i ].y;
            this.ctx.fillRect( x * this.step + 1, y * this.step + 1, this.step-1, this.step -1 );
        }
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

        var pm = this.entities[ 0 ];
        for( i = 0; i < pm.lives; ++i ){
            this.ctx.drawImage( 
                pm.icon, 
                pm.states[ 'E' ][ 1 ][ 0 ], pm.states[ 'E' ][ 1 ][ 1 ],
                pm.icon.size[ 0 ], pm.icon.size[ 1 ],
                this.step * ( 26 - i * 2 ), this.step * 31,
                platform.step + 10, platform.step + 10 
            );
        }

        if( this.paused || this.ended ){
            this.ctx.fillStyle = "rgba(0,0,0,0.75)";
            this.ctx.fillRect( 0, 0, this.step * this.columns, this.step * this.rows );
            
            this.drawMessage( this.ended ? 'GAME OVER' : 'PAUSED!', false, this.ended ? '#f00' : false );
            return;
        }
        if( !this.started ){
            this.drawMessage( 'GET READY!' );
        }
    },
    drawFrame: function(){
        this.drawLevel();
        if( !this.paused && !this.ended ){
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
        AudioPlayer.Initialize();
        this.drawFrame();
        var that = this;
        setTimeout( function(){
            that.play();
        }, 4000 );
    }
};
