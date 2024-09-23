import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { debounce } from 'lodash'
import { AbsDataType } from 'utilities/mockUpData'

interface AbsDiagramProps {
  data: AbsDataType[]
  baseImage: string
}

const PartImage = React.memo(({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
  />
))

const SVGOverlay = React.memo(({ children }: { children: React.ReactNode }) => (
  <svg
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}
    preserveAspectRatio="xMidYMid meet"
  >
    {children}
  </svg>
))

const AbsDiagram = ({ data, baseImage }: AbsDiagramProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const initialSelectedParts = () => {
    const savedParts = localStorage.getItem('selectedAbsParts')
    return savedParts ? JSON.parse(savedParts) : []
  }

  const [selectedParts, setSelectedParts] = useState<number[]>(initialSelectedParts)
  const [hoveredPart, setHoveredPart] = useState<number | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 600,
    height: 800,
  })

  useEffect(() => {
    localStorage.setItem('selectedAbsParts', JSON.stringify(selectedParts))
  }, [selectedParts])

  const convertPercentageToAbsolute = useCallback(
    (path: string) =>
      path
        .replace(/(\d+(\.\d+)?)%/g, (_, p1) => `${(parseFloat(p1) / 100) * dimensions.width}`)
        .replace(
          /(\d+(\.\d+)?),(\d+(\.\d+)?)%/g,
          (_, p1, _p2, p3) =>
            `${(parseFloat(p1) / 100) * dimensions.width},${(parseFloat(p3) / 100) * dimensions.height}`,
        ),
    [dimensions],
  )

  const debouncedUpdateDimensions = useCallback(
    debounce(() => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }, 300),
    [],
  )

  useEffect(() => {
    debouncedUpdateDimensions()
    window.addEventListener('resize', debouncedUpdateDimensions)
    return () => window.removeEventListener('resize', debouncedUpdateDimensions)
  }, [debouncedUpdateDimensions])

  const handleShapeClick = useCallback(
    (id: number) => {
      setSelectedParts((prev) =>
        id === 8
          ? prev.length === data.length - 1
            ? []
            : data.filter((part) => part.id !== 8).map((part) => part.id)
          : prev.includes(id)
            ? prev.filter((partId) => partId !== id)
            : [...prev, id],
      )
    },
    [data],
  )

  const getImage = useCallback(
    (id: number | null, type: 'partImage' | 'textImage') => {
      const part = data.find((p) => p.id === id)
      if (!part) return null
      if (type === 'partImage' && id === 8 && selectedParts.length === data.length - 1)
        return part.partImage
      if (type === 'partImage' && id !== null && selectedParts.includes(id)) return part.partImage
      if (type === 'textImage' && hoveredPart === id) return part.textImage
      return null
    },
    [data, selectedParts, hoveredPart],
  )

  const renderShapes = useMemo(
    () =>
      data.map((part) =>
        part.shape.type === 'polygon' ? (
          <path
            key={part.id}
            d={convertPercentageToAbsolute(part.shape.path || '')}
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleShapeClick(part.id)}
            fill="transparent"
            cursor="pointer"
          />
        ) : (
          <circle
            key={part.id}
            cx={(parseFloat(part.shape.cx || '0') / 100) * dimensions.width}
            cy={(parseFloat(part.shape.cy || '0') / 100) * dimensions.height}
            r={(parseFloat(part.shape.r || '0') / 100) * dimensions.width}
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => handleShapeClick(part.id)}
            fill="transparent"
            cursor="pointer"
          />
        ),
      ),
    [data, dimensions, handleShapeClick, convertPercentageToAbsolute],
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
        const textImage = getImage(part.id, 'textImage')
        return (
          <React.Fragment key={part.id}>
            {partImage && <PartImage key={`${part.id}-part`} src={partImage} alt={part.part} />}
            {textImage && (
              <PartImage key={`${part.id}-text`} src={textImage} alt={`${part.part} text`} />
            )}
          </React.Fragment>
        )
      })}

      <SVGOverlay>{renderShapes}</SVGOverlay>
    </div>
  )
}

export default AbsDiagram
