var AudioPlayer = {
    sounds: {},
    consume: function(){
        this.sounds.consume.play();
        clearTimeout( this.consumetimer );
        this.consumetimer = setTimeout( function(){
            AudioPlayer.sounds.consume.pause();
        }, 300 );
    },
    Initialize: function(){
        this.sounds.begin = new Audio();
        this.sounds.begin.setAttribute( 'src', 'sounds/pacman_beginning.wav' );
        this.sounds.begin.autoplay = true;

        this.sounds.consume = new Audio();
        this.sounds.consume.setAttribute( 'src', 'sounds/pacman_chomp.wav' );
        setInterval( function(){
            if( AudioPlayer.sounds.consume.currentTime >= 0.35 ){
                AudioPlayer.sounds.consume.currentTime = 0;
            }
        }, 50 );
    }
};
