var scene, camera, renderer;
var geometry, material, mesh;


function Executar() {
  
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({  color: 0xD1A963, wireframe: true });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0x0A0055);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var show = document.getElementById('container');
    
    show.appendChild(renderer.domElement);
 
    function animate() {

        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }
    animate();
}

window.onload = Executar;