function Point( x, y ){
    this.x = x;
    this.y = y;
}
Point.prototype = {
    add: function( p ){
        return new Point( this.x + p.x, this.y + p.y );
    },
    scale: function( scale ){
        return new Point( this.x * scale, this.y * scale );
    },
    negative: function(){
        return new Point( - this.x, - this.y );
    },
    check: function( limit ){
        return  this.x >= 0 && this.x < limit.x &&
                this.y >= 0 && this.y < limit.y;
    },
    length: function(){
        return Math.sqrt( this.x * this.x + this.y * this.y );
    },
    round: function( e ){
        var p = new Point( this.x, this.y );
        if( Math.abs( this.x - Math.round( this.x ) ) <= e ){
            p.x = Math.round( this.x );
        }
        if( Math.abs( this.y - Math.round( this.y ) ) <= e ){
            p.y = Math.round( this.y );
        }
        return p;
    },
    toString: function(){
        return "[ " + this.x + ", " + this.y + " ]";
    }
};

function Vector( x, y ){
    Point.call( this, x, y );
}
Vector.prototype = {
    constructor: Vector
}
Vector.extend( Point );
