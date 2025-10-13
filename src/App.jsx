import './format.css'
import './other.css'
import FE from './FE.jsx';



function Decorator({AppType}){
	var relativeX = 0, relativeY = 0;
	var isDown = false;
	function handleMouseDown(e) {
		if(isDown == false){
			isDown = true;
			const rect = e.currentTarget.getBoundingClientRect();
			relativeX = e.clientX-rect.left;
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
			<p> {name} </p>
			<div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="decoratorHandle"/> 
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
	</>
	)
}

export default App;
