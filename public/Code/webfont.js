ig.module(
	'plugins.webfont'
)
.defines(function(){ "use strict";

ig.WebFont = ig.Class.extend({
	// -------------------------------------------------------------------------
	// Properties required by ig.Loader
	// -------------------------------------------------------------------------
	path         : '',
	loaded       : false,
	failed       : false,
	loadCallback : null,

	// -------------------------------------------------------------------------
	// Draw‑time attributes (similar to ig.Font)
	// -------------------------------------------------------------------------
	cssFont      : '20px sans-serif',
	family       : '',
	letterSpacing: 0,
	lineSpacing  : 0,
	alpha        : 1,
	color        : '#ffffff',
	outline      : null,
	outlineWidth : 2,

	staticInstantiate: function(){ return null; },

	init: function( desc ){
		if( typeof desc === 'string' ){
			desc = { file: desc };
		}

		this.path   = desc.file;
		this.family = desc.family;
		this.cssFont = (desc.size + ' ' + this.family) || ( '20px' + ' ' + this.family );

		if( 'color'         in desc ) this.color         = desc.color;
		if( 'alpha'         in desc ) this.alpha         = desc.alpha;
		if( 'letterSpacing' in desc ) this.letterSpacing = desc.letterSpacing;
		if( 'lineSpacing'   in desc ) this.lineSpacing   = desc.lineSpacing;
		if( 'outline'       in desc ) this.outline       = desc.outline;
		if( 'outlineWidth'  in desc ) this.outlineWidth  = desc.outlineWidth;

		this.load();
	},

	load: function( cb ){
		if( this.loaded ){
			cb && cb( this.path, true );
			return;
		}
		if( this.failed ){
			cb && cb( this.path, false );
			return;
		}

		// Not ready? Let ig.Loader queue us.
		if( !ig.ready ){
			ig.addResource( this );
			return;
		}

		this.loadCallback = cb || null;

		// 1. Font already finished loading elsewhere?
		var state = ig.WebFont.faceCache[this.path];
		if( state === 'ok' ){
			this.loaded = true;
			this.loadCallback && this.loadCallback( this.path, true );
			return;
		}
		if( state === 'fail' ){
			this.failed = true;
			this.loadCallback && this.loadCallback( this.path, false );
			return;
		}

		// 2. Someone *is* loading it – hook into their promise.
		if( state && typeof state.then === 'function' ){
			state.then(
				function(){ this.loaded = true;  this.loadCallback && this.loadCallback( this.path, true  ); }.bind(this),
				function(){ this.failed = true; this.loadCallback && this.loadCallback( this.path, false ); }.bind(this)
			);
			return;
		}

		// 3. First one here – start the load and stash the promise.
		var url  = ig.prefix + this.path + ig.nocache;
		var face = new FontFace( this.family, 'url('+ url +')' );

		var promise = face.load().then(function( f ){
			document.fonts.add( f );
			ig.WebFont.faceCache[this.path] = 'ok';
			this.loaded = true;
			this.loadCallback && this.loadCallback( this.path, true );
		}.bind(this)).catch(function( err ){
			console.warn( 'WebFont load failed:', err );
			ig.WebFont.faceCache[this.path] = 'fail';
			this.failed = true;
			this.loadCallback && this.loadCallback( this.path, false );
		}.bind(this));

		ig.WebFont.faceCache[this.path] = promise;
	},

	widthForString: function( text ){
		var ctx = ig.system.context;
		ctx.save();
		ctx.font = this.cssFont;

		var width = 0;
		var lines = text.split('\n');
		for( var i = 0; i < lines.length; i++ ){
			var w = ctx.measureText( lines[i] ).width +
			        this.letterSpacing * ( lines[i].length - 1 );
			if( w > width ){ width = w; }
		}
		ctx.restore();
		return width;
	},

	heightForString: function( text ){
		var size  = parseInt( this.cssFont, 10 ) || 20;
		var lines = text.split('\n').length;
		return lines * ( size + this.lineSpacing );
	},

	draw: function( text, x, y, align ){
		if( !this.loaded ){ return; }

		var ctx = ig.system.context;
		ctx.save();

		ctx.font         = this.cssFont;
		ctx.fillStyle    = this.color;
		ctx.textBaseline = 'middle';

		if( this.alpha !== 1 ){
			ctx.globalAlpha = this.alpha;
		}

		switch( align ){
			case ig.WebFont.ALIGN.RIGHT : ctx.textAlign = 'right';  break;
			case ig.WebFont.ALIGN.CENTER: ctx.textAlign = 'center'; break;
			default                     : ctx.textAlign = 'left';
		}

		var size       = parseInt( this.cssFont, 10 ) || 20;
		var lineHeight = size + this.lineSpacing;
		var lines      = text.split('\n');

		for( var i = 0; i < lines.length; i++ ){
			var lineY = y + i * lineHeight;

			if( this.outline ){
				ctx.strokeStyle = this.outline;
				ctx.lineWidth   = this.outlineWidth;
				ctx.strokeText( lines[i], x, lineY );
			}
			ctx.fillText( lines[i], x, lineY );
		}

		ctx.restore();
	}
});

// Alignment enum
ig.WebFont.ALIGN = {
	LEFT  : 0,
	RIGHT : 1,
	CENTER: 2
};

ig.WebFont.faceCache = {};   // path → 'ok' | 'fail' | Promise

});
