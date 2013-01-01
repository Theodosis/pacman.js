function Inky( position ){
    this.states = ghosts.inky.states;
    Ghost.call( this, position );
}
Inky.prototype = {
};
Inky.extend( Ghost );
