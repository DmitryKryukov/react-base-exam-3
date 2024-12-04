class AudioManager {
    private audio: HTMLAudioElement;

    constructor() {
        this.audio = new Audio();
    }

    public setSource(source: string): void {
        this.audio.src = source;
    }

    public playOnce(): void {
        this.audio.loop = false;
        this.playAudio();
    }

    public playLoop(): void {
        this.audio.loop = true;
        this.playAudio();
    }

    public stop(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    private playAudio(): void {
        const promise = this.audio.play();
        if (promise !== undefined) {
            promise.then(() => {

            }).catch(error => {
                
            });
        }
    }

    public setVolume(volume: number, time?: number): void {
        if (volume < 0 || volume > 1) {
            console.error("Громкость должна быть в диапазоне от 0.0 до 1.0");
            return;
        }

        if (time && time > 0) {
            const currentVolume = this.audio.volume;
            const volumeChange = volume - currentVolume;
            const steps = 100;
            let currentStep = 0;

            const interpolateVolume = () => {
                currentStep++;
                const newVolume = currentVolume + (volumeChange * (currentStep / steps));
                this.audio.volume = Math.min(Math.max(newVolume, 0), 1);

                if (currentStep < steps) {
                    requestAnimationFrame(interpolateVolume);
                }
            };

            interpolateVolume();
        } else {
            this.audio.volume = volume;
        }
    }

}

export { AudioManager };
