// IMPORTED LIB-TYPES
import type { Score } from '$stores/playerStates';

const mozart: Score[] = [
	{
		name: 'Piano Sonata No. 16 in C Major, K. 545 (1st Movement)',
		composer: 'Wolfgang Amadeus Mozart',
		url: 'scores/Wolfgang Amadeus Mozart/SonataNo16K545.mid',
		musescoreUrl: 'https://musescore.com/classicman/scores/77457',
	},
	{
		name: 'Eine Kleine Nachtmusik',
		composer: 'Wolfgang Amadeus Mozart',
		url: 'scores/Wolfgang Amadeus Mozart/EineKleineNachtmusik.mid',
		musescoreUrl: 'https://musescore.com/thatonepiano/scores/1354976',
	},
	{
		name: 'Turkish March (Ronda Alla Turca)',
		composer: 'Wolfgang Amadeus Mozart',
		url: 'scores/Wolfgang Amadeus Mozart/TurkishMarch.mid',
		musescoreUrl: 'https://musescore.com/user/73797/scores/142975',
	},
];

const beethoven: Score[] = [
	{
		name: 'Für Elise',
		composer: 'Ludwig van Beethoven',
		url: 'scores/Ludwig van Beethoven/FurElise.mid',
		musescoreUrl: 'https://musescore.com/user/19710/scores/33816',
	},
	{
		name: 'Moonlight Sonata (1st Movement)',
		composer: 'Ludwig van Beethoven',
		url: 'scores/Ludwig van Beethoven/MoonlightSonata1stMovement.mid',
		musescoreUrl: 'https://musescore.com/classicman/scores/55352',
	},
	{
		name: 'Moonlight Sonata (3rd Movement)',
		composer: 'Ludwig van Beethoven',
		url: 'scores/Ludwig van Beethoven/MoonlightSonata3rdMovement.mid',
		musescoreUrl: 'https://musescore.com/classicman/scores/33715',
	},
];

const chopin: Score[] = [
	{
		name: 'Nocturne Op.9 No.2',
		composer: 'Frédéric Chopin',
		url: 'scores/Frédéric Chopin/NocturneOp9No2.mid',
		musescoreUrl: 'https://musescore.com/user/6662591/scores/4383881',
	},
	{
		name: 'Etude Op.10 No.4 (Torrent)',
		composer: 'Frédéric Chopin',
		url: 'scores/Frédéric Chopin/ChopinEtudeOp10No4.mid',
		musescoreUrl: 'https://musescore.com/j_y_kim/scores/5497268',
	},
	{
		name: 'Fantaisie-impromptu Op.66',
		composer: 'Frédéric Chopin',
		url: 'scores/Frédéric Chopin/FantaisieImpromptuOp66.mid',
		musescoreUrl: 'https://musescore.com/user/263346/scores/1223091',
	},
];

const liszt: Score[] = [
	{
		name: 'Transcendental Etude No. 4 (Mazeppa)',
		composer: 'Franz Liszt',
		url: 'scores/Franz Liszt/Mazeppa.mid',
		musescoreUrl: 'https://musescore.com/user/2749876/scores/2603291',
	},
	{
		name: 'Transcendental Etude No. 5 (Feux Follets)',
		composer: 'Franz Liszt',
		url: 'scores/Franz Liszt/FeuxFollets.mid',
		musescoreUrl: 'https://musescore.com/user/2749876/scores/2603306',
	},
	{
		name: 'Transcendental Etude No. 8 (Wilde Jagd)',
		composer: 'Franz Liszt',
		url: 'scores/Franz Liszt/WildeJagd.mid',
		musescoreUrl: 'https://musescore.com/user/2749876/scores/2603331',
	},
];

const debussy: Score[] = [
	{
		name: 'Suite bergamasque: III. Clair de Lune',
		composer: 'Claude Debussy',
		url: 'scores/Claude Debussy/ClairDeLune.mid',
		musescoreUrl: 'https://musescore.com/user/19710/scores/58553',
	},
	{
		name: 'Preludes, Book I: VIII. La fille aux cheveux de lin',
		composer: 'Claude Debussy',
		url: 'scores/Claude Debussy/LaFilleAuxCheveuxDeLin.mid',
		musescoreUrl: 'https://musescore.com/r_d/scores/5449385',
	},
	{
		name: 'Deux Arabesques: Arabesque No. 1',
		composer: 'Claude Debussy',
		url: 'scores/Claude Debussy/ArabesqueNo1.mid',
		musescoreUrl: 'https://musescore.com/user/24069/scores/5077352',
	},
];

const bach: Score[] = [
	{
		name: 'Well-Tempered Clavier, Book I: Prelude in C Major, BWV 846',
		composer: 'Johann Sebastian Bach',
		url: 'scores/Johann Sebastian Bach/PreludeInCMajorBWV846.mid',
		musescoreUrl: 'https://musescore.com/user/25338071/scores/5395623',
	},
	{
		name: 'Well-Tempered Clavier, Book I: Prelude No. 2 in C Minor, BWV 847',
		composer: 'Johann Sebastian Bach',
		url: 'scores/Johann Sebastian Bach/PreludeNo2BWV847InCMinor.mid',
		musescoreUrl: 'https://musescore.com/classicman/scores/227966',
	},
	{
		name: 'Well-Tempered Clavier, Book I: Fugue No. 2 in C Minor, BWV 847',
		composer: 'Johann Sebastian Bach',
		url: 'scores/Johann Sebastian Bach/Fugue_No._2_BWV_847_in_C_Minor.mid',
		musescoreUrl: 'https://musescore.com/classicman/scores/231261',
	},
];

const tchaikovsky: Score[] = [
	{
		name: 'Dance of the sugar plum fairy',
		composer: 'Pyotr Ilyich Tchaikovsky',
		url: 'scores/Pyotr Ilyich Tchaikovsky/DanceOfTheSugarPlumFairy.mid',
		musescoreUrl: 'https://musescore.com/user/3435661/scores/2899321',
	},
];

const offenbach: Score[] = [
	{
		name: 'Cancan',
		composer: 'Jacques Offenbach',
		url: 'scores/Jacques Offenbach/Cancan.mid',
		musescoreUrl: 'https://musescore.com/gabriel_j_young/scores/5262237',
	},
];

export const scores: Score[] = [
	// ...mozart,
	// ...beethoven,
	...chopin,
	// ...liszt,
	// ...debussy,
	// ...bach,
	// ...tchaikovsky,
	// ...offenbach,
];
