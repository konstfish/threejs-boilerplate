
var height = parseInt(window.getComputedStyle(document.body).getPropertyValue('--cv-height'));
var width  = parseInt(window.getComputedStyle(document.body).getPropertyValue('--cv-width'));
console.log(height + " " + width)

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50, (width / 2) / (height / 2), 0.1, 1000);
camera.position.z = 50;
camera.lookAt( scene.position );

var directionalLight = new THREE.DirectionalLight( 0xf3ffff );
directionalLight.position.set( 0, 0, 1 ).normalize();
scene.add( directionalLight );

var directionalLight2 = new THREE.DirectionalLight( 0xf3ffff );
directionalLight2.position.set( 1, 0, 0 ).normalize();
scene.add( directionalLight2 );

var directionalLight3 = new THREE.DirectionalLight( 0xf3ffff );
directionalLight3.position.set( 0, 1, 0 ).normalize();
scene.add( directionalLight3 );

var mesh = null;

var objLoader = new THREE.OBJLoader();
objLoader.setPath( "model/" );
objLoader.load( 'test.obj', function ( object ) {

  mesh = object;
  //console.log(mesh)
  scene.add( mesh );

} );

var renderer = new THREE.WebGLRenderer( { canvas: cv, antialias: true, alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );

animate();

var direction = 0

function animate() {

  requestAnimationFrame( animate );
	if( mesh !== null ) {
    if(direction == 0){
      mesh.rotation.x += 0.001;
    }else{
      mesh.rotation.x -= 0.001;
    }

    if(mesh.rotation.x > 0.4){
      direction = 1
    }
    if(mesh.rotation.x < -0.4){
      direction = 0
    }
    mesh.rotation.y += 0.01;
  }

  renderer.render( scene, camera );

}
