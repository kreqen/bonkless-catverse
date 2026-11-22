'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, RoundedBox, Sparkles } from '@react-three/drei'
import { Component, useRef } from 'react'
import type { Group } from 'three'
import { CatmullRomCurve3, Shape, Vector3 } from 'three'

type Pose = 'idle' | 'feed' | 'pet' | 'nap'
type Triple = [number, number, number]
const orange = '#ff861f'
const cream = '#ffca87'
const stripe = '#c84c15'
const ink = '#231125'
const ear = new Shape()
ear.moveTo(-0.27, -0.12)
ear.quadraticCurveTo(-0.27, 0.17, -0.13, 0.47)
ear.quadraticCurveTo(-0.07, 0.58, 0.01, 0.48)
ear.quadraticCurveTo(0.21, 0.27, 0.28, -0.11)
ear.quadraticCurveTo(0.04, -0.23, -0.27, -0.12)
const earDepth = {
  depth: 0.12,
  bevelEnabled: true,
  bevelThickness: 0.07,
  bevelSize: 0.06,
  bevelSegments: 4,
  curveSegments: 18,
}

const tailShape = new CatmullRomCurve3(
  [
    [0, 0, 0],
    [0.53, 0.05, -0.1],
    [0.87, 0.39, -0.17],
    [0.9, 0.88, -0.17],
    [0.76, 1.12, -0.17],
  ].map((p) => new Vector3(...p)),
)

function Oval({
  at,
  size,
  color,
  tilt = 0,
}: {
  at: Triple
  size: Triple
  color: string
  tilt?: number
}) {
  return (
    <mesh position={at} scale={size} rotation-z={tilt} castShadow>
      <sphereGeometry args={[1, 32, 24]} />
      <meshStandardMaterial
        color={color}
        roughness={color === ink ? 0.19 : 0.45}
      />
    </mesh>
  )
}

function Mascot({ pose, still }: { pose: Pose; still: boolean }) {
  const body = useRef<Group>(null!)
  const head = useRef<Group>(null!)
  const eyes = useRef<Group>(null!)
  const tail = useRef<Group>(null!)
  useFrame(({ clock, pointer }, delta) => {
    const t = still ? 0 : clock.elapsedTime
    const smooth = still ? 1 : 1 - Math.exp(-delta * 7)
    const blink = t % 4.2 > 4.02 ? 0.08 : 1
    eyes.current.scale.y +=
      ((pose === 'nap' ? 0.06 : pose === 'pet' ? 0.43 : blink) -
        eyes.current.scale.y) *
      smooth
    head.current.rotation.y +=
      ((still ? 0 : pointer.x * 0.28) - head.current.rotation.y) * smooth
    const roll = pose === 'nap' ? -0.32 : pose === 'pet' ? 0.19 : 0
    head.current.rotation.z += (roll - head.current.rotation.z) * smooth
    const dip =
      pose === 'feed'
        ? Math.sin(t * 19) * 0.11 + 0.22
        : still
          ? 0
          : pointer.y * -0.12
    head.current.rotation.x += (dip - head.current.rotation.x) * smooth
    body.current.scale.y = 1 + Math.sin(t * (pose === 'nap' ? 1.8 : 3)) * 0.023
    tail.current.rotation.z = Math.sin(t * (pose === 'pet' ? 5 : 2)) * 0.16
  })
  return (
    <group ref={body} rotation-y={-0.19}>
      <group ref={tail} position={[0.55, 0.44, -0.46]}>
        <mesh>
          <tubeGeometry args={[tailShape, 40, 0.17, 16, false]} />
          <meshStandardMaterial color={orange} roughness={0.28} />
        </mesh>
        <Oval
          at={[0.76, 1.1, -0.17]}
          size={[0.173, 0.18, 0.17]}
          color={stripe}
        />
      </group>
      <Oval at={[0, 0.73, 0]} size={[0.85, 0.74, 0.68]} color={orange} />
      <Oval at={[0, 0.6, 0.55]} size={[0.43, 0.5, 0.17]} color={cream} />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Oval
            at={[side * 0.43, 0.22, 0.55]}
            size={[0.38, 0.23, 0.4]}
            color={orange}
          />
          {[-1, 0, 1].map((toe) => (
            <Oval
              key={toe}
              at={[side * 0.43 + toe * 0.095, 0.19, 0.84]}
              size={[0.078, 0.105, 0.091]}
              color="#ffa455"
            />
          ))}
          <Oval
            at={[side * 0.6, 0.57, 0.41]}
            size={[0.19, 0.039, 0.035]}
            color={stripe}
            tilt={side * 0.38}
          />
          <Oval
            at={[side * 0.67, 0.7, 0.39]}
            size={[0.125, 0.034, 0.034]}
            color={stripe}
            tilt={side * 0.33}
          />
        </group>
      ))}
      <group ref={head} position={[0, 1.65, 0.2]}>
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.61, 0.52, -0.03]}
            rotation-z={-side * 0.27}
          >
            <mesh position-z={-0.07}>
              <extrudeGeometry args={[ear, earDepth]} />
              <meshStandardMaterial color={orange} roughness={0.46} />
            </mesh>
            <mesh position={[0, 0.05, 0.075]} scale={[0.59, 0.69, 0.28]}>
              <extrudeGeometry args={[ear, earDepth]} />
              <meshStandardMaterial color="#d77d85" roughness={0.54} />
            </mesh>
          </group>
        ))}
        <Oval at={[0, 0, 0]} size={[1.02, 0.7, 0.68]} color={orange} />
        {[-1, 0, 1].map((i) => (
          <Oval
            key={i}
            at={[i * 0.22, 0.46 - Math.abs(i) * 0.035, 0.49]}
            size={[0.043, 0.131, 0.018]}
            color={stripe}
            tilt={i * -0.35}
          />
        ))}
        <group ref={eyes} position={[0, 0.075, 0.61]}>
          {[-1, 1].map((side) => (
            <group key={side} position-x={side * 0.37}>
              <Oval
                at={[0, 0, 0]}
                size={[0.228, 0.224, 0.092]}
                color={ink}
                tilt={side * 0.12}
              />
              <Oval
                at={[-0.057, 0.08, 0.098]}
                size={[0.055, 0.06, 0.018]}
                color="#fff8ea"
              />
              <Oval
                at={[0.06, -0.065, 0.106]}
                size={[0.021, 0.023, 0.014]}
                color="#ffe0aa"
              />
            </group>
          ))}
        </group>
        {[-1, 1].map((side) => (
          <group key={side}>
            <Oval
              at={[side * 0.177, -0.2, 0.58]}
              size={[0.27, 0.168, 0.12]}
              color={cream}
            />
            {[0, 1, 2].map((i) => (
              <Oval
                key={i}
                at={[side * 0.62, -0.17 - i * 0.063, 0.57]}
                size={[0.235, 0.008, 0.01]}
                color="#ffe0aa"
                tilt={side * (0.19 - i * 0.16)}
              />
            ))}
            {[0, 1].map((i) => (
              <Oval
                key={i}
                at={[side * 0.76, -0.09 - i * 0.1, 0.41]}
                size={[0.16, 0.018, 0.02]}
                color={stripe}
                tilt={side * (0.22 - i * 0.43)}
              />
            ))}
          </group>
        ))}
        <Oval
          at={[0, -0.13, 0.705]}
          size={[0.092, 0.064, 0.045]}
          color="#7e3748"
        />
        <Oval
          at={[0, -0.285, 0.657]}
          size={[0.075, pose === 'feed' ? 0.065 : 0.022, 0.03]}
          color={ink}
        />
      </group>
    </group>
  )
}

