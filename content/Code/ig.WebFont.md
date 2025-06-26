---
title: ig.WebFont
description: An `ig.WebFont` allows you to dynamically load and render TrueType or OpenType fonts using the browser's FontFace API, fully integrated with ImpactJS's resource loader system.
date: 2025-04-18
tags:
  - Technology
  - Code
  - Javascript
  - ImpactJs
---
[**Plugin version 1.1.0**](https://gist.github.com/FelipeBudinich/a9d9b1eab8a938785964e4641c8459e4)

## Synopsis

```javascript
var webfont = new ig.WebFont({
  file: 'fonts/MyFont.ttf',
  size: 24,
  family: 'MyFont',
  weight: 'bold',
  color: '#ffffff'
});

webfont.draw('Hello World', x, y, ig.WebFont.ALIGN.CENTER);
```

## Description

The `ig.WebFont` class allows you to load custom fonts via the `FontFace` API and use them in your ImpactJS canvas-based games. It supports customizable rendering options such as color, size, outline, alignment, and weight. The font is fully integrated with the ImpactJS loader, so it can be preloaded like other assets.

## Constructor

```javascript
new ig.WebFont( descriptor )
```
Creates and loads a web font for use in the canvas.

### Parameters

- **descriptor** _(object)_: Configuration object with the following fields:
    
    #### Required:
    
    - `file` _(string)_: Path to the font file.
        
    - `family` _(string)_: Font family name.
        
    
    #### Optional:
    
    - `size` _(number)_: Font size in pixels. Defaults to `20`.
        
    - `weight` _(string)_: Font weight/style (e.g., `'normal'`, `'bold'`, `'700 italic'`). Defaults to `'normal'`.
        
    - `color` _(string)_: Fill color for the text. Defaults to `'#ffffff'`.
        
    - `alpha` _(number)_: Opacity from `0` (transparent) to `1` (opaque). Defaults to `1`.
        
    - `letterSpacing` _(number)_: Additional spacing between letters. Defaults to `0`.
        
    - `lineSpacing` _(number)_: Additional spacing between lines. Defaults to `0`.
        
    - `outline` _(string|null)_: Outline color. Defaults to `null` (no outline).
        
    - `outlineWidth` _(number)_: Outline thickness in pixels. Defaults to `2`.
        

#### Example:

```javascript
var font = new ig.WebFont({
  file: 'fonts/ArcadeClassic.ttf',
  family: 'ArcadeClassic',
  size: 32,
  weight: 'bold italic',
  color: '#00ff00',
  outline: '#000000',
  outlineWidth: 3
});
```

## Properties

### .alpha

Transparency level. Ranges from `0` (fully transparent) to `1` (fully opaque). Default is `1`.

### .color

Text fill color. Default is `'#ffffff'`.

### .cssFont

The computed CSS font string used for rendering (e.g., `'bold 20px MyFont'`).

### .family

The font family name used in the CSS font string.

### .letterSpacing

Additional spacing between individual letters in pixels. Default is `0`.

### .lineSpacing

Additional spacing between lines of text in pixels. Default is `0`.

### .outline

Outline color used when rendering text. Default is `null` (no outline).

### .outlineWidth

Thickness of the outline in pixels. Default is `2`.

### .size

Font size in pixels. Default is `20`.

### .weight

Font weight or style as a string (e.g., `'normal'`, `'bold'`, `'700 italic'`). Default is `'normal'`.

### .loaded

Indicates whether the font has successfully loaded. Boolean value. Default is `false`.

### .failed

Indicates whether the font failed to load. Boolean value. Default is `false`.

## Methods

### .draw( )
```javascript
let text = 'Hello world!',
	x = 256,
	y = 128,
	align = ig.WebFont.ALIGN.RIGHT;
	
 webfont.draw( text, x, y, align )
```

Draws text at a specified position.

#### Parameters:

- **text** _(string)_: Text to render.
    
- **x** _(number)_: X-coordinate position.
    
- **y** _(number)_: Y-coordinate position.
    
- **align** _(optional)_: Alignment (`ig.WebFont.ALIGN.LEFT`, `ig.WebFont.ALIGN.RIGHT`, or `ig.WebFont.ALIGN.CENTER`). Default is left-aligned.
    

### .widthForString( )
```javascript
 let text = 'how wide is this text?';
 webfont.widthForString(text)
```
Measures text width.

#### Parameters:

- **text** _(string)_: Text to measure.
    

#### Returns:

- _(number)_: Width in pixels.
    

### .heightForString(  )
```javascript
 let text = 'how tall is this text?'
 webfont.heightForString(text)
```

Measures text height.

#### Parameters:

- **text** _(string)_: Text to measure.
    

#### Returns:

- _(number)_: Height in pixels.
    

## Static Properties

### .ALIGN
```javascript
 ig.WebFont.ALIGN
```

Enumeration for alignment options:

- `LEFT`: Left-aligned (default).
    
- `RIGHT`: Right-aligned.
    
- `CENTER`: Center-aligned.

## Integration Notes

- Fonts are automatically queued into `ig.Loader` when the game is not yet ready.
    
- Duplicate loads are de-duplicated via an internal cache (`ig.WebFont.faceCache`) to prevent redundant `FontFace` loads.
    
- Font weight parsing supports numeric weights and recognizes the `'italic'` modifier.