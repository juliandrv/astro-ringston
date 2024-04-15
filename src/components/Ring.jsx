import { useEffect, useRef } from 'react';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Ring(props) {
  const { nodes, materials } = useGLTF('/ring.glb');

  const ringRef = useRef();
  const tl = useRef();

  const scroll = useScroll();

  let contactRotation = false;
  let preview = false;

  useFrame((state, delta) => {
    if (!contactRotation) {
      ringRef.current.rotation.y += 0.5 * delta;
      ringRef.current.rotation.x = 0;
      ringRef.current.rotation.x = 0;
    } else {
      ringRef.current.rotation.y = 0;
      ringRef.current.rotation.x += 0.2 * delta;
      ringRef.current.rotation.z += 0.2 * delta;
    }

    if (preview) {
      ringRef.current.rotation.y += 0.5 * delta;
      ringRef.current.rotation.x = 0;
      ringRef.current.rotation.z = 0;
    }
    //tl.current.seek(scroll.offset * tl.current.duration());
  });

  useEffect(() => {
    tl.current = gsap.timeline({
      defaults: {
        duration: 7,
        ease: 'power3.out',
      },
      scrollTrigger: {
        trigger: 'section.details',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.current.to(ringRef.current.position, {
      z: 5,
    });
    tl.current.to(
      ringRef.current.rotation,
      {
        z: 1,
      },
      '<'
    );

    const toggleWireframe = (ref, bool, opacity) => {
      ref.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = bool;
          child.material.opacity = opacity;
          child.material.transparent = true;
        }
      });
    };

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'section.contact',
        start: 'top 80%',
        end: 'bottom center',
        scrub: true,
        onEnter: () => {
          toggleWireframe(ringRef, true, 0.3);
          contactRotation = true;
        },
        onEnterBack: () => {
          toggleWireframe(ringRef, true, 0.3);
          contactRotation = true;
        },
        onLeave: () => {
          toggleWireframe(ringRef, false, 1);
          contactRotation = false;
        },
        onLeaveBack: () => {
          toggleWireframe(ringRef, false, 1);
          contactRotation = false;
        },
      },
    });

    contactTl.to(ringRef.current.position, {
      z: 0,
      x: 0.5,
      y: 0,
    });

    const previewTl = gsap.timeline({
      scrollTrigger: {
        trigger: "[opts*='World'] > div",
        start: 'top center',
        end: 'bottom bottom',
        scrub: true,
        onEnter: () => {
          preview = true;
        },
        onEnterBack: () => {
          preview = true;
        },
        onLeave: () => {
          preview = false;
        },
        onLeaveBack: () => {
          preview = false;
        },
      },
    });

    previewTl.to(ringRef.current.position, {
      z: 1,
      x: 0,
      y: 0,
    });
  }, []);

  return (
    <group
      {...props}
      dispose={null}
      ref={ringRef}
      position={[0, 0, 0]}
    >
      <group
        name='Sketchfab_model'
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.005}
      >
        <group
          name='1935a2e0c54f49f68abfc53ac97c1f78fbx'
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name='Group38558_Retopo_Material_#33_0'
            castShadow
            receiveShadow
            geometry={
              nodes['Group38558_Retopo_Material_#33_0'].geometry
            }
            material={materials.Material_33}
            position={[-1.286, -69.838, -36.773]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[1.083, 0.984, 1.083]}
          />
          <mesh
            name='Group57578_Retopo_Material_#33_0'
            castShadow
            receiveShadow
            geometry={
              nodes['Group57578_Retopo_Material_#33_0'].geometry
            }
            material={materials.Material_33}
            position={[-1.44, -11.721, -24.603]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
            scale={4.989}
          />
          <mesh
            name='Object_1_Material_#34_0'
            castShadow
            receiveShadow
            geometry={nodes['Object_1_Material_#34_0'].geometry}
            material={materials.Material_34}
            position={[-1.439, 58.824, -24.6]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={23.716}
          />
          <mesh
            name='Object_24_Material_#34_0'
            castShadow
            receiveShadow
            geometry={nodes['Object_24_Material_#34_0'].geometry}
            material={materials.Material_34}
            position={[-1.286, -12.737, -60.1]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[5.481, 4.983, 5.481]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/ring.glb');
