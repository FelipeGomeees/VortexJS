class fontControl {
    constructor() {
        this.fonts = new Map();
    }

    LoadAll(fontList) {
        const promises = fontList.map(({ name, url }) => this.Load(name, url));
        return Promise.all(promises);
    }

    async Load(name, url) {
        const font = new FontFace(name, `url(${url})`);
        return font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
            this.fonts.set(name, loadedFont);
            return loadedFont;
        });
    }

    Get(name) {
        return this.fonts.get(name);
    }

    Add(name, url) {
        this.fonts.set(name, url);
    }
}

export const FontControl = new fontControl();