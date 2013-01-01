function Blinky( position ){
    this.normalStates = ghosts.blinky.states;
    Ghost.call( this, position );
}
Blinky.prototype = {
};
Blinky.extend( Ghost );
