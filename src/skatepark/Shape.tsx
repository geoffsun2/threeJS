import React from 'react';
import { useConvexPolyhedron } from '@react-three/cannon';
import { ConvexGeometry } from 'three-stdlib';

 const vertices = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [0, 0, 1],
  ];

  const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [1, 0, 4],
    [2, 1, 4],
    [3, 2, 4],
    [0, 3, 4],
  ];

const ConvexPolyhedron = ({ position, rotation, args }) => {
  const [ref] = useConvexPolyhedron(() => ({ mass: 1, args, position, rotation }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};
