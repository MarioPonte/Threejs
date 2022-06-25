var scene;
var camera;
var renderer;


var earthMesh;
var cloudMesh;


var createDirectionalLight = function() {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(100,0,0);
    directionalLight.name='directional';
    scene.add(directionalLight);
};


var createAmbientLight = function() {
    var ambientLight = new THREE.AmbientLight(0x111111, 1.0);
    ambientLight.name='ambient';
    scene.add(ambientLight);
};


var createEarthMaterial = function() {
    var earthTexture = new THREE.TextureLoader().load("images/earthmap4k.jpg");
    var normalMap = new THREE.TextureLoader().load("images/earth_normalmap_flat4k.jpg");
    var specularMap = new THREE.TextureLoader().load("images/earthspec4k.jpg");

    var earthMaterial = new THREE.MeshPhongMaterial();

    earthMaterial.map = earthTexture;

    earthMaterial.normalMap = normalMap;
    earthMaterial.normalScale.set(0.5, 0.7);

    earthMaterial.specularMap = specularMap;
    earthMaterial.specular = new THREE.Color(0x262626);

    return earthMaterial;

};

var createCloudMaterial = function() {
    var cloudTexture = new THREE.TextureLoader().load("images/fair_clouds_4k.png");
    var cloudMaterial = new THREE.MeshPhongMaterial();
    cloudMaterial.map = cloudTexture;
    cloudMaterial.transparent = true;
    return cloudMaterial;
};

var createASphere = function() {
    var sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
    var sphereMaterial = this.createEarthMaterial();

    earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    earthMesh.name = 'earth';

    scene.add(earthMesh);

    var cloudGeometry = new THREE.SphereGeometry(15.2, 60, 60);
    var cloudMaterial = this.createCloudMaterial();
    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.name = 'clouds';
    scene.add(cloudMesh);

};


var init = function() {
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0x020008 );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );


    this.createASphere();

    this.createAmbientLight();
    this.createDirectionalLight();

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 40;
    camera.lookAt(scene.position);


    document.body.appendChild( renderer.domElement );

    this.render();

};

var render = function() {
    earthMesh.rotation.y += 0.001;
    cloudMesh.rotation.y += 0.001*1.1;
    requestAnimationFrame( render );
    renderer.render( scene, camera );
};


window.onload = this.init;