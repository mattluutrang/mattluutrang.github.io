/**
 * Here we load in all music files and sound effects.
 *
 *
 * CREDITED MUSIC:
 *
 *
 * A Robust Crew - Darren Curtis (darrencurtismusic.com)
 * Eternal Sleep - Darren Curtis (darrencurtismusic.com)
 * Island Explorer - Michelle Hong
 */

let duckSong;
let themeSong;
let deathSong;
let victorySong;
let pickupSoundEffect;
let swingSoundEffect;
let bossEntranceSoundEffect;
let hurtSoundEffect;

function preloadSounds() {
    // Load in all the sound effects.
    themeSong = loadSound('assets/sounds/A-Robust-Crew-MP3.mp3');
    deathSong = loadSound('assets/sounds/Eternal-Sleep-MP3.mp3');
    victorySong = loadSound('assets/sounds/IslandExplorer.mp3');
    pickupSoundEffect = loadSound('assets/sounds/item-pickup.wav');
    swingSoundEffect = loadSound('assets/sounds/swing-sword.mp3');
    bossEntranceSoundEffect = loadSound('assets/sounds/boss-entrance.wav');
    hurtSoundEffect = loadSound('assets/sounds/hurt.wav');
}
