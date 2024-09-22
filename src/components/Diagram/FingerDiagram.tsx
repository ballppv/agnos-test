import React, { useRef, useState, useEffect } from 'react'
import { FingerDataType } from 'utilities/mockUpData'

interface FingerDiagramProps {
  data: FingerDataType[]
  baseImage: string
}

const FingerDiagram = ({ data, baseImage }: FingerDiagramProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selectedParts, setSelectedParts] = useState<number[]>([])
  const [hoveredPart, setHoveredPart] = useState<number | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 600,
    height: 800,
  })

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getPartImage = (id: number | null) => {
    const part = data.find((p) => p.id === id)
    if (!part) return null

    if (id === 4 && selectedParts.length === data.length - 1) {
      return part.partImage
    }

    if (id !== null && selectedParts.includes(id)) {
      return part.partImage
    }

    return null
  }

  const getTextImage = (id: number | null) => {
    const part = data.find((p) => p.id === id)
    if (!part) return null

    if (hoveredPart === id) {
      return part.textImage
    }

    return null
  }

  const handleShapeClick = (id: number) => {
    if (id === 4) {
      if (selectedParts.length === data.length - 1) {
        setSelectedParts([])
      } else {
        setSelectedParts(data.filter((part) => part.id !== 4).map((part) => part.id))
      }
    } else {
      setSelectedParts((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((partId) => partId !== id)
          : [...prevSelected, id],
      )
    }
  }

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
        const partImage = getPartImage(part.id)
        return partImage ? (
          <img
            key={part.id}
            src={partImage}
            alt={part.part}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        ) : null
      })}

      {data.map((part) => {
        const textImage = getTextImage(part.id)
        return textImage ? (
          <img
            key={part.id}
            src={textImage}
            alt={`${part.part} text`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        ) : null
      })}

      <svg
        ref={svgRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {data.map((part) =>
          part.shapes.map((shape, index) => {
            if (shape.type === 'polygon') {
              return (
                <path
                  key={`${part.id}-${index}`}
                  d={
                    shape.path
                      ? shape.path
                          .replace(
                            /(\d+(\.\d+)?)%/g,
                            (_, p1) => `${(parseFloat(p1) / 100) * dimensions.width}`,
                          )
                          .replace(
                            /(\d+(\.\d+)?),(\d+(\.\d+)?)%/g,
                            (_, p1, _p2, p3) =>
                              `${(parseFloat(p1) / 100) * dimensions.width},${(parseFloat(p3) / 100) * dimensions.height}`,
                          )
                      : ''
                  }
                  className={`voronoi-cell ${
                    selectedParts.includes(part.id) ? 'selected' : ''
                  } ${hoveredPart === part.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredPart(part.id)}
                  onMouseLeave={() => setHoveredPart(null)}
                  onClick={() => handleShapeClick(part.id)}
                  fill="transparent"
                  cursor="pointer"
                />
              )
            }

            if (shape.type === 'circle') {
              return (
                <circle
                  key={`${part.id}-${index}`}
                  cx={(parseFloat(shape.cx ?? '0') / 100) * dimensions.width}
                  cy={(parseFloat(shape.cy ?? '0') / 100) * dimensions.height}
                  r={(parseFloat(shape.r ?? '0') / 100) * dimensions.width}
                  className={`voronoi-cell ${
                    selectedParts.includes(part.id) ? 'selected' : ''
                  } ${hoveredPart === part.id ? 'hovered' : ''}`}
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
        )}
      </svg>
    </div>
  )
}

export default FingerDiagram
