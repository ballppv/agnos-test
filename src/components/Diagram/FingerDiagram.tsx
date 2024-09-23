import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { debounce } from 'lodash'
import { FingerDataType } from 'utilities/mockUpData'

interface FingerDiagramProps {
  data: FingerDataType[]
  baseImage: string
  selectedParts: number[]
  setSelectedParts: React.Dispatch<React.SetStateAction<number[]>>
}

const FingerDiagram = ({
  data,
  baseImage,
  selectedParts,
  setSelectedParts,
}: FingerDiagramProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  const [hoveredPart, setHoveredPart] = useState<number | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 600,
    height: 800,
  })

  useEffect(() => {
    localStorage.setItem('selectedFingerParts', JSON.stringify(selectedParts))
  }, [selectedParts])

  // Debounced version of the dimensions update function
  const updateDimensions = useCallback(
    debounce(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }, 300), // Debounce delay in milliseconds
    [],
  )

  useEffect(() => {
    updateDimensions() // Initial call to set dimensions
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [updateDimensions])

  // Debounced handle shape click
  const handleShapeClick = useCallback(
    debounce((id: number) => {
      setSelectedParts((prevSelected) => {
        if (id === 4) {
          return [4]
        } else {
          return prevSelected.includes(id)
            ? prevSelected.filter((partId) => partId !== id)
            : [...prevSelected.filter((partId) => partId !== 4), id]
        }
      })
    }, 200), // Debounce delay in milliseconds
    [],
  )

  const getImage = useCallback(
    (id: number | null, type: 'partImage' | 'textImage') => {
      const part = data.find((p) => p.id === id)
      if (!part) return null

      if (type === 'partImage') {
        if (id !== null && selectedParts.includes(id)) return part.partImage
      }

      if (type === 'textImage' && hoveredPart === id) {
        return part.textImage
      }

      return null
    },
    [data, selectedParts, hoveredPart],
  )

  const convertPath = (path: string) =>
    path
      .replace(/(\d+(\.\d+)?)%/g, (_, p1) => `${(parseFloat(p1) / 100) * dimensions.width}`)
      .replace(
        /(\d+(\.\d+)?),(\d+(\.\d+)?)%/g,
        (_, p1, _p2, p3) =>
          `${(parseFloat(p1) / 100) * dimensions.width},${(parseFloat(p3) / 100) * dimensions.height}`,
      )

  const renderShapes = useMemo(
    () =>
      data.map((part) =>
        part.shapes.map((shape, index) => {
          const { type, path, cx, cy, r } = shape
          const isSelected = selectedParts.includes(part.id)
          const isHovered = hoveredPart === part.id

          if (type === 'polygon') {
            return (
              <path
                key={`${part.id}-${index}`}
                d={path ? convertPath(path) : ''}
                className={`voronoi-cell ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => handleShapeClick(part.id)}
                fill="transparent"
                cursor="pointer"
              />
            )
          }

          if (type === 'circle') {
            return (
              <circle
                key={`${part.id}-${index}`}
                cx={(parseFloat(cx ?? '0') / 100) * dimensions.width}
                cy={(parseFloat(cy ?? '0') / 100) * dimensions.height}
                r={(parseFloat(r ?? '0') / 100) * dimensions.width}
                className={`voronoi-cell ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => handleShapeClick(part.id)}
                fill="transparent"
                cursor="pointer"
              />
            )
          }

          return null
        }),
      ),
    [data, dimensions, selectedParts, hoveredPart, handleShapeClick],
  )

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '600px',
        maxHeight: '800px',
      }}
    >
      <img src={baseImage} alt="Base" style={{ width: '100%', height: '100%' }} />

      {data.map((part) => {
        const partImage = getImage(part.id, 'partImage')
        return partImage ? (
          <img
            key={part.id}
            src={partImage}
            alt={part.part}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        ) : null
      })}

      {data.map((part) => {
        const textImage = getImage(part.id, 'textImage')
        return textImage ? (
          <img
            key={part.id}
            src={textImage}
            alt={`${part.part} text`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        ) : null
      })}

      <svg
        ref={svgRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {renderShapes}
      </svg>
    </div>
  )
}

export default FingerDiagram
