/* eslint no-param-reassign: ["error", { "props": false }] */
import { Plugin } from 'vuepress-types';

export interface LocalePrefixPluginOptions {
  locales: Map<string, string>
}

const LocalePrefixPlugin: Plugin<LocalePrefixPluginOptions> = (options) => ({
  name: 'vuepress-plugin-locale-prefix',

  extendPageData(page): void {
    const { locales } = options;

    // build regexp for pages ended with <locale>.html
    // ru|en|<locale>
    const rePart = Array.from(locales.keys()).join('|');
    // \/(eu|en|<locale>)\.html$
    const extRe = new RegExp(`\\/(${rePart})\\.html$`);

    // check page for regexp
    const match = page.path.match(extRe);
    if (match) {
      const localeKey = match[1];
      const localePrefix = locales.get(localeKey);
      const pathToFolder = page.path.slice(1, -8);
      const newPath = `${localePrefix}${pathToFolder}.html`;
      page.path = newPath;
      page.regularPath = newPath;
    }
  },
});

module.exports = LocalePrefixPlugin;
