/*

Job:
	- computing its own size according to user measurements or content measurement
	- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
	- Its text content (string)
	- Font attributes ('font', 'fontType', 'fontSize')
	- Parent block

*/

import { Object3D } from 'three';

import InlineComponent from './core/InlineComponent';
import TextManager from '../content/TextManager';
import DeepDelete from '../utils/DeepDelete';

function Text( options ) {

	const textComponent = Object.create( InlineComponent() );

	textComponent.type = "Text";

	textComponent.threeOBJ = new Object3D();

	textComponent.textManager = TextManager();

	textComponent.parseParams = function parseParams( resolve, reject ) {

		//////////////////////////
		/// GET CHARS GEOMETRIES
		//////////////////////////

		const content = this.content ;
		const font = this.getFontFamily();
		const fontSize = this.getFontSize();
		const breakChars = this.getBreakOn(); // characters to prioritize breaking line (eg: white space)

		// Abort condition
		
		if ( !font ) return

		if ( !this.content || this.content.length === 0 ) {
			reject( 'Text component has no text content' );
			return
		};

		if ( font.fontType !== 'Typeface' ) {
			reject( 'Text components only support Typeface fonts. See https://gero3.github.io/facetype.js/' )
			return
		};

		// Compute glyphs sizes

		let chars = Array.from ? Array.from( content ) : String( content ).split( '' );

		const glyphInfos = chars.map( (glyph)=> {

			// Get height, width, and anchor point of this glyph
			const dimensions = textComponent.textManager.getGlyphDimensions({
				glyph,
				font,
				fontSize
			});

			//

			let lineBreak = null ;

			if ( breakChars.includes( glyph ) || glyph.match(/\s/g) ) lineBreak = "possible" ;

			if ( glyph.match(/\n/g) ) lineBreak = "mandatory" ;

			//

			return {
				height: dimensions.height,
				width: dimensions.width,
				anchor: dimensions.anchor,
				lineBreak,
				glyph,
				fontSize
			};

		});

		// Update 'inlines' property, so that the parent can compute each glyph position

		textComponent.inlines = glyphInfos;

		//

		resolve();

	};

	textComponent.updateLayout = function updateLayout() {

		/*
		Create text content

		At this point, text.inlines should have been modified by the parent
		component, to add xOffset and yOffset properties to each inlines.
		This way, TextContent knows were to position each character.

		*/

		if ( !textComponent.inlines ) return

		DeepDelete( textComponent.threeOBJ );

		const textContent = textComponent.textManager.create({
			inlines: textComponent.inlines,
			fontFamily: this.getFontFamily(),
			fontMaterial: this.getFontMaterial(),
			textType: 'geometry' // temp
		});

		textComponent.threeOBJ.add( textContent );

	};

	textComponent.updateInner = function updateInner() {

		textComponent.threeOBJ.position.z = textComponent.getOffset();

	};

	textComponent.set( options );

	return textComponent

};

export default Text
