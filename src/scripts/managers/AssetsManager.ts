class AssetManager {
    private assetUrls: string[];
    private loadedAssets: (HTMLImageElement | HTMLAudioElement)[] = [];
    private totalAssets: number = 0;

    constructor(assetUrls: string[]) {
        this.assetUrls = assetUrls;
        this.totalAssets = assetUrls.length;
    }

    public loadAssets(onComplete: () => void): void {
        if (this.totalAssets === 0) {
            onComplete();
            return;
        }

        let loadedCount = 0;

        this.assetUrls.forEach(url => {
            const extension = url.split('.').pop()?.toLowerCase();
            let asset: HTMLImageElement | HTMLAudioElement;

            if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif') {
                asset = new Image();
                asset.src = url;

                asset.onload = () => {
                    this.loadedAssets.push(asset);
                    loadedCount++;
                    console.log(`Image loaded: ${url}`);
                    this.checkCompletion(loadedCount, onComplete);
                };

                asset.onerror = () => {
                    console.error(`Failed to load image: ${url}`);
                    loadedCount++;
                    this.checkCompletion(loadedCount, onComplete);
                };
            } else if (extension === 'mp3' || extension === 'wav' || extension === 'ogg') {
                asset = new Audio(url);

                asset.oncanplaythrough = () => {
                    this.loadedAssets.push(asset);
                    loadedCount++;
                    console.log(`Audio loaded: ${url}`);
                    this.checkCompletion(loadedCount, onComplete);
                };

                asset.onerror = () => {
                    console.error(`Failed to load audio: ${url}`);
                    loadedCount++;
                    this.checkCompletion(loadedCount, onComplete);
                };
            } else {
                console.warn(`Unsupported file type for URL: ${url}`);
                loadedCount++;
                this.checkCompletion(loadedCount, onComplete);
            }
        });
    }

    private checkCompletion(loadedCount: number, onComplete: () => void) {
        if (loadedCount === this.totalAssets) {
            console.log("All assets processed (some may have failed).");
            onComplete();
        }
    }

    public getLoadedAssets(): (HTMLImageElement | HTMLAudioElement)[] {
        return this.loadedAssets;
    }
}

export { AssetManager };
