export const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};
export const sleep = (timeout: number) => new Promise((res) => setTimeout(res, timeout));
export const filterKey = (key: string) => {
	key = key.toUpperCase();
	switch (key) {
		case '!':
			key = '1';
			break;
		case '@':
			key = '2';
			break;
		case '#':
			key = '3';
			break;
		case '$':
			key = '4';
			break;
		case '%':
			key = '5';
			break;
		case '^':
			key = '6';
			break;
		case '&':
			key = '7';
			break;
		case '*':
			key = '8';
			break;
		case '(':
			key = '9';
			break;
		case ')':
			key = '0';
			break;
	}
	return key;
};
