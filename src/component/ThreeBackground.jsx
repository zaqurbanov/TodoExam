import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const COLORS = [0x7BA7D4, 0x88C9A1, 0xC4A8D4, 0xE8B4A0, 0xA8C4D4]

const ThreeBackground = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const w = window.innerWidth
    const h = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const spheres = []
    for (let i = 0; i < 45; i++) {
      const radius = Math.random() * 0.09 + 0.025
      const geo = new THREE.SphereGeometry(radius, 10, 10)
      const mat = new THREE.MeshBasicMaterial({
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        transparent: true,
        opacity: Math.random() * 0.22 + 0.06,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 4
      )
      mesh.userData = {
        speedY: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
        speedX: (Math.random() * 0.002 + 0.0005) * (Math.random() < 0.5 ? 1 : -1),
        offset: Math.random() * Math.PI * 2,
      }
      scene.add(mesh)
      spheres.push(mesh)
    }

    let animId
    let t = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.008

      spheres.forEach(s => {
        s.position.y += Math.sin(t + s.userData.offset) * 0.003
        s.position.x += Math.cos(t * 0.6 + s.userData.offset) * 0.0015
        if (s.position.y > 5.5) s.position.y = -5.5
        if (s.position.y < -5.5) s.position.y = 5.5
      })

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}

export default ThreeBackground
