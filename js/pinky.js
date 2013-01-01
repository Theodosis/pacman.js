function Pinky( position ){
    this.normalStates = ghosts.pinky.states;
    Ghost.call( this, position );
}
Pinky.prototype = {
};
Pinky.extend( Ghost );
