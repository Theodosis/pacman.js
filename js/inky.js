function Inky( position ){
    this.normalStates = ghosts.inky.states;
    Ghost.call( this, position );
}
Inky.prototype = {
};
Inky.extend( Ghost );
