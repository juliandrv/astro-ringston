import { Ring } from './Ring';

import LoaderAstro from './Loader.astro';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Suspense } from 'react';

const Fallback = () => {
  return (
    <Html>
      <div className='loading-screen'>
        <svg
          width='106'
          height='106'
          viewBox='0 0 106 106'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M53 44.1668L35.3333 19.4335L42.4 8.8335H63.6L70.6667 19.4335L53 44.1668ZM68.4583 30.0335L63.1583 37.5418C72.875 41.5168 79.5 50.7918 79.5 61.8335C79.5 68.8617 76.708 75.6021 71.7383 80.5718C66.7686 85.5415 60.0282 88.3335 53 88.3335C45.9718 88.3335 39.2314 85.5415 34.2617 80.5718C29.2919 75.6021 26.5 68.8617 26.5 61.8335C26.5 50.7918 33.125 41.5168 42.8417 37.5418L37.5417 30.0335C25.6167 35.7752 17.6667 47.7002 17.6667 61.8335C17.6667 71.2045 21.3893 80.1917 28.0156 86.8179C34.6418 93.4442 43.629 97.1668 53 97.1668C62.371 97.1668 71.3581 93.4442 77.9844 86.8179C84.6107 80.1917 88.3333 71.2045 88.3333 61.8335C88.3333 47.7002 80.3833 35.7752 68.4583 30.0335Z'
            fill='black'
          ></path>
        </svg>
      </div>
    </Html>
  );
};

const Scene = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Ring />
      </Suspense>
    </>
  );
};

export const World = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={1} />
      <directionalLight
        position={[0, 0, 3]}
        intensity={50}
        color={'lightblue'}
      />
      <directionalLight
        position={[0, 3, 0]}
        intensity={50}
        color={'lightblue'}
      />
      {/* <OrbitControls/> */}
      <Scene />
    </Canvas>
  );
};

export default World;
