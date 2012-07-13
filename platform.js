function Platform( columns, rows, walls ){
    this.columns = columns;
    this.rows = rows;
    this.walls = walls;
    this.wallPoints = [];
    
    this.canvas = document.getElementById( 'canvas' );
    
    var stepX = parseInt( window.innerWidth / columns );
    var stepY = parseInt( window.innerHeight / rows );
    
    this.step = stepX < stepY ? stepX : stepY;
    
    this.canvas.width = columns * this.step;
    this.canvas.height = rows * this.step;
    
    this.ctx = this.canvas.getContext( '2d' );

    this.TS = new Date().getTime();
    this.datediff = new Date().getTime() - this.TS;
    
    
    for( var i in this.walls ){
        var wall = this.walls[ i ];
        var from = wall[ 0 ];
        var to = wall[ 1 ];
        for( j = 0; j <= to.x - from.x; ++j ){
            x = from.x + j;
            for( k = 0; k <= to.y - from.y; ++k ){
                y = from.y + k;
                this.wallPoints.push( new Point( x, y ) );
            }
        }
    }
}
Platform.prototype = {
    entities: [],
    addEntity: function( entity ){
        entity.platform = this;
        this.entities.push( entity );
    },
    drawLevel: function(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
        this.ctx.fill();

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        for( var i = 0; i <= this.rows; ++i ){
            this.ctx.beginPath();
            this.ctx.moveTo( 0, i * this.step );
            this.ctx.lineTo( this.step * this.columns, i * this.step );
            this.ctx.stroke();
            this.ctx.closePath();
        }
        for( var i = 0; i <= this.columns; ++i ){
            this.ctx.beginPath();
            this.ctx.moveTo( i * this.step, 0 );
            this.ctx.lineTo( i * this.step, this.step * this.rows );
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.fillStyle = "#499";
        for( var i in this.wallPoints ){
            var x = this.wallPoints[ i ].x;
            var y = this.wallPoints[ i ].y;
            this.ctx.fillRect( x * this.step + 1, y * this.step + 1, this.step - 1, this.step - 1 );
        }
    },
    drawFrame: function(){
        this.drawLevel();
        for( var i in this.entities ){
            this.entities[ i ].drawFrame();
        }
        var that = this;
        requestAnimationFrame( function(){
            that.drawFrame.call( that );
            that.datediff = new Date().getTime() - that.TS;
            that.TS = new Date().getTime();
        } );
    },
    Initialize: function(){
        this.drawFrame();
    }
};
