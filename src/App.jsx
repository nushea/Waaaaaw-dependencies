import { useState } from 'react'
import { useEffect } from "react";
import LeftLogo from '/house.svg'
//import './App.css'
import './format.css'
import './other.css'
import * as Cookies from 'es-cookie'

async function filList() {
  const curPath = window.location.pathname
//  console.log(Cookies.get('oldPath'));

  try {
    const res = await fetch('http://localhost/api/wawAPI/' + curPath)
    const text = await res.text();
//	console.log(text.split('\n'));
	Cookies.set('oldPath', curPath);
	if((curPath.match(/\//g) || []).length == 2 && curPath.substring(1, curPath.lastIndexOf('/')) == "home")
		Cookies.set('Username', curPath.substring(curPath.lastIndexOf('/')+1));
    return text.split('\n');
  } catch (err) {
    console.error('fetch failed:', err)
    return 'error fetching'
  }
}
function File({item}){
	const path = item.substring(item.lastIndexOf(" "));
	const name = item.substring(item.lastIndexOf("/")+1);
	if(path.length > 0)
		return (
			<>
			<a href={path} className="card">
				<img src={LeftLogo} className="logo" />
				<p> {name} </p>
			</a>
			</>
		);
	return;
}
function HomeButton(){

	return (
		<>
			<a href="/home" className="nav">
				<img src={LeftLogo} className="logo" />
			</a>
		</>
	);
}


function NavBar(){
	return (
		<>
			<div id="navbar">
				<HomeButton />
				<HomeButton />
				<HomeButton />
				<HomeButton />
				<HomeButton />
				<HomeButton />
			</div>
		</>
	);
}
function App() {
	const [oldPath, setoldPath] = useState((!Cookies.get('oldPath'))? "NOT SET YET" : Cookies.get('oldPath'));
	const [path, setPath] = useState([]);
	useEffect(() => {
		filList().then(data => setPath(data));
	}, []);
	return (
		<>
		<div id="Items">
		<div id="Left">
			<NavBar />
		</div>
		<div id="Middle">
			<div id="Upper">
			<h1>The Team</h1>
			</div>
			<div id="Lower">
			<div className="Files">
			  {path.map((line, i) => (
				<div key={i}>
					<File item = {line} />
				  </div>
			  ))}
			</div>
			</div>
		</div>
		<div id="Right">
			<p> Right </p>
		</div>
		</div>
	</>
	)
}

export default App
