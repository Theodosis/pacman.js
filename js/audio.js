var AudioPlayer = {
    sounds: {},
    consume: function(){
        return;
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
        this.sounds.consume.repeat = true;

        this.sounds.siren = new Audio();
        this.sounds.siren.setAttribute( 'src', 'sounds/Pacman_Siren.mp3' );
        this.sounds.siren.repeat = true;
        this.sounds.siren.autoplay = true;
        this.sounds.siren.loop = true;
    }
};
