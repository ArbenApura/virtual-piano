// TYPES
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type DifficultySource = {
	url: string;
	musescoreUrl: string;
};
export type Score = {
	name: string;
	composer: string;
	difficulty: {
		[K in Difficulty]?: DifficultySource;
	};
};
export type Speed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;
