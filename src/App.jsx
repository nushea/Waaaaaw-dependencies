import './format.css'
import './other.css'
import FE from './FE.jsx';

function BoundingSlider({slideVertical}){
	function boundingSliderLogic(e){
		console.log(slideVertical);
		if(slideVertical)
			e.currentTarget.parentNode.parentNode.parentNode.style.width = e.target.value + "%";
		else
			e.currentTarget.parentNode.parentNode.parentNode.style.height = e.target.value + "%";
		return;
	}
	return (
		<>
		<div className="sizeBar decoratorSlider">
			<input type="range" min="40" max="100" defaultValue="60" className="sizeSlider" onChange={(event) => { boundingSliderLogic(event) }}  />
		</div>
		</>
	);

}

function Decorator({AppType}){
	var relativeX = 0, relativeY = 0;
	var isDown = false;
	function handleMouseDown(e) {
		if(isDown == false){
			isDown = true;
			const rect = e.currentTarget.getBoundingClientRect();
			relativeX = e.clientX-rect.left + 220;
			relativeY = e.clientY-rect.top;
		}
	}
	function handleMouseUp() {
		isDown = false;
	}
	function handleMouseMove(e) {
		var parent = e.currentTarget.parentNode.parentNode;
		if(isDown){
			parent.style.left = (e.clientX - relativeX) + "px";
			parent.style.top = (e.clientY - relativeY) + "px";
		}
		console.log(isDown, relativeX, relativeY);
	}
	const name = AppType.name;
	return (
	<>
		<div className="decorator">
			<BoundingSlider slideVertical />
			<BoundingSlider />
			<div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="decoratorHandle"> 
			<p> {name} </p>
			</div>
			<div className="decoratorButtons">
				MMX
			</div>
		</div>
	</>
	)
}

function NewApp({AppType}){
	return (
	<>
		<div className="application">
			<Decorator AppType={AppType}/>
			<AppType />
		</div>
	</>
	);
}

function App() {
	return (
	<>
		<NewApp AppType={FE} />
		<NewApp AppType={FE} />
	</>
	)
}


export default App;
