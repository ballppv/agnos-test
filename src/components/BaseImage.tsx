import React, { useState } from 'react'

const ClickableBaseImage: React.FC<{
  baseImage: string
  partImages: string[]
  detailImages: string[]
}> = ({ baseImage, partImages, detailImages }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedAreas, setSelectedAreas] = useState<Set<number>>(new Set())

  const toggleSelection = (index: number) => {
    setSelectedAreas((prev) => {
      const newSelection = new Set(prev)
      if (newSelection.has(index)) {
        newSelection.delete(index)
      } else {
        newSelection.add(index)
      }
      return newSelection
    })
  }

  // Define clickable areas for 8 parts
  const areas = [
    { x: 0, y: 0, width: 80, height: 80, index: 0 },
    { x: 0, y: 0, width: 80, height: 80, index: 1 },
    { x: 210, y: 10, width: 80, height: 80, index: 2 },
    { x: 310, y: 10, width: 80, height: 80, index: 3 },
    { x: 10, y: 110, width: 80, height: 80, index: 4 },
    { x: 110, y: 110, width: 80, height: 80, index: 5 },
    { x: 210, y: 110, width: 80, height: 80, index: 6 },
    { x: 310, y: 110, width: 80, height: 80, index: 7 },
  ]

  return (
    <svg width="100%" height="auto" viewBox="0 0 400 300">
      <image href={baseImage} width="400" height="300" />
      {areas.map(({ x, y, width, height, index }) => (
        <g key={index}>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={selectedAreas.has(index) ? 'rgba(0, 0, 255, 0.5)' : 'transparent'}
            onClick={() => toggleSelection(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ cursor: 'pointer' }}
          />
          <image
            href={partImages[index]}
            width={width}
            height={height}
            x={x}
            y={y}
            opacity={selectedAreas.has(index) ? 1 : 0.7} // Change opacity based on selection
          />
        </g>
      ))}
      {hoveredIndex !== null && (
        <image
          href={detailImages[hoveredIndex]}
          width="100" // Adjust size as needed
          height="100" // Adjust size as needed
          x={areas[hoveredIndex].x + areas[hoveredIndex].width} // Position next to the part
          y={areas[hoveredIndex].y} // Align vertically with the part
        />
      )}
    </svg>
  )
}

export default ClickableBaseImage
