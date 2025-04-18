
## Class Reference: ig.WebFont

[**Plugin version 1.0.0**](https://gist.github.com/FelipeBudinich/a9d9b1eab8a938785964e4641c8459e4)

## Synopsis

```javascript
var webfont = new ig.WebFont({
  file: 'fonts/MyFont.ttf',
  size: '24px',
  family: 'MyFont',
  color: '#ffffff'
});

webfont.draw('Hello World', x, y, ig.WebFont.ALIGN.CENTER);
```

## Description

An `ig.WebFont` allows you to dynamically load and render TrueType or OpenType fonts using the browser's FontFace API, fully integrated with ImpactJS's resource loader system.

## Constructor

```javascript
new ig.WebFont( descriptor )
```
Creates and loads a web font for use in the canvas.

#### Parameters:

- **descriptor** _(object)_:  it must contain:
    
    - `file` _(string)_: Path to the font file.
        
    - `family` _(string)_: Font family name as recognized by CSS.
        
- optionally it may contain:
  
    - `size` _(string)_: Font size (e.g., `'24px'`). Defaults to `'20px'` if omitted.
    
    - `color` _(string, optional)_: Color of the text. Defaults to `'#ffffff'`.
        
    - `alpha` _(number, optional)_: Transparency from 0 (transparent) to 1 (opaque). Defaults to `1`.
        
    - `letterSpacing` _(number, optional)_: Additional spacing between letters. Defaults to `0`.
        
    - `lineSpacing` _(number, optional)_: Additional spacing between lines. Defaults to `0`.
        
    - `outline` _(string, optional)_: Outline color. Defaults to `null` (no outline).
        
    - `outlineWidth` _(number, optional)_: Width of the outline. Defaults to `2`.
        

#### Example:

```javascript
var font = new ig.WebFont({
  file: 'fonts/ArcadeClassic.ttf', //required
  size: '32px',
  family: 'ArcadeClassic', //required
  color: '#00ff00',
  outline: '#000000',
  outlineWidth: 3
});
```

## Properties

### .alpha

Transparency level. Default is `1` (fully opaque).

### .color

Text fill color. Default is `'#ffffff'`.

### .cssFont

The computed CSS font string (e.g., `'20px MyFont'`).

### .family

The font family name.

### .letterSpacing

Spacing between individual letters. Default is `0`.

### .lineSpacing

Spacing between lines of text. Default is `0`.

### .outline

Outline color. Default is `null` (no outline).

### .outlineWidth

Outline thickness in pixels. Default is `2`.

## Methods

### .draw( )
```javascript
 webfont.draw( text, x, y, [align] )
```

Draws text at a specified position.

#### Parameters:

- **text** _(string)_: Text to render.
    
- **x** _(number)_: X-coordinate position.
    
- **y** _(number)_: Y-coordinate position.
    
- **align** _(optional)_: Alignment (`ig.WebFont.ALIGN.LEFT`, `ig.WebFont.ALIGN.RIGHT`, or `ig.WebFont.ALIGN.CENTER`). Default is left-aligned.
    

### .widthForString( )
```javascript
 webfont.widthForString('some text')
```
Measures text width.

#### Parameters:

- **text** _(string)_: Text to measure.
    

#### Returns:

- _(number)_: Width in pixels.
    

### .heightForString(  )
```javascript
 webfont.heightForString('some text')
```

Measures text height.

#### Parameters:

- **text** _(string)_: Text to measure.
    

#### Returns:

- _(number)_: Height in pixels.
    

## Static Properties

### ig.WebFont.ALIGN

Enumeration for alignment options:

- `LEFT`: Left-aligned (default).
    
- `RIGHT`: Right-aligned.
    
- `CENTER`: Center-aligned.
    

### ig.WebFont.faceCache

Internal cache for loaded fonts, tracking loading states (`'ok'`, `'fail'`, or a loading Promise).