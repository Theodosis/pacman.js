function Clyde( position ){
    this.normalStates = ghosts.clyde.states;
    Ghost.call( this, position );
}
Clyde.prototype = {
};
Clyde.extend( Ghost );
