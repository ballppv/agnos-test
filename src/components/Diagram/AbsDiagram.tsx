import React, { useRef, useState, useEffect } from 'react'
import { AbsDataType } from 'utilities/mockUpData'

interface AbsDiagramProps {
  data: AbsDataType[]
  baseImage: string
}

const AbsDiagram = ({ data, baseImage }: AbsDiagramProps) => {
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

    handleResize() // init dimensions
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // fx: get the part image based on selected state
  const getPartImage = (id: number | null) => {
    const part = data.find((p) => p.id === id)
    if (!part) return null

    if (id === 8 && selectedParts.length === data.length - 1) {
      return part.partImage
    }

    if (id !== null && selectedParts.includes(id)) {
      return part.partImage
    }

    return null
  }

  // fx: get the text image based on hovered state
  const getTextImage = (id: number | null) => {
    const part = data.find((p) => p.id === id)
    if (!part) return null

    if (hoveredPart === id) {
      return part.textImage
    }

    return null
  }

  // fx: handle the click event on a shape
  const handleShapeClick = (id: number) => {
    if (id === 8) {
      // toggle select all and clear all
      if (selectedParts.length === data.length - 1) {
        setSelectedParts([])
      } else {
        setSelectedParts(data.filter((part) => part.id !== 8).map((part) => part.id)) // id 8 is the select all, so don't have to get it in the array
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
      {/* base image */}
      <img
        src={baseImage}
        alt="Base"
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {/* display part images based on selected state */}
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

      {/* display text images based on hovered state */}
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

      {/* SVG overlay for clickable and hoverable areas */}
      <svg
        ref={svgRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} // dynamically adjust viewbox
        preserveAspectRatio="xMidYMid meet"
      >
        {data.map((shape) => {
          if (shape.shape.type === 'polygon') {
            return (
              <path
                key={shape.id}
                d={
                  shape.shape.path
                    ? shape.shape.path
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
                } // change percentage paths to responsive paths
                onMouseEnter={() => setHoveredPart(shape.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => handleShapeClick(shape.id)}
                fill="transparent"
                cursor="pointer"
              />
            )
          }

          if (shape.shape.type === 'circle') {
            return (
              <circle
                key={shape.id}
                cx={(parseFloat(shape.shape.cx ?? '0') / 100) * dimensions.width}
                cy={(parseFloat(shape.shape.cy ?? '0') / 100) * dimensions.height}
                r={(parseFloat(shape.shape.r ?? '0') / 100) * dimensions.width}
                onMouseEnter={() => setHoveredPart(shape.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onClick={() => handleShapeClick(shape.id)}
                fill="transparent"
                cursor="pointer"
              />
            )
          }
        })}
      </svg>
    </div>
  )
}

export default AbsDiagram
