import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Delaunay } from 'd3-delaunay'

interface Point {
  x: number
  y: number
}

const VoronoiDiagram: React.FC<{ points: Point[]; baseImage: string; activeImage: string }> = ({
  points,
  baseImage,
  activeImage,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selectedPoints, setSelectedPoints] = useState<Set<number>>(new Set())

  const toggleSelection = (index: number) => {
    setSelectedPoints((prev) => {
      const newSelection = new Set(prev)
      if (newSelection.has(index)) {
        newSelection.delete(index)
      } else {
        newSelection.add(index)
      }
      return newSelection
    })
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Clear previous render

    // Set dimensions
    const width = 800
    const height = 600

    // Create base image
    svg.append('image').attr('href', baseImage).attr('width', width).attr('height', height)

    // Create a Voronoi diagram
    const delaunay = Delaunay.from(points.map((p) => [p.x, p.y]))
    const voronoi = delaunay.voronoi([0, 0, width, height])

    const polygons = voronoi.cellPolygons()

    // Draw Voronoi cells
    svg
      .append('g')
      .selectAll('path')
      .data(Array.from(polygons) as Delaunay.Polygon[]) // Convert IterableIterator to array
      .enter()
      .append('path')
      .attr('d', (d) => (d ? `M${d.join('L')}Z` : ''))
      .attr('fill', 'none')
      .attr('stroke', 'lightgray')
      .on('click', (_, d) => {
        const index = delaunay.find(d[0][0], d[0][1])
        toggleSelection(index)
      })

    // Overlay active images for selected points
    svg
      .append('g')
      .selectAll('image')
      .data(points)
      .enter()
      .append('image')
      .attr('href', activeImage)
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', (d, i) => (selectedPoints.has(i) ? d.x - 10 : -20)) // Hide unselected images
      .attr('y', (d, i) => (selectedPoints.has(i) ? d.y - 10 : -20)) // Hide unselected images
  }, [points, baseImage, activeImage, selectedPoints])

  return <svg ref={svgRef} width={800} height={600}></svg>
}

export default VoronoiDiagram
