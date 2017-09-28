# Gulp Settings

## Installing [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

1. `npm install --global gulp-cli` Install the gulp command 
2. `npm install --save-dev gulp` Install gulp in your devDependencies
3. `npm install` Install gulp plugins
4. `npm install --save-dev gulp-plugin-name` Install absent plugins

## Using the project

1. Use `gulp` to create a template
2. Use `gulp build` to get final pretty files

# Bower componetns

- Install Bower `npm install -g bower` 
- Add path for Bower Components. As default path `./src/libs`. Could be change in __.bowerrc__
- Add __dependencies__ to the __bower.json__ or install each `bower install <package>` e.g. 
```json
"jquery": "2.*",
"owl.carousel": "2.*",
"normalize-scss": "*"
``` 
- or `bower install jquery`
- Run `bower install`

# [Styleguide](https://www.npmjs.com/package/markdown-styleguide-generator)

## Installing:

- Use `npm install -g markdown-styleguide-generator` to global install
- Go to core of the project into terminal `cd /your/web/project`
- Type `styleguide` and start it
- Config file `.styleguide`
- Style file `.../dev/css/styles.min.css` which created after compile sass files
- SASS file `.../stryzhavka.online/src/common/_styleguide.scss` used to styling styleguide template. Should be hidden for build version.

# Aboud [Jade](http://learnjade.com/tour/intro/)

##Examples:

### Vars

```jade
- var foo = "bar"
p = foo
```

```html
<p>bar</p>
```
### Array

```jade
each item in ['foo', 'bar', 'baz']
    i= item
```

```html
<li>foo</li>
<li>bar</li>
<li>baz</li>
```

```jade
for item in ['foo', 'bar', 'baz']
    li= item
```

```html
<li>foo</li>
<li>bar</li>
<li>baz</li>
```

```jade
for item, i in ['foo', 'bar', 'baz']
    li= item
    li= i
```

```html
<li>foo</li>
<li>0</li>
<li>bar</li>
<li>1</li>
<li>baz</li>
<li>2</li>
```

### Conditionals

```jade
- var language = "Jade"
if language == "Jade"
    p Awesome
else
    p Not awesome
```

```html
<p>Awesome</p>
```

```jade
- var language = "FooLang"
unless language == "Jade"
    p Not Awesome
```

```html
<p>Not Awesome</p>
```

# Styles

1. Normalize css used as a reset style file

# Scripts

1. Using EcmaScript 6 which compiling __BABEl__

# Project structure

- Core of the working files: `./src/`
- Output working files. Core of the **build** files: `./dev/`
- Final files: `./build/`

# Comment examples

```scss
// SCSS comment
//----------------------------------------------------------------------
```