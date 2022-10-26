import React, { useState, useMemo } from 'react';
import './App.css';
import { initialState } from './initialState';
import { HeaderMenuBlock } from './view/components/HeaderMenuBlock';
import { TableHeaderBlock } from './view/components/TableHeaderBlock';
import { MainBlockWrapper } from './view/containers/MainBlockWrapper';
import { SideBar } from './view/containers/SideBar';
import { TableFields } from './view/containers/TableField';

function App() {
	const [tableTitle, setTableTitle] = useState<string>(
		'Строительно-монтажные работы'
	);
	const [isSideBareSeen, setIsSideBareSeen] = useState<boolean>(true);
	const {
		topMenu,
		sideBarHeaderH2,
		sideBarHeaderH3,
		sideBarMenu,
		tableHeaders,
	} = initialState;

	/* Фильтрация должна быть по tableTitle, но, поскольку у нас есть только одна таблица, фильтруем по 'Строительно-монтажные работы' */
	const currentHeaders = useMemo(() => {
		return tableHeaders.filter(
			({ tableId }) => tableId === 'Строительно-монтажные работы'
		)[0].headers;
	}, [tableHeaders, tableTitle]);

	const mainField = (
		<>
			<SideBar
				sideBarMenu={sideBarMenu}
				setTableTitle={setTableTitle}
				isSideBareSeen={isSideBareSeen}
			/>
			<TableFields currentHeaders={currentHeaders} />
		</>
	);

	return (
		<div className="App">
			<HeaderMenuBlock topMenu={topMenu} />
			<TableHeaderBlock
				sideBarHeaderH2={sideBarHeaderH2}
				sideBarHeaderH3={sideBarHeaderH3}
				tableTitle={tableTitle}
				isSideBareSeen={isSideBareSeen}
				setIsSideBareSeen={setIsSideBareSeen}
			/>
			<MainBlockWrapper>{mainField}</MainBlockWrapper>
		</div>
	);
}

export default App;
