function Platform( columns, rows ){
    this.columns = columns;
    this.rows = rows;
    
    this.canvas = document.getElementById( 'canvas' );
    
    var stepX = parseInt( window.innerWidth / columns );
    var stepY = parseInt( window.innerHeight / rows );
    
    this.step = stepX < stepY ? stepX : stepY;
    
    this.canvas.width = columns * this.step;
    this.canvas.height = rows * this.step;
    
    this.ctx = this.canvas.getContext( '2d' );
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

        this.ctx.strokeStyle = 'white';
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
    },
    drawFrame: function(){
        this.drawLevel();
        for( var i in this.entities ){
            this.entities[ i ].drawFrame();
        }
        var that = this;
        requestAnimationFrame( function(){
            that.drawFrame.call( that );
        } );
    },
    Initialize: function(){
        this.drawFrame();
    }
};