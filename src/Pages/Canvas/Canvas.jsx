import { useState, useEffect } from 'react'
import { fabric } from 'fabric'

import { CIRCLE, RECTANGLE, LINE, TEXT, FILL, STROKE } from '../../assets/defaultShapes/defaultShapes'

import './Canvas.css'

export default function Canvas() {
	const [canvas, setCanvas] = useState(null)
	const [text, setText] = useState('')
	const [strokeColor, setStrokeColor] = useState('black')
	const [fillColor, setFillColor] = useState('')
	const [canvasObjects, setCanvasObjects] = useState([])

	useEffect(() => {
		const newCanvas = new fabric.Canvas('canvas')
		newCanvas.setHeight(500)
		newCanvas.setWidth(500)
		newCanvas.renderAll()
		setCanvas(newCanvas)
	},[])

	useEffect(() => {
		canvas?.add(canvasObjects[canvasObjects.length-1])
	},[canvasObjects])
  
	function AddCircle() {
		const object = new fabric.Circle({
			...CIRCLE,
			fill: fillColor,
			stroke: strokeColor
		})
		setCanvasObjects(current => [...current, object])
	}

	function onAddRectangle() {
		const object = new fabric.Rect({
		  ...RECTANGLE,
		  fill: fillColor,
		  stroke: strokeColor
		})
		setCanvasObjects(current => [...current, object])
	}

	function onAddLine() {
		const object = new fabric.Line(LINE.points, {
		  ...LINE.options,
		  stroke: strokeColor
		})
		setCanvasObjects(current => [...current, object])
	}

	function onAddText() {
		// use stroke in text fill, fill default is most of the time transparent
		const object = new fabric.Textbox(text, { ...TEXT, fill: strokeColor })
		object.set({ text: text })
		setCanvasObjects(current => [...current, object])
	}

	function onSetStrokeColor() {
	  editor?.setStrokeColor(strokeColor)
	}

	function onSetFillColor() {
	  editor?.setFillColor(fillColor)
	}

	function onDeleteAll() {
		canvas.getObjects().forEach((object) => canvas.remove(object))
		canvas.discardActiveObject()
		canvas.renderAll()
	}

	function onDeleteSelected() {
		canvas.getActiveObjects().forEach((object) => canvas.remove(object))
		canvas.discardActiveObject()
		canvas.renderAll()
	}

	function toggleBrush() {
		canvas.isDrawingMode = !canvas.isDrawingMode
	}

	return (
	  <>
		<div>
		<button onClick={toggleBrush}>Brush</button>
		<button onClick={AddCircle}>Add circle</button>
		<button onClick={onAddRectangle}>Add Rectangle</button>
		<button onClick={onAddLine}>Add Line</button>
		<button onClick={onDeleteAll}>Delete All</button>
		<button onClick={onDeleteSelected}>Delete Selected</button>
		<input
			type='text'
			value={text}
			onChange={(e) => setText(e.target.value)}
		/>
		<button onClick={onAddText}>Add Text</button>
		<input
			type='text'
			value={strokeColor}
			onChange={(e) => setStrokeColor(e.target.value)}
		/>
		<button onClick={onSetStrokeColor}>Set Stroke Color</button>
		<input
			type='text'
			value={fillColor}
			onChange={(e) => setFillColor(e.target.value)}
		/>
		<button onClick={onSetFillColor}>Set Fill Color</button>
		</div>
		<canvas onMouseUp={onMouseUp} id="canvas"></canvas>
	  </>
  )
}