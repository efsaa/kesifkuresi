
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { toast } from "sonner";
import countryData from '../data/CountryData';

interface GlobeProps {
  onCountrySelect: (countryId: string) => void;
}

const Globe: React.FC<GlobeProps> = ({ onCountrySelect }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Earth texture loader
    const textureLoader = new THREE.TextureLoader();
    
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create a material with a texture for the Earth
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg', () => {
        setIsLoading(false);
      }),
      specularMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'),
      normalMap: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'),
      normalScale: new THREE.Vector2(0.85, 0.85)
    });
    
    // Create the Earth mesh and add it to the scene
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Add a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4fcfff,
      transparent: true,
      opacity: 0.1,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Add country markers
    const markers: THREE.Mesh[] = [];
    
    countryData.forEach(country => {
      const { lat, lng } = country.coordinates;
      
      // Convert latitude and longitude to 3D coordinates
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x40c4ff,
        transparent: true,
        opacity: 0.8
      });
      
      // Calculate position on the sphere
      const x = -(Math.sin(phi) * Math.cos(theta)) * 1.02;
      const y = Math.cos(phi) * 1.02;
      const z = (Math.sin(phi) * Math.sin(theta)) * 1.02;
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, y, z);
      marker.userData = { countryId: country.id };
      
      scene.add(marker);
      markers.push(marker);
    });

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 1.5;
    controls.maxDistance = 4;
    controls.enablePan = false;
    
    // Automatically rotate the globe slowly
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Raycaster for detecting marker clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Handle mouse clicks
    const handleMouseClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Calculate intersections with markers
      const intersects = raycaster.intersectObjects(markers);
      
      // If we have an intersection, trigger the country selection
      if (intersects.length > 0) {
        const selectedObject = intersects[0].object as THREE.Mesh;
        const countryId = selectedObject.userData.countryId;
        
        // Highlight the selected marker
        selectedObject.scale.set(1.5, 1.5, 1.5);
        setTimeout(() => {
          selectedObject.scale.set(1, 1, 1);
        }, 300);
        
        onCountrySelect(countryId);
        toast(`${countryData.find(country => country.id === countryId)?.name} seçildi`);
      } else {
        // Check if we clicked on the Earth itself
        const earthIntersects = raycaster.intersectObject(earth);
        if (earthIntersects.length > 0) {
          // Get the intersection point in sphere coordinates
          const point = earthIntersects[0].point.clone().normalize();
          
          // Convert to lat/long
          const lat = 90 - (Math.acos(point.y) * 180 / Math.PI);
          const lon = ((Math.atan2(point.z, point.x) * 180 / Math.PI) + 270) % 360 - 180;
          
          // Find the closest country
          let closestCountry = null;
          let minDistance = Infinity;
          
          countryData.forEach(country => {
            const dlat = country.coordinates.lat - lat;
            const dlon = country.coordinates.lng - lon;
            const distance = Math.sqrt(dlat*dlat + dlon*dlon);
            
            if (distance < minDistance) {
              minDistance = distance;
              closestCountry = country;
            }
          });
          
          if (closestCountry && minDistance < 20) { // Threshold for considering it a click on a country
            onCountrySelect(closestCountry.id);
            toast(`${closestCountry.name} seçildi`);
          }
        }
      }
    };
    
    window.addEventListener('click', handleMouseClick);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleMouseClick);
      controls.dispose();
    };
  }, [onCountrySelect]);
  
  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-lg text-primary font-medium">Dünya Yükleniyor...</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center px-6 py-3 rounded-full bg-background/40 backdrop-blur-md border border-primary/30">
        <p className="text-glow font-medium text-accent">Dünyayı çevirmek için sürükleyin. Ülke bilgisi için tıklayın.</p>
      </div>
    </div>
  );
};

export default Globe;
