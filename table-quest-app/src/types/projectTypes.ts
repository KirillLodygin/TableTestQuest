export type MenuStringType = {
	title: string,
	onClick: () => void,
};

export type sideBarStringType = {
	shortTitle: string,
	title: string,
};

export type tableSectionHeadersType = {
	tableId: string,
	headers: Array<string>,
};

export type TableLevelType = 1 | 2 | 3;

export type TableLevelsType = {
	first: TableLevelType,
	second: TableLevelType,
	third: TableLevelType,
};

export type ThirdLevelEntityType = {
	equipmentCosts: number,
	estimatedProfit: number,
	id: number,
	machineOperatorSalary: number,
	mainCosts: number,
	materials: number,
	mimExploitation: number,
	overheads: number,
	rowName: string,
	salary: number,
	supportCosts: number,
	total: number,
	parentId: number,
	level: 3,
	isEdited: boolean,
};

export type SecondLevelEntityType = {
	equipmentCosts: number,
	estimatedProfit: number,
	id: number,
	machineOperatorSalary: number,
	mainCosts: number,
	materials: number,
	mimExploitation: number,
	overheads: number,
	rowName: string,
	salary: number,
	supportCosts: number,
	total: number,
	parentId: number,
	level: 2,
	isEdited: boolean,
	child: ThirdLevelEntityType[] | [],
};

export type FirstLevelEntityType = {
	equipmentCosts: number,
	estimatedProfit: number,
	id: number,
	machineOperatorSalary: number,
	mainCosts: number,
	materials: number,
	mimExploitation: number,
	overheads: number,
	rowName: string,
	salary: number,
	supportCosts: number,
	total: number,
	parentId: null,
	level: 1,
	isEdited: boolean,
	child: SecondLevelEntityType[] | [],
};

export type initialStateTypes = {
	topMenu: MenuStringType[],
	sideBarHeaderH2: string,
	sideBarHeaderH3: string,
	sideBarMenu: sideBarStringType[],
	tableHeaders: tableSectionHeadersType[],
	entity?: FirstLevelEntityType[],
};
