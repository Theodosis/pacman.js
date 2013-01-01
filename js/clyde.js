function Clyde( position ){
    this.states = ghosts.clyde.states;
    Ghost.call( this, position );
}
Clyde.prototype = {
};
Clyde.extend( Ghost );
