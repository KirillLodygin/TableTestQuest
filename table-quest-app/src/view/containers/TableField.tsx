import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { TableBody } from '../components/TableBody';
import { TableHeaders } from '../components/TableHeaders';
import {
	EntityArrItemType,
	FirstLevelEntityType,
	ModelToCreateType,
	SCREEN_TYPE,
} from '../../types/projectTypes';
import { getEntitiesExtraction } from '../../utils/entityModification';
import {
	createRowInEntityResponse,
	getTreeRowsResponse,
} from '../../utils/reqeusts';

type Props = {
	currentHeaders: Array<string>,
	eID: string,
	setCurrenScreen: (arg: SCREEN_TYPE) => void,
};

const TableBackground = styled.div`
	min-height: 992px;
	max-height: 100vh;
	width: 100%;
	background-color: #202124;
	padding: 0 10px;
`;

const Table = styled.table`
	border-collapse: collapse;
`;

export const TableFields = ({
	currentHeaders,
	eID,
	setCurrenScreen,
}: Props) => {
	const [entityRowsArr, setEntityRowsArr] = useState<EntityArrItemType[]>([]);
	const [entities, setEntities] = useState<FirstLevelEntityType[] | []>([]);

	const getTreeRows = useCallback(
		async (eID: string) => {
			try {
				const resp = await getTreeRowsResponse(eID);
				const data = await resp;

				if (data.length > 0) {
					setEntities(data);
				}
			} catch (e) {
				setCurrenScreen(SCREEN_TYPE.FAIL);
			}
		},
		[setCurrenScreen]
	);

	useMemo(() => {
		if (eID) {
			getTreeRows(eID);
		}
	}, [eID, getTreeRows]);

	const createRowInEntity = useCallback(
		async (eID: string) => {
			const model: ModelToCreateType = {
				equipmentCosts: 0,
				estimatedProfit: 0,
				machineOperatorSalary: 0,
				mainCosts: 0,
				materials: 0,
				mimExploitation: 0,
				overheads: 0,
				parentId: 0,
				rowName: 'Начните заполнять строку',
				salary: 0,
				supportCosts: 0,
			};
			try {
				const resp = await createRowInEntityResponse(eID, model);
				const data = await resp;

				const currentData = data.current;
				currentData.isEdited = true;
				setEntities([currentData]);
			} catch (e) {
				setCurrenScreen(SCREEN_TYPE.FAIL);
			}
		},
		[setCurrenScreen]
	);

	/*
				Предполагалось, что в ответе с бэка придет хотя бы одна сущность, но приходит пустой массив.
				Поскольку никакого сценария на этот случай нет, создаем первую сущность принудительно.
				*/

	useEffect(() => {
		if (entities.length === 0) {
			createRowInEntity(eID);
		}
	}, [createRowInEntity, eID, entities]);

	useMemo(() => {
		let intermediateArr: EntityArrItemType[] = [];
		entities.forEach((entity) => {
			intermediateArr = intermediateArr.concat(
				getEntitiesExtraction({ entity })
			);
		});
		setEntityRowsArr(intermediateArr);
	}, [entities]);

	return (
		<TableBackground>
			<Table>
				<TableHeaders currentHeaders={currentHeaders} />
				<TableBody
					entities={entities}
					setEntities={setEntities}
					entityRowsArr={entityRowsArr}
					setEntityRowsArr={setEntityRowsArr}
					setCurrenScreen={setCurrenScreen}
					eID={eID}
				/>
			</Table>
		</TableBackground>
	);
};
