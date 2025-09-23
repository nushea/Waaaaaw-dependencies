import { useState } from 'react'
import { useEffect } from "react";
import LeftLogo from '/house.svg'
//import './App.css'
import './format.css'
import './other.css'
import * as Cookies from 'es-cookie'

async function filList() {
  const curPath = window.location.pathname

  try {
    const res = await fetch('http://localhost/api/wawAPI/' + curPath)
    const text = await res.text();
//	console.log(text.split('\n'));
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
	const homepath = (!Cookies.get("Username"))? "/home" : "/home/"+Cookies.get("Username");
	return (
		<>
			<a href={homepath} className="nav">
				<img src="/img/icons8-home-96.png" />
			</a>
		</>
	);
}

function UpButton(){
	var path = window.location.pathname;
	path = path.substring(0, path.lastIndexOf('/'));
	return (
		<>
			<a href={path} className="nav">
				<img src="/img/icons8-upward-96.png" />
			</a>
		</>
	);
}

function LeftButton(){
	return (
		<>
			<button onClick={() => { history.go(-1); } } className="nav navbut">
				<img src="/img/icons8-back-96.png" />
			</button>
		</>
	);
}

function RightButton(){
	return (
		<>
			<button onClick={() => { history.go(1); } } className="nav navbut">
				<img src="/img/icons8-forward-96.png" />
			</button>
		</>
	);
}

function NavBar(){
	return (
		<>
			<div id="navbar">
				<div id="AppName">
					<p>WÃÃW</p>
					<HomeButton />
				</div>
				<div id="navButtons">
					<LeftButton />
					<RightButton />
					<UpButton />
				</div>
			</div>
		</>
	);
}


function BreadCrumbs(){
	var path = window.location.pathname;
	return (
		<>
		<form onSubmit={(event) => {event.preventDefault();window.location = document.getElementById("breadcrumbs").value;}}>
			<input id="breadcrumbs" defaultValue={path}  />
		</form>
		</>
	);
}
function App() {
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
				<BreadCrumbs />
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
				<div id="Preview">
					<p> Dummy preview </p>
				</div>
				<div id="credits">
					<a href={"https://icons8.com/"}>
						Icons by https://icons8.com/
					</a>
				</div>
			</div>
		</div>
			
	</>
	)
}

export default App
