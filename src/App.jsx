import { useState } from 'react'
import LeftLogo from '/house.svg'
import './App.css'
import * as Cookies from 'es-cookie'

async function filList() {
  const curPath = window.location.pathname
//  console.log(curPath)
  console.log(Cookies.get('oldPath'));

  try {
    const res = await fetch('http://localhost/api/wawAPI/' + curPath)
    const text = await res.text()
//	console.log(text);
	Cookies.set('oldPath', curPath);
    return text
  } catch (err) {
    console.error('fetch failed:', err)
    return 'error fetching'
  }
}

function App() {
	const [oldPath, setoldPath] = useState((!Cookies.get('oldPath'))? "NOT SET YET" : Cookies.get('oldPath'));
	const [path, setPath] = useState(null);
	return (
		<>
		<div>
			<a href="/" target="_blank">
				<img src={LeftLogo} className="logo" />
			</a>
		</div>
		<h1>The Team</h1>
		<div className="card">
			<p> THE OLD PATH IS {oldPath} </p>
			<button onClick={() => {setPath(filList())}}>
				GET THE PATH DUMMIE
			</button>
		</div>
		<p className="we" > {path} </p>
	</>
	)
}

export default App
