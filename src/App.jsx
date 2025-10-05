import { useState } from 'react'
import { useEffect } from "react";
import LeftLogo from '/house.svg'
//import './App.css'
import './format.css'
import './other.css'
import * as Cookies from 'es-cookie'
import { useLocation } from "react-router"

async function filList(pathname) {
  const curPath = pathname;

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
	if(path.length > 0){
		if(item.substring(0,1) == "#")
			return (
				<>
				<a href={path} className="card">
					<img src="/img/icons8-folder-96.png" className="logo" />
					<p> {name} </p>
				</a>
				</>
			);
		else{
			return (
				<>
				<a href={path} className="card">
					<img src="/img/icons8-file-96.png" className="logo" />
					<p> {name} </p>
				</a>
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
	console.log(path)
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


function BreadCrumbs(){
	const [path, setPath] = useState(useLocation().pathname);
	return (
		<>
		<form onSubmit={(event) => {event.preventDefault();useLocation().pathname}}>
			<input className="breadcrumbs" type="text" value={path} onChange={(event) => { setPath(event.target.value); }}  />
		</form>
		</>
	);
}
function App() {
	const [path, setPath] = useState([]);
	const localpath = useLocation().pathname;
	useEffect(() => {
		filList(localpath).then(data => setPath(data));
	}, []);
	return (
		<>
		<div className="Items">
			<div className="Left">
				<NavBar />
			</div>
			<div className="Middle">
				<div className="Upper">
				<BreadCrumbs />
				</div>
				<div className="Lower">
				<div className="Files">
				  {...path.map((line, i) => (
					<div key={i}>
						<File item = {line} />
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
