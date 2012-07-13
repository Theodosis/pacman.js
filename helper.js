function makeRequestAnimationFrame() {
    if ( typeof window.webkitRequestAnimationFrame !== 'undefined' ) {
        return window.webkitRequestAnimationFrame;
    }
    if ( typeof window.mozRequestAnimationFrame !== 'undefined' ) {
        return window.mozRequestAnimationFrame;
    }
    if ( typeof window.oRequestAnimationFrame !== 'undefined' ) {
        return window.oRequestAnimationFrame;
    }
    if ( typeof window.msRequestAnimationFrame !== 'undefined' ) {
        return window.msRequestAnimationFrame;
    }

    function fallback( callback ) {
       window.setTimeout( callback, 1000 / 60 );
    }

    return fallback;
}

if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = makeRequestAnimationFrame();
}

Object.defineProperty( Function.prototype, "extend", {
    /**
     * @this {Function}
     *
     * Implementation of classical inheritance. I use the defineProperty method on the
     * Object.prototype in order to make it non-enumerable. If set directly it breaks all
     * the "for( i in obj )" loops
    */
    value: function() {
        var method, l = arguments.length;
        while ( l-- ) {
            var parent = arguments[ l ];

            //Continue with the overriding handling
            for ( method in parent.prototype ) {
                //Every prototype has the property constructor. No need to override.
                if ( method == 'constructor' ) {
                    continue;
                }
                /* If a parent method is overrided provide a way to call it by setting
                 * the ParentClass_overridedMethod method on child's prototype
                 */
                var propertyDescriptor = Object.getOwnPropertyDescriptor( parent.prototype, method );
                if ( propertyDescriptor !== null ) {
                    if ( this.prototype.hasOwnProperty( method ) ) {
                        Object.defineProperty( this.prototype, parent.name + '_' + method, propertyDescriptor  );
                    }
                    else {
                        Object.defineProperty( this.prototype, method, propertyDescriptor );
                    }
                }
            }
        }

        var propertiesObject = {};
        for ( method in this.prototype ) {
            propertiesObject[ method ] = Object.getOwnPropertyDescriptor( this.prototype, method );
        }

        this.prototype = Object.create( arguments[ 0 ].prototype, propertiesObject );
    }
} );

Object.defineProperty( Array.prototype, 'contains', {
    value: function( needle ){
        for( var i = 0; i < this.length; ++i ){
            if( typeof needle == typeof this && typeof needle == 'object' ){
                var exists = true;
                for( j in needle ){
                    if( needle[ j ] != this[ i ][ j ] ){
                        exists = false;
                    }
                }
                if( exists ){
                    return true;
                }
            }
            if( needle == this[ i ] ){
                return true;
            }
        }
        return false;
    }
} );

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
    round: function( e ){
        var p = new Point( this.x, this.y );
        if( Math.abs( this.x - Math.round( this.x ) ) < e ){
            p.x = Math.round( this.x );
        }
        if( Math.abs( this.y - Math.round( this.y ) ) < e ){
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

