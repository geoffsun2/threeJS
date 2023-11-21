import React from 'react';
import { useHeightfield, useBox, usePlane, HeightfieldArgs } from '@react-three/cannon';

const Ramp = ({ position }) => {
  // Create a heightfield shape for the inclined surface of the ramp
  const data =  [
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4]
  ]
  const args: HeightfieldArgs = [data, {elementSize: 1}]
  const [heightfieldRef] = useHeightfield(() => ({ args,  }));

  // Create boxes for the sides of the ramp
  const [side1Ref] = useBox(() => ({
    args: [1, 2, 10], // Width, height, length
    position: [position[0] - 5, position[1], position[2]],
  }));

  const [side2Ref] = useBox(() => ({
    args: [1, 10, 10],
    position: [position[0] + 5, position[1], position[2]],
  }));

  // Create a plane for the base of the ramp
  const [baseRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate the plane to make it horizontal
    position: [position[0], position[1] - 1, position[2]],
  }));

  return (
    <>
      {/* Render your visual components if needed */}
      <mesh>
        {/* Visual representation of the heightfield */}
        <planeGeometry args={[10, 10, 9, 9]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Attach the cannon.js bodies to the visual components */}
      <group ref={heightfieldRef} />
      <group ref={side1Ref} />
      <group ref={side2Ref} />
      <group ref={baseRef} />
    </>
  );
};

export default Ramp;
