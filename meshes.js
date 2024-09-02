document.addEventListener('DOMContentLoaded', function () {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300); // Set to desired size of the mesh container
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add renderer to all mesh containers
    document.querySelectorAll('.mesh-viewer').forEach(container => {
        container.appendChild(renderer.domElement.cloneNode(true));
    });

    // Create and animate each mesh
    const loader = new THREE.OBJLoader();
    const meshes = [
        { id: 'mesh1', url: 'path/to/mesh1.obj' },
        { id: 'mesh2', url: 'path/to/mesh2.obj' },
        { id: 'mesh3', url: 'path/to/mesh3.obj' }
    ];

    function addMesh(id, url) {
        const container = document.getElementById(id);
        if (!container) return;

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        loader.load(url, (object) => {
            scene.add(object);

            function animate() {
                requestAnimationFrame(animate);
                object.rotation.y += 0.01; // Rotate mesh for better visibility
                renderer.render(scene, camera);
            }
            animate();
        }, undefined, function (error) {
            console.error('An error happened while loading the OBJ file:', error);
        });
    }

    // Initialize meshes
    meshes.forEach(mesh => addMesh(mesh.id, mesh.url));
});
