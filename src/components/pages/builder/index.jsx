import React, { useState, useRef } from 'react';

//because fuck you.
const copy = x => JSON.parse(JSON.stringify(x));

const Builder = props => {
	//create the refs
	const playerNameRef = useRef();
	const armyNameRef = useRef();
	const armyFactionRef = useRef();
	const armyPointLimitRef = useRef();
	const commandPointLimitRef = useRef();

	//create state
	const [roster, setRoster] = useState({
		detachments: []
	});

	//render
	return (
		<div className="page">
			<button onClick={() => console.log(JSON.stringify(roster, null, 2))}>Print</button>
			<div className="central panel centered middle">
				<form onSubmit={ e => e.preventDefault() } onChange={e => setRoster(r => { return { playerName: playerNameRef.current.value, armyName: armyNameRef.current.value, armyFaction: armyFactionRef.current.value, armyPointLimit: armyPointLimitRef.current.value, commandPointLimit: commandPointLimitRef.current.value, detachments: r.detachments }; })} className="constrained">
					<label>Player Name:</label>
					<input type="text" ref={playerNameRef} />

					<label>Army Name:</label>
					<input type="text" ref={armyNameRef} />

					<label>Army Faction:</label>
					<select ref={armyFactionRef}>
						<option>Necrons</option>
						<option>Orks</option>
					</select>

					<label>Army Point Limit:</label>
					<input type="number" ref={armyPointLimitRef} />

					<label>Command Point Limit:</label>
					<input type="number" ref={commandPointLimitRef} />

					<button type="button" onClick={e => setRoster(r => { const n = copy(r); n.detachments.push({ units: [] }); return n; }) }>Add Detachment</button>
				</form>

				{ roster.detachments.map((d, detachmentKey) => <Detachment key={detachmentKey} detachmentKey={detachmentKey} roster={roster} setRoster={setRoster} />) }
			</div>
		</div>
	);
};

const Detachment = props => {
	//create the refs
	const nameRef = useRef();
	const typeRef = useRef();

	return (
		<div key={props.detachmentKey} className="detachment">
			<form onSubmit={ e => e.preventDefault() } onChange={e => props.setRoster(r => { const n = copy(r); n.detachments[props.detachmentKey] = { name: nameRef.current.value, type: typeRef.current.value, units: r.detachments[props.detachmentKey].units }; return n; })} className="constrained">
			<label>Detachment Name:</label>
				<input type="text" ref={nameRef} />

				<label>Detachment Type:</label>
				<select ref={typeRef}>
					<option value="patrol">Patrol</option>
				</select>

				<button type="button" onClick={e => props.setRoster(r => { const n = copy(r); n.detachments[props.detachmentKey].units.push({ details: [] }); return n; }) }>Add Unit</button>
			</form>

			{ props.roster.detachments[props.detachmentKey].units.map((u, unitKey) => <Unit key={unitKey} unitKey={unitKey} {...props} />) }
		</div>
	);
};

const Unit = props => {
	//create the refs
	const roleRef = useRef();
	const nameRef = useRef();
	const costRef = useRef();

	return (
		<div key={props.unitKey} className="unit">
			<form onSubmit={ e => e.preventDefault() } onChange={e => props.setRoster(r => { const n = copy(r); n.detachments[props.detachmentKey].units[props.unitKey] = { role: roleRef.current.value, name: nameRef.current.value, cost: costRef.current.value, details: r.detachments[props.detachmentKey].units[props.unitKey].details } ; return n; })} className="constrained">
				<label>Unit Role:</label>
				<select ref={roleRef}>
					<option value="hq">HQ</option>
					<option value="troops">Troops</option>
				</select>

				<label>Unit Name:</label>
				<input type="text" ref={nameRef} />

				<label>Unit Cost:</label>
				<input type="number" ref={costRef} />

				<button type="button" onClick={e => props.setRoster(r => { const n = copy(r); n.detachments[props.detachmentKey].units[props.unitKey].details.push({}); return n; }) }>Add Details</button>
			</form>

			{ props.roster.detachments[props.detachmentKey].units[props.unitKey].details.map((dt, detailKey) => <Details key={detailKey} detailKey={detailKey} {...props} />) }
		</div>
	);
};

const Details = props => {
	//create the refs
	const textRef = useRef();
	const costRef = useRef();
	const cpRef = useRef();

	return (
		<div key={props.unitKey} className="detail">
			<form onSubmit={ e => e.preventDefault() } onChange={e => props.setRoster(r => { const n = copy(r); n.detachments[props.detachmentKey].units[props.unitKey].details[props.detailKey] = { text: textRef.current.value, cost: costRef.current.value, cp: cpRef.current.value }; return n; })} className="constrained">
				<label>Details:</label>
				<input type="text" ref={textRef} />

				<label>Detail Cost:</label>
				<input type="number" ref={costRef} />

				<label>Detail CP Cost:</label>
				<input type="number" ref={cpRef} />
			</form>
		</div>
	);
}

export default Builder;