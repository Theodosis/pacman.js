function Pinky( position ){
    this.states = ghosts.pinky.states;
    Ghost.call( this, position );
}
Pinky.prototype = {
};
Pinky.extend( Ghost );
