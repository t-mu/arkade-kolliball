import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';

const FALLBACK_FONTS = ['Helvetiva', 'Arial'];

enum WebFontService {
  GOOGLE = 'google',
}

export default class WebFontFile extends Phaser.Loader.File {
  fontFamilies: string[];
  service: string;
  fontsLoadedCount: number = 0;

  constructor(loader, fontFamilies: string[], service?: string) {
    super(loader, {
      type: 'webfont',
      key: fontFamilies.toString(),
    });

    this.fontFamilies = [...fontFamilies, ...FALLBACK_FONTS];
    this.service = service ?? WebFontService.GOOGLE;
  }

  load = (): void => {
    if (this.service !== WebFontService.GOOGLE) {
      console.log(`Given font service provider (${this.service}) not yet supported!`);
    }

    const config = {
      fontactive: (fontFamily: string) => {
        this.checkLoadedFonts(fontFamily);
      },
      fontinactive: (fontFamily: string) => {
        this.checkLoadedFonts(fontFamily);
      },
      google: {
        families: this.fontFamilies,
      }
    };

    WebFontLoader.load(config);
  }

  checkLoadedFonts = (fontFamily: string): void => {
    if (this.fontFamilies.indexOf(fontFamily) < 0) {
      console.log(`FontFamily ${fontFamily} not loaded!`);
      return;
    }

    ++this.fontsLoadedCount;

    if (this.fontsLoadedCount >= this.fontFamilies.length) {
      this.loader.nextFile(this, true);
    }
  }
}
