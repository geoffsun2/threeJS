import { BoxProps, useBox } from '@react-three/cannon'
import { Box } from '@react-three/drei'
import React, { forwardRef } from 'react'
import { Group, Mesh } from 'three'
import { Board } from '../models/Board'

const Chassis = forwardRef<Mesh>((props, ref) => {

  return (
    <mesh ref={ref}>
      <Board scale={[10,10,10]} position={[0,-.2,0]}/>
      {/* <boxGeometry args={[1.7, 1, 4]} /> */}
      {/* <meshNormalMaterial /> */}
    </mesh>
  )
})

export default Chassis