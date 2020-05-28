
import { disposeOf } from '../components/core/UpdateManager.js';

function DeepDelete( Object3D ) {

	for ( let i = Object3D.children.length -1 ; i > -1 ; i-- ) {

		let child = Object3D.children[ i ];

		if ( child.children.length > 0 ) DeepDelete( child );

		Object3D.remove( child );

		disposeOf( child );

		if ( child.material ) child.material.dispose();

		if ( child.geometry ) child.geometry.dispose();

	};

};

export default DeepDelete
