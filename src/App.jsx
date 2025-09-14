import { useState } from 'react'
import LeftLogo from '/house.svg'
import './App.css'
import * as Cookies from 'es-cookie'

function filList(){
	var curPath = window.location.pathname;
	console.log(curPath);
	return curPath;
}

function App() {
	const [count, setCount] = useState(+Cookies.get('count'));
	const [path, setPath] = useState(null);
	return (
		<>
		<div>
			<a href="https://iam.gay" target="_blank">
				<img src={LeftLogo} className="logo" />
			</a>
		</div>
		<h1>The Team</h1>
		<div className="card">
			<button onClick={() => {setCount((count) => count + 1);	Cookies.set('count', count+1);} }>
				you clicked teh button {count} times
			</button>
			<button onClick={() => {setPath(filList())}}>
				GET THE PATH DUMMIE
			</button>
		</div>
		<p className="we" > {path} </p>
	</>
	)
}

export default App
