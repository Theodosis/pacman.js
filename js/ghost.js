function Ghost( position ){
    Entity.call( this, position );
    
    this.icon.spritePosition = this.states.S[ 0 ];
    this.icon.state = 0;
    this.icon.size = [ 16, 16 ];
    this.speed = 6;

    var that = this;
    setInterval( function(){
        that.icon.state = that.icon.state == 1 ? 0 : that.icon.state + 1;
        that.icon.spritePosition = that.states[ that.direction ][ that.icon.state ];
    }, 80 );
}
Ghost.prototype = {
    navigate: function(){
        var available = this.availableDirections();
        return available.length == 0 ? false : available[ Math.floor( Math.random() * available.length ) ];
    },
    availableDirections: function(){
        var dirs = [];
        var all = [ 'W', 'N', 'E', 'S' ];
        for( var i in all ){
            if( 
                all[ i ] == Directions.oppositeDirection[ this.direction ] || 
                !this.canMove( this.position, Directions.directionToVector[ all[ i ] ] ) ||
                all[ i ] == this.direction
            ){
                continue;
            }
            dirs.push( all[ i ] );
        }
        return dirs;
    },
    drawFrame: function(){
        this.Entity_drawFrame();
        if( this.direction.length == 0 || this.nextMove.length ){
            return;
        }
        var next = this.navigate();
        if( next && next != this.direction ){
            this.nextMove = next;
        }
    }
};
Ghost.extend( Entity );
