// IMPORTED TYPES
import type { PianoCluster, PianoKey, Note } from '$stores/pianoStates';

export let pianoClusters: PianoCluster[] = [
	[
		{ type: 'white', note: 'C2', bind: '1', haveSharp: true },
		{ type: 'black', note: 'CS2', bind: '1', haveSharp: true },
		{ type: 'white', note: 'D2', bind: '2', haveSharp: true },
		{ type: 'black', note: 'DS2', bind: '2', haveSharp: true },
		{ type: 'white', note: 'E2', bind: '3', haveSharp: false },
	],
	[
		{ type: 'white', note: 'F2', bind: '4', haveSharp: true },
		{ type: 'black', note: 'FS2', bind: '4', haveSharp: true },
		{ type: 'white', note: 'G2', bind: '5', haveSharp: true },
		{ type: 'black', note: 'GS2', bind: '5', haveSharp: true },
		{ type: 'white', note: 'A2', bind: '6', haveSharp: true },
		{ type: 'black', note: 'AS2', bind: '6', haveSharp: true },
		{ type: 'white', note: 'B2', bind: '7', haveSharp: false },
	],
	[
		{ type: 'white', note: 'C3', bind: '8', haveSharp: true },
		{ type: 'black', note: 'CS3', bind: '8', haveSharp: true },
		{ type: 'white', note: 'D3', bind: '9', haveSharp: true },
		{ type: 'black', note: 'DS3', bind: '9', haveSharp: true },
		{ type: 'white', note: 'E3', bind: '0', haveSharp: false },
	],
	[
		{ type: 'white', note: 'F3', bind: 'Q', haveSharp: true },
		{ type: 'black', note: 'FS3', bind: 'Q', haveSharp: true },
		{ type: 'white', note: 'G3', bind: 'W', haveSharp: true },
		{ type: 'black', note: 'GS3', bind: 'W', haveSharp: true },
		{ type: 'white', note: 'A3', bind: 'E', haveSharp: true },
		{ type: 'black', note: 'AS3', bind: 'E', haveSharp: true },
		{ type: 'white', note: 'B3', bind: 'R', haveSharp: false },
	],
	[
		{ type: 'white', note: 'C4', bind: 'T', haveSharp: true },
		{ type: 'black', note: 'CS4', bind: 'T', haveSharp: true },
		{ type: 'white', note: 'D4', bind: 'Y', haveSharp: true },
		{ type: 'black', note: 'DS4', bind: 'Y', haveSharp: true },
		{ type: 'white', note: 'E4', bind: 'U', haveSharp: false },
	],
	[
		{ type: 'white', note: 'F4', bind: 'I', haveSharp: true },
		{ type: 'black', note: 'FS4', bind: 'I', haveSharp: true },
		{ type: 'white', note: 'G4', bind: 'O', haveSharp: true },
		{ type: 'black', note: 'GS4', bind: 'O', haveSharp: true },
		{ type: 'white', note: 'A4', bind: 'P', haveSharp: true },
		{ type: 'black', note: 'AS4', bind: 'P', haveSharp: true },
		{ type: 'white', note: 'B4', bind: 'A', haveSharp: false },
	],
	[
		{ type: 'white', note: 'C5', bind: 'S', haveSharp: true },
		{ type: 'black', note: 'CS5', bind: 'S', haveSharp: true },
		{ type: 'white', note: 'D5', bind: 'D', haveSharp: true },
		{ type: 'black', note: 'DS5', bind: 'D', haveSharp: true },
		{ type: 'white', note: 'E5', bind: 'F', haveSharp: false },
	],
	[
		{ type: 'white', note: 'F5', bind: 'G', haveSharp: true },
		{ type: 'black', note: 'FS5', bind: 'G', haveSharp: true },
		{ type: 'white', note: 'G5', bind: 'H', haveSharp: true },
		{ type: 'black', note: 'GS5', bind: 'H', haveSharp: true },
		{ type: 'white', note: 'A5', bind: 'J', haveSharp: true },
		{ type: 'black', note: 'AS5', bind: 'J', haveSharp: true },
		{ type: 'white', note: 'B5', bind: 'K', haveSharp: false },
	],
	[
		{ type: 'white', note: 'C6', bind: 'L', haveSharp: true },
		{ type: 'black', note: 'CS6', bind: 'L', haveSharp: true },
		{ type: 'white', note: 'D6', bind: 'Z', haveSharp: true },
		{ type: 'black', note: 'DS6', bind: 'Z', haveSharp: true },
		{ type: 'white', note: 'E6', bind: 'X', haveSharp: false },
	],
	[
		{ type: 'white', note: 'F6', bind: 'C', haveSharp: true },
		{ type: 'black', note: 'FS6', bind: 'C', haveSharp: true },
		{ type: 'white', note: 'G6', bind: 'V', haveSharp: true },
		{ type: 'black', note: 'GS6', bind: 'V', haveSharp: true },
		{ type: 'white', note: 'A6', bind: 'B', haveSharp: true },
		{ type: 'black', note: 'AS6', bind: 'B', haveSharp: true },
		{ type: 'white', note: 'B6', bind: 'N', haveSharp: false },
	],
	[{ type: 'white', note: 'C7', bind: 'M', haveSharp: false }],
];
export let pianoKeys: PianoKey[] = [];
pianoClusters.map((cluster) => cluster.map((key) => pianoKeys.push(key)));
export let pianoNotes: Note[] = [];
pianoKeys.map((key) => pianoNotes.push(key.note));