function Props({ room, still }: { room: boolean; still: boolean }) {
  const can = useRef<Group>(null!)
  useFrame(({ clock }) => {
    const t = still ? 0 : clock.elapsedTime
    can.current.position.y = 1.85 + Math.sin(t * 1.6) * 0.14
    can.current.rotation.y = t * 0.45
  })
  return (
    <>
      <group ref={can} position={[1.47, 1.85, -0.15]} rotation-z={-0.27}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.31, 32]} />
          <meshStandardMaterial
            color="#2aebd3"
            metalness={0.32}
            roughness={0.27}
          />
        </mesh>
        {[-0.16, 0.16].map((y) => (
          <mesh key={y} position-y={y}>
            <cylinderGeometry args={[0.26, 0.26, 0.037, 32]} />
            <meshStandardMaterial
              color="#f5e9ff"
              metalness={0.65}
              roughness={0.27}
            />
          </mesh>
        ))}
        <Oval at={[0, 0, 0.25]} size={[0.112, 0.055, 0.02]} color="#232039" />
      </group>
      <group position={[-1.35, 0.42, -0.25]} rotation-y={0.22}>
        <RoundedBox args={[0.75, 0.66, 0.47]} radius={0.08}>
          <meshStandardMaterial color="#d1a8ed" />
        </RoundedBox>
        <RoundedBox
          position={[0, 0.035, 0.24]}
          args={[0.56, 0.42, 0.06]}
          radius={0.07}
        >
          <meshStandardMaterial color="#2b174d" />
        </RoundedBox>
        <Oval
          at={[0, 0.04, 0.29]}
          size={[0.13, 0.058, 0.018]}
          color="#d9ff39"
        />
      </group>
      {room && (
        <group>
          <Oval at={[0, -0.14, 0]} size={[2.05, 0.22, 1.26]} color="#442363" />
          <mesh
            rotation-x={-Math.PI / 2}
            position-y={0.034}
            scale={[1, 0.62, 1]}
          >
            <ringGeometry args={[1.84, 1.87, 80]} />
            <meshStandardMaterial
              color="#b582ed"
              emissive="#7d38bd"
              emissiveIntensity={0.45}
            />
          </mesh>
        </group>
      )}
      <Sparkles
        count={24}
        scale={[5, 3, 2]}
        position-y={1.55}
        size={3}
        speed={still ? 0 : 0.4}
        color="#d7ff44"
      />
    </>
  )
}

class SceneBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? (
      <p className="scene-message">
        3D is unavailable on this device. The illustrated view is active.
      </p>
    ) : (
      this.props.children
    )
  }
}

export default function CatScene({
  pose = 'idle',
  room = false,
  still = false,
}: {
  pose?: Pose
  room?: boolean
  still?: boolean
}) {
  return (
    <SceneBoundary>
      <div className="canvas-wrap" aria-hidden="true">
        <Canvas
          frameloop={still ? 'demand' : 'always'}
          fallback={
            <p>
              3D is unavailable on this device. The illustrated view is active.
            </p>
          }
          camera={{ position: [0, 2.15, 5.5], fov: 36 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ camera }) => camera.lookAt(0, 1.23, 0)}
        >
          <hemisphereLight args={['#ece0ff', '#48265e', 1.9]} />
          <directionalLight
            position={[3, 5, 4]}
            intensity={2.6}
            color="#ffdfb2"
          />
          <directionalLight
            position={[-3, 3, -2]}
            intensity={3.8}
            color="#ba79ff"
          />
          <Mascot pose={pose} still={still} />
          <Props room={room} still={still} />
          <ContactShadows
            opacity={0.68}
            blur={2.7}
            scale={6}
            far={3}
            resolution={256}
          />
        </Canvas>
      </div>
    </SceneBoundary>
  )
}
