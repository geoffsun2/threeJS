import React, { useRef } from 'react';
import { HeightfieldArgs, HeightfieldProps, useHeightfield } from '@react-three/cannon';
import { Mesh } from 'three';


const Ground = (props:HeightfieldProps) => {
  const terrainData = [
    [5,5,5,5,5],
    [5,5,5,5,5],
    [6,6,6,6,6]

  ];
  const args:HeightfieldArgs = [terrainData, {elementSize:1}]
  const [ref] = useHeightfield(() => ({args}), useRef<Mesh>(null));

  return (
    <mesh ref={ref} position={[0,0,0]}>
      {/* You can add visual representation or materials for your heightfield if needed */}
      
      <meshStandardMaterial />
    </mesh>
  );
};

export default Ground;
