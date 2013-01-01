function Ghost( position ){
    Entity.call( this, position );
    this.deadStates = ghosts.dead.states;
    this.energizedStates = ghosts.energized.states;
    
    this.states = this.normalStates;
    this.icon.spritePosition = this.states.S[ 0 ];
    this.icon.state = 0;
    this.icon.size = [ 16, 16 ];
    this.energized = false;
    this.ghost = false;
    this.goal = false;

    var that = this;
    setInterval( function(){
        that.icon.state = that.icon.state == 1 ? 0 : that.icon.state + 1;
        that.icon.spritePosition = that.states[ that.direction ][ that.icon.state ];
    }, 80 );
}
Ghost.prototype = {
    reset: function(){
        this.Entity_reset();
        this.states = this.normalStates;
        this.energized = false;
        this.ghost = false;
        this.goal = false;
    },
    energize: function(){
        this.energized = true;
        if( !this.ghost ){
            this.states = this.energizedStates;
        }
    },
    deenergize: function(){
        this.energized = false;
        if( !this.ghost ){
            this.states = this.normalStates;
        }
    },
    die: function(){
        this.ghost = true;
        this.energized = false;
        this.states = this.deadStates;
        this.target( new Point( 13, 11 ), function(){
            this.revive();
            this.goal = false;
        } );
    },
    revive: function(){
        this.ghost = false;
        this.energized = false;
        this.states = this.normalStates;
    },
    navigate: function(){
        if( this.goal ){
            return this.navigateTo( this.goal );
        }
        var available = this.availableDirections();
        return !available ? false : available[ Math.floor( Math.random() * available.length ) ];
    },
    drawFrame: function(){
        this.currentSpeed = this.ghost ? this.speed * 2 : ( this.energized ? this.speed * 0.6 : this.speed );
        this.Entity_drawFrame();
        if( this.direction.length == 0 || this.nextMove.length || this.platform.TS - this.lastDirectionUpdate < 300 ){
            return;
        }
        var next = this.navigate();
        if( next && next != this.direction ){
            this.lastDirectionUpdate = this.platform.TS;
            this.nextMove = next;
        }
    }
};
Ghost.extend( Entity );
