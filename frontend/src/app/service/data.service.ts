import { BarData, CountryData, GraphData } from "../types/graph.type";

export function convertLineData(data: CountryData[]): CountryData[] {
	return (
		data &&
		data.map((dt: CountryData) => {
			return {
				id: dt.country as string,
				color: dt.color,
				data: dt.data,
			};
		})
	);
}

export function convertBarData(data: CountryData[]): BarData[] {
	const barColors = {
		bus: "hsl(0, 70%, 50%)",
		car: "hsl(30, 70%, 50%)",
		bicycle: "hsl(60, 70%, 50%)",
		moto: "hsl(90, 70%, 50%)",
		boat: "hsl(120, 70%, 50%)",
		plane: "hsl(150, 70%, 50%)",
		helicopter: "hsl(180, 70%, 50%)",
		train: "hsl(210, 70%, 50%)",
		subway: "hsl(240, 70%, 50%)",
		horse: "hsl(270, 70%, 50%)",
	};
	return data.map((dt: CountryData) => {
		const country = dt.country as string;

		const plane = dt.data.find((item) => item.x === "plane")?.y as number;
		const planeColor = barColors.plane;
		const helicopter = dt.data.find((item) => item.x === "helicopter")
			?.y as number;
		const helicopterColor = barColors.helicopter;
		const boat = dt.data.find((item) => item.x === "boat")?.y as number;
		const boatColor = barColors.boat;
		const train = dt.data.find((item) => item.x === "train")?.y as number;
		const trainColor = barColors.train;
		const subway = dt.data.find((item) => item.x === "subway")?.y as number;
		const subwayColor = barColors.subway;
		const bus = dt.data.find((item) => item.x === "bus")?.y as number;
		const busColor = barColors.bus;

		return {
			country: country,
			plane: plane,
			planeColor: planeColor,
			helicopter: helicopter,
			helicopterColor: helicopterColor,
			boat: boat,
			boatColor: boatColor,
			train: train,
			trainColor: trainColor,
			subway: subway,
			subwayColor: subwayColor,
			bus: bus,
			busColor: busColor,
		};
	});
}
