# three-mesh-ui

<a href="https://github.com/felixmariotto/three-mesh-ui/wiki/Getting-started">
  <img alt="tuto example" target="_blank" src="https://felixmariotto.s3.eu-west-3.amazonaws.com/three-mesh-ui-teasers/teaser_basic_optimised.gif" width="45%">
</a>
<a href="https://three-mesh-ui.herokuapp.com/#interactive_button">
  <img alt="buttons example" target="_blank" src="https://felixmariotto.s3.eu-west-3.amazonaws.com/three-mesh-ui-teasers/teaser_button_optimised.gif" width="45%">
</a>
<a href="https://three-mesh-ui.herokuapp.com/#msdf_text">
  <img alt="big text example" target="_blank" src="https://felixmariotto.s3.eu-west-3.amazonaws.com/three-mesh-ui-teasers/big-text-github.gif" width="45%">
</a>

## What is it ?

**three-mesh-ui** is a small library for building VR user interfaces. The objects it creates are [Three.Mesh](https://github.com/mrdoob/three.js/blob/dev/src/objects/Mesh.js), usable directly in a [three.js](https://threejs.org) scene like any other mesh.    
        
**It is not a framework**, but a light-weight library to be plugged in the last version of three.js. It has no dependency other than three.js.

## Why ?

In a normal three.js workflow, the common practice is to build the user interfaces with HTML/CSS, either the normal way on top of the Canvas element in which the scene is drawn, or with Three.CSS3DRenderer, which visually transforms normal DOM elements so they look like they are in a 3D scene.   

In immersive VR, none of these two options is available. The goal of **three-mesh-ui** is to offer a tool similar to HTML/CSS to build genuine meshes that can be used the normal way inside a three.js scene rendered with WebGLRenderer.

## API

Here is a short example of basic three-mesh-ui usage : 

```javascript
const container = ThreeMeshUI.Block({
 width: 1.2,
 height: 0.8,
 padding: 0.2,
 alignContent: 'left',
 fontFamily: './assets/helvetiker_regular.typeface.json'
});

//

container.appendChild(

 ThreeMeshUI.Text({
  content: "Some text to be displayed",
  fontSize: 0.07
 })

);
```

### [Examples](https://three-mesh-ui.herokuapp.com/) &nbsp;|	&nbsp;[Getting Started](https://github.com/felixmariotto/three-mesh-ui/wiki/Getting-started)	&nbsp;|	&nbsp;[NPM](https://www.npmjs.com/package/three-mesh-ui)	&nbsp;|	&nbsp;[Documentation](https://github.com/felixmariotto/three-mesh-ui/wiki/API-documentation)	&nbsp;|	&nbsp;[Roadmap](https://github.com/felixmariotto/three-mesh-ui/wiki/Roadmap)	&nbsp;|	&nbsp;[Contributing](https://github.com/felixmariotto/three-mesh-ui/wiki/Contributing)
