<h1 align="center">vuepress-plugin-locale-prefix</h1>
<div align="center">

VuePress plugin which replaces `/path/%locale%.html` paths to `/%locale%/path.html`

![Version](https://img.shields.io/npm/v/@b0g3r/vuepress-plugin-locale-prefix?style=flat-square)
![License](https://img.shields.io/npm/l/@b0g3r/vuepress-plugin-locale-prefix?style=flat-square)

</div>

## Sorry, plugin for what?

I know, it sounds strange, but sometimes you need this.

For example you have a big site with project documentation and deep directory nesting:
```
documentation
|-- how-to-use
    `-- dependencies
        `-- ubuntu-requirements
            `-- index.md
...
```

Your urls looks great, hah? `/documentation/how-to-use/dependencies/ubuntu-requirements` 😍

So, the next step for your big site is internationalization (`i18n`). The classic way to do it is create first-level directories for each locale:
```
en
|-- documentation
    `-- how-to-use
        `-- dependencies
            `-- ubuntu-requirements
                `-- index.md  # English doc about ubuntu requirements
ru
|-- documentation
    `-- how-to-use
        `-- dependencies
            `-- ubuntu-requirements
                `-- index.md  # Russian doc about ubuntu requirements
```

With deep nesting it's very painful to maintain directory tree, because you should duplicate structure for each locale. 

... Okay, but what if we try something like **this**?

```
documentation
|-- how-to-use
    `-- dependencies
        `-- ubuntu-requirements
            |-- en.md  # English doc about ubuntu requirements
            `-- ru.md  # Russian doc about ubuntu requirements
...
```

In this case we have only one directory tree, but now urls are awful and not SEO friendly: `/documentation/how-to-use/dependencies/ubuntu-requirements/en.html`

So, my plugin is solution for the problem, it replaces `/documentation/how-to-use/dependencies/ubuntu-requirements/en.html` to `/en/documentation/how-to-use/dependencies/ubuntu-requirements.html` 🎉

Plugin also supports _default locale_, when you want to host one locale as `/`, and others as `/%locale%/`, see "Options" 

Plugin created especially for [Teamlead Roadmap project](https://github.com/tlbootcamp/tlroadmap)

## Install

```sh
yarn add -D @b0g3r/vuepress-plugin-locale-prefix
# OR npm install -D @b0g3r/vuepress-plugin-locale-prefix
```

## Usage
**Note:** plugin should be places as high as possible, especially before any plugin that can change page.path or page.regularPath attributes (e.g. `clean-urls`) 

```js
module.exports = {
  plugins: [
    ['@b0g3r/locale-prefix',{
      locales: new Map([
        ['en', '/en/'],
        ['ru', '/'],
      ]) 
    }]
  ]
}
```

## Options

### locales (required)
- Type: `Map<string, string>`

Set mapping of filename → pathPrefix. For example `Map('en' → '/en/', 'ru' → '/')` will host all `en.md` files with root prefix `/en/` and all `ru.md` with root prefix `/`
