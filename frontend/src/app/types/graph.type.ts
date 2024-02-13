export type TData = CountryData[] | BarData[];

export type CountryData = {
	id: string;
	country?: string;
	color: string;
	data: GraphData[];
};
export type GraphData = {
	x: string;
	y: number;
};

export type BarData = {
	country: string;
	plane: number;
	planeColor: string;
	helicopter: number;
	helicopterColor: string;
	boat: number;
	boatColor: string;
	train: number;
	trainColor: string;
	subway: number;
	subwayColor: string;
	bus: number;
	busColor: string;
};
