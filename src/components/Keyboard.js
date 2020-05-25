/*

Job: high-level component that returns a keyboard

*/

import BoxComponent from './core/BoxComponent';
import Block from './Block';
import Text from './Text';
import keymaps from '../utils/Keymaps';

export default function KeyboardModule( options ) {

	// DEFAULTS

	if ( !options ) options = {};
	if ( !options.width ) options.width = 1;
	if ( !options.height ) options.height = 0.4;
	if ( !options.margin ) options.margin = 0.003;
	if ( !options.padding ) options.padding = 0.01;

	//

	const keyboard = Object.create( BoxComponent() );

	keyboard.type = 'Keyboard';

	keyboard.currentPanel = 0;

	//////////
	// KEYMAP
	//////////

	// ../utils/Keymaps contains information about various keyboard layouts
	// We select one depending on the user's browser language

	let keymap;

	if ( navigator ) {

		switch ( navigator.language ) {

			case 'fr' :
				keymap = keymaps.fr
				break

			default :
				keymap = keymaps.fr
				break

		};

	} else {

		keymap = keymaps.fr

	};

	////////////////////
	// BLOCKS CREATION
	////////////////////

	// PANELS

	keyboard.keys = [];

	keyboard.panels = keymap.map( (panel, i)=> {

		const lineHeight = (options.height / panel.length) - (options.margin * 2);

		const panelBlock = Block({
			width: options.width + (options.padding * 2),
			height: options.height + (options.padding * 2),
			offset: 0,
			padding: options.padding,
			fontFamily: options.fontFamily,
			fontTexture: options.fontTexture
		});

		panelBlock.add( ...panel.map( (line, i, lines)=> {

			const lineBlock = Block({
				width: options.width,
				height: lineHeight,
				margin: options.margin,
				contentDirection: 'row'
			});

			lineBlock.frameContainer.visible = false;

			let keys = [];

			for ( let char of Object.keys(line) ) {

				const key = Block({
					width: (options.width * line[char].width) - (options.margin * 2),
					height: lineHeight,
					margin: options.margin,
					justifyContent: 'center',
					fontSize: 0.035,
					offset: 0
				});

				key.add(
					Text({
						content: char,
						offset: 0
					})
				);

				key.type = "Key"

				key.info = line[char];
				key.info.char = char;

				// line's keys
				keys.push( key );

				// keyboard's keys
				keyboard.keys.push( key );

			};

			lineBlock.add( ...keys )

			return lineBlock

		}))

		return panelBlock

	});

	keyboard.add( keyboard.panels[ 0 ] );

	keyboard.setNextPanel = function setNextPanel() {

		keyboard.panels.forEach( (panel)=> {

			keyboard.remove( panel );

		});

		keyboard.currentPanel = (keyboard.currentPanel + 1) % (keyboard.panels.length);

		keyboard.add( keyboard.panels[ keyboard.currentPanel ] );

		keyboard.update( true, true, true );

	};

	////////////
	//  UPDATE
	////////////

	keyboard.parseParams = function ParseParams() {};

	//

	keyboard.updateLayout = function UpdateLayout() {};

	//

	keyboard.updateInner = function UpdateInner() {};

	// Lastly set the options parameters to this object, which will trigger an update
	keyboard.set( options, true, true );

	return keyboard;

};
