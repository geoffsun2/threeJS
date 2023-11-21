import type {  CylinderArgs, CylinderProps, PlaneProps, SphereArgs, SphereProps } from '@react-three/cannon'
import { Debug, Physics, useCylinder, usePlane, useSphere} from '@react-three/cannon'
import {  Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'

import { useToggledControl } from './use-toggled-control'
import Vehicle from './vehicle/Vehicle'
import {Board} from './models/Board'
import { Park } from './models/Park'
import { City } from './models/City'
import Ground from './skatepark/Ground'
import Ramp from './skatepark/Ramp'



function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({args:[1,1,1] , material: 'ground', type: 'Static', ...props }), useRef<Group>(null))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  )
}

// function Pillar(props: CylinderProps) {
//   const args: CylinderArgs = [0.7, 0.7, 5, 16]
//   const [ref] = useCylinder(
//     () => ({
//       args,
//       mass: 10,
//       ...props,
//     }),
//     useRef<Mesh>(null),
//   )
//   return (
//     <mesh ref={ref} castShadow>
//       <cylinderGeometry args={args} />
//       <meshNormalMaterial />
//     </mesh>
//   )
// }

function Sphere({setSphereRef}, ...props) {
  const args: SphereArgs = [1]
  const [sphereRef] = useSphere(
    () => ({
      args,
      mass:10,
      ...props,
    }),
    setSphereRef
  )

  useEffect(() => {
    setSphereRef(sphereRef.current);
  }, [sphereRef, setSphereRef]);  
  return (
    <mesh ref={sphereRef} castShadow>
      <sphereGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  )
}

const FollowCamera = ({ target }) => {
  const { camera } = useThree();
  const cameraRef = useRef();

  useFrame(() => {
    // Update camera position and lookAt based on the target object (skateboard)
    if (target) {
      cameraRef.current.position.copy(target.position);
      cameraRef.current.position.y += 5; // Adjust the height of the camera
      cameraRef.current.lookAt(target.position);
    }
  });

  return <perspectiveCamera ref={cameraRef} />;
};

function App() {

  const ToggledDebug = useToggledControl(Debug, '?')
  const [sphereRef, setSphereRef] = useState();


  return (
    <div className='h-screen w-full'>
      <Canvas
            shadows
            // camera={{ fov: 50, position: [0, 5, 15] }}
            >
            {/* <fog attach="fog" args={['#171720', 10, 50]} /> */}
            <color attach="background" args={['#171720']} />
            <FollowCamera target={sphereRef} />

            <directionalLight intensity={1}/>
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.5} intensity={1} castShadow penumbra={1} />
            <Physics
              broadphase="SAP"
              defaultContactMaterial={{ contactEquationRelaxation: 4, friction: 1e-3 }}
              allowSleep
              >
              <Debug color={''}>
                <Plane rotation={[-Math.PI / 2,0, 0]} userData={{ id: 'floor' }} args={[5,5,1]}/>  
                {/* <Ground /> */}
                {/* <Ramp position={[0,0,0]}/> */}
                <Vehicle position={[0, 2, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, -0.2, 0]}/>
                <Sphere position={[5,0,0]} setSphereRef={setSphereRef}/>
                <City />
              </Debug>
            </Physics>
            <Suspense fallback={null}>
              <Environment preset="night" />
            </Suspense>
            <OrbitControls />
          </Canvas>
    </div>
     
  )
}

export default App
