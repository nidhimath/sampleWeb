// Initialize the Three.js scene
function initMeshViewer() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('mesh-container').appendChild(renderer.domElement);

    // Add a light to the scene
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load OBJ files
    const loader = new THREE.OBJLoader();
    loader.load('mesh/lunarlandernofoil-carbajal.obj', function (object) {
        scene.add(object);
        object.position.y = -1; // Adjust object position if needed
    });

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

// Ensure the script runs after the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    initMeshViewer();
});
