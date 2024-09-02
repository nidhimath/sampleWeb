// Ensure the document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300); // Adjust size to fit your design
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Set up the mesh containers
    document.querySelectorAll('.mesh-viewer').forEach(container => {
        container.appendChild(renderer.domElement.cloneNode(true));
    });

    // Load .obj files
    const loader = new THREE.OBJLoader();
    const meshes = [
        { id: 'mesh1', url: 'mesh/argo.onj' },
        { id: 'mesh2', url: 'mesh/astre.onj' },
        { id: 'mesh3', url: 'mesh/curiosity_scarecrow_rover.obj' }
    ];

    function addMesh(id, url) {
        const container = document.getElementById(id);
        if (!container) return;

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        loader.load(url, (object) => {
            const scene = new THREE.Scene();
            scene.add(object);

            function animate() {
                requestAnimationFrame(animate);
                object.rotation.y += 0.01; // Rotate mesh for better visibility
                renderer.render(scene, camera);
            }
            animate();
        });
    }

    // Initialize meshes
    meshes.forEach(mesh => addMesh(mesh.id, mesh.url));
});
