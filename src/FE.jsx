import { useState, useEffect, useRef } from "react";
import './format.css'
import './other.css'
import * as Cookies from 'es-cookie'
import { useLocation, BrowserRouter, Routes, Route } from "react-router"
import { useEffectEvent } from 'react';

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
function File({item, setPath, itemSize}){
	const path = item.substring(item.indexOf("/"));
	const name = item.substring(item.lastIndexOf("/")+1);
	if(path.length > 0){
		if(item.substring(0,1) == "#")
			return (
				<>
				<button onClick={() => setPath(path)} style={{ width: `${itemSize * 10 / 100}cqw` }} className="card">
					<img src="/img/icons8-folder-96.png" className="logo" />
					<p> {name} </p>
				</button>
				</>
			);
		else{
			return (
				<>
				<button onClick={() => setPath(path)} style={{width:{itemSize}*10/100+"cqw"}} className="card">
					<img src="/img/icons8-file-96.png" className="logo" />
					<p> {name} </p>
				</button>
				</>
			)
		}
	}
	return;
}
function HomeButton({setPath}){
	const homepath = (!Cookies.get("Username"))? "/home" : "/home/"+Cookies.get("Username");
	return (
		<>
			<button onClick={() => setPath(homepath)} className="nav">
				<img src="/img/icons8-home-96.png" />
			</button>
		</>
	);
}

function UpButton({path, setPath}){
	var newPath = path;
	newPath = newPath.substring(0, newPath.lastIndexOf('/'));
	if(!newPath) newPath = "/";
	return (
		<>
			<button onClick={() => setPath(newPath)} className="nav">
				<img src="/img/icons8-upward-96.png" />
			</button>
		</>
	);
}

function LeftButton({historyPoint, setHistoryPoint}){
	return (
		<>
			<button onClick={() => { setHistoryPoint(historyPoint-1);} } className="nav navbut">
				<img src="/img/icons8-back-96.png" />
			</button>
		</>
	);
}

function RightButton({historyPoint, setHistoryPoint}){
	return (
		<>
			<button onClick={() => { setHistoryPoint(historyPoint+1); } } className="nav navbut">
				<img src="/img/icons8-forward-96.png" />
			</button>
		</>
	);
}

function NavBar({path, setPath, historyPoint, setHistoryPoint}){
	return (
		<>
			<div className="navbar">
				<div className="AppName">
					<p>WÃÃW</p>
					<HomeButton setPath={setPath}/>
				</div>
				<div className="navButtons">
					<LeftButton historyPoint={historyPoint} setHistoryPoint={setHistoryPoint} />
					<RightButton historyPoint={historyPoint} setHistoryPoint={setHistoryPoint} />
					<UpButton path={path} setPath={setPath}/>
				</div>
			</div>
		</>
	);
}

function SizeBar({setItemSize}){
	return (
		<>
		<div className="sizeBar">
			<input type="range" min="50" max="150" defaultValue="100" className="sizeSlider" onChange={(event) => { setItemSize(event.target.value) }}  />
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
export default function FE() {
	const [items, setItems] = useState([]);
	const [path, setPath] = useState("");
	const [history, setHistory] = useState(["/"]);
	const [historyPoint, setHistoryPoint] = useState(0);
	const [oldHistoryPoint, setOldHistoryPoint] = useState(0);
	const [changeHistory, setChangeHistory] = useState(0); //this maintains a working history that is append only
	const [itemSize, setItemSize] = useState(100);
	const ItemsRef = useRef(null);
	useEffect(() => {
		if(changeHistory){
			var newHist = history; 
			newHist.push(path);
			if(newHist.length > 20)
				newHist.shift();
			setHistory(newHist);
			setOldHistoryPoint(history.length);
			setHistoryPoint(history.length);
		}
		setChangeHistory(1);
		filList(path).then(data => {setItems(data);});
	}, [path]);
	useEffect(() => {
		//this works by setting history.length as a de facto "last position" even though the actual place in the history array where path is is in history.length - 1, oldHistoryPoint only matters insofar as to mention whether the place it starts from is history.length (as to skip the history.length -1 ) or to set up the state back to enable the aforementioned skip (since history.length-1 and history.length are treated the same)
		if(oldHistoryPoint == history.length && historyPoint == history.length - 1) {setOldHistoryPoint(historyPoint); setHistoryPoint(historyPoint-1); return;}
		if(oldHistoryPoint == history.length - 1 && historyPoint == history.length) {setOldHistoryPoint(history.length); return;}
		if(historyPoint < 0) {setHistoryPoint(0); return;}
		if(historyPoint > history.length) {setHistoryPoint(history.length); return;}
		if(historyPoint == history.length) return;
		setChangeHistory(0);
		setPath(history[historyPoint]);
	}, [historyPoint]);
	useEffect(() => {
		const cards = ItemsRef.current.querySelectorAll('.card');

		cards.forEach(card => {
			card.style.width = (itemSize*10/100)+"cqw";
		});
	}, [itemSize] );
	return (
		<>
		<div className="FE Items" ref={ItemsRef}>
			<div className="Left">
				<NavBar  path={path} setPath={setPath} historyPoint={historyPoint} setHistoryPoint={setHistoryPoint} />
				<SizeBar setItemSize={setItemSize}/>
			</div>
			<div className="Middle">
				<div className="Upper">
				<BreadCrumbs path={path} setPath={setPath} />
				</div>
				<div className="Lower">
				<div className="Files">
				  {...items.map((line, i) => (
					<div key={i}>
						<File item ={line} itemSize={itemSize} setPath={setPath}/>
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

