import { useState } from 'react'
import { useEffect } from "react";
import LeftLogo from '/house.svg'
//import './App.css'
import './format.css'
import './other.css'
import * as Cookies from 'es-cookie'
import { useLocation, BrowserRouter, Routes, Route } from "react-router"

async function filList(pathname) {
	var curPath = pathname;

	try {
		const res = await fetch('http://localhost/api/wawAPI/' + curPath)
		const text = await res.text();
		if((curPath.match(/\//g) || []).length == 2 && curPath.substring(1, curPath.lastIndexOf('/')) == "home")
			Cookies.set('Username', curPath.substring(curPath.lastIndexOf('/')+1));
		return text.split('\n');
	  } catch (err) {
		console.error('fetch failed:', err)
		return 'error fetching'
	  }
}
function File({item, setPath}){
	const path = item.substring(item.lastIndexOf(" ")+1);
	const name = item.substring(item.lastIndexOf("/")+1);
	if(path.length > 0){
		if(item.substring(0,1) == "#")
			return (
				<>
				<button onClick={() => setPath(path)} className="card">
					<img src="/img/icons8-folder-96.png" className="logo" />
					<p> {name} </p>
				</button>
				</>
			);
		else{
			return (
				<>
				<button onClick={() => setPath(path)} className="card">
					<img src="/img/icons8-file-96.png" className="logo" />
					<p> {name} </p>
				</button>
				</>
			)
		}
	}
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
	var path = useLocation().pathname;
	path = path.substring(0, path.lastIndexOf('/'));
	if(!path) path = "/";
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
			<div className="navbar">
				<div className="AppName">
					<p>WÃÃW</p>
					<HomeButton />
				</div>
				<div className="navButtons">
					<LeftButton />
					<RightButton />
					<UpButton />
				</div>
			</div>
		</>
	);
}


function BreadCrumbs({path, setPath}){
	const [crumb, setCrumb] = useState(path);
	useEffect(() => {
		setCrumb(path);
	}, [path]);

	return (
		<>
		<form onSubmit={(event) => {event.preventDefault(); setPath(crumb)}}>
			<input className="breadcrumbs" type="text" value={crumb} onChange={(event) => { setCrumb(event.target.value); }}  />
		</form>
		</>
	);
}
function App() {
	const [items, setItems] = useState([]);
	const [path, setPath] = useState(useLocation().pathname);
	useEffect(() => {
		filList(path).then(data => {setItems(data);});
	}, [path]);
	return (
		<>
		<div className="Items">
			<div className="Left">
				<NavBar />
			</div>
			<div className="Middle">
				<div className="Upper">
				<BreadCrumbs path={path} setPath={setPath} />
				</div>
				<div className="Lower">
				<div className="Files">
				  {...items.map((line, i) => (
					<div key={i}>
						<File item = {line} setPath={setPath} />
					  </div>
				  ))}
				</div>
				</div>
			</div>
			<div className="Right">
				<div className="Preview">
					<p> Dummy preview </p>
				</div>
				<div className="credits">
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
