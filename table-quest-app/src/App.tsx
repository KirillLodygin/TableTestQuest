import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

import { initialState } from './initialState';

import { SCREEN_TYPE } from './types/projectTypes';
import { createEntityResponse } from './utils/reqeusts';

import { HeaderMenuBlock } from './view/components/HeaderMenuBlock';
import { TableHeaderBlock } from './view/components/TableHeaderBlock';
import { MainBlockWrapper } from './view/containers/MainBlockWrapper';
import { SideBar } from './view/containers/SideBar';
import { TableFields } from './view/containers/TableField';

function App() {
	const [tableTitle, setTableTitle] = useState<string>(
		'Строительно-монтажные работы'
	);
	const [eID, setEID] = useState<number | undefined>();
	const [isSideBareSeen, setIsSideBareSeen] = useState<boolean>(true);
	const [currentScreen, setCurrenScreen] = useState<SCREEN_TYPE>(
		SCREEN_TYPE.START
	);

	const {
		topMenu,
		sideBarHeaderH2,
		sideBarHeaderH3,
		sideBarMenu,
		tableHeaders,
	} = initialState;


	const createEID = async () => {
		try {
			const resp = await createEntityResponse();
			const data = await resp;
			if (data.id) {
				setEID(data.id);
			}
		} catch (e) {
			setCurrenScreen(SCREEN_TYPE.FAIL);
		}
	};

	useEffect(() => {
		if (!eID) {
			createEID();
		}
	}, [eID]);

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
			<TableFields eID={(eID) ? String(eID) : ''} currentHeaders={currentHeaders} setCurrenScreen={setCurrenScreen} />
		</>
	);

	return currentScreen === SCREEN_TYPE.START ? (
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
	) : (
		<div>Какая-то ошибка</div>
	);
}

export default App;
