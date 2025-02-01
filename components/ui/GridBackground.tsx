const gridColor = "rgba(255,255,255,0.1)"
const gridSize = 25

const GridBackground = () => {
  return (
    <div className='absolute inset-0 z-[-10] opacity-60' 
      style={{
        backgroundImage: `
        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
      `,
      backgroundSize: `${gridSize}px ${gridSize}px`,
    }}
   >
    </div>
  )
}

export default GridBackground;