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
                        Object.defineProperty( this.prototype, parent.name + '_' + method, propertyDescriptor );
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
Object.defineProperty( Array.prototype, 'position', {
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
                    return i;
                }
            }
            if( needle == this[ i ] ){
                return i;
            }
        }
        return -1;
    }
} );
Object.defineProperty( Array.prototype, 'remove', {
    value: function( needle ){
        var pos = this.position( needle );
        if( pos == -1 ){
            return false;
        }
        this.splice( pos, 1 );
        return true;
    }
} );

