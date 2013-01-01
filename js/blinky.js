function Blinky( position ){
    this.states = ghosts.blinky.states;
    Ghost.call( this, position );
}
Blinky.prototype = {
};
Blinky.extend( Ghost );
