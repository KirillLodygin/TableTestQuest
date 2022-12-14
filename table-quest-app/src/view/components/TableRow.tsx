import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import {
	EntityArrItemType,
	FirstLevelEntityType,
	ModelToCreateType,
	SCREEN_TYPE,
	TableLevelType,
} from '../../types/projectTypes';
import { LevelIcons } from './LevelIcons';
import { updateRowResponse } from '../../utils/reqeusts';

type Props = {
	entities: FirstLevelEntityType[],
	entityRowsArr: EntityArrItemType[],
	rowID: number,
	parentId: number | undefined,
	level: TableLevelType,
	rowName: string,
	salary: number,
	equipmentCosts: number,
	overheads: number,
	estimatedProfit: number,
	isEdited: boolean,
	eID: string,
	setEntityRowsArr: (arr: EntityArrItemType[]) => void,
	setEntities: (arr: FirstLevelEntityType[]) => void,
	setCurrenScreen: (arg: SCREEN_TYPE) => void,
};

const Row = styled.tr`
	border-bottom: 1px solid #414144;
`;

const TableCell = styled.div`
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding-left: 12px;
	font-weight: 400;
	font-size: 14px;
	line-height: 130%;
	letter-spacing: 0.1px;
	box-sizing: border-box;
	transition: 0.2s;
	animation: show 0.5s 1;
	animation-fill-mode: forwards;
	animation-delay: 0.1s;
	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

const FirstColumn = styled(TableCell)`
	width: 120px;
	padding-left: 8px;
`;

const SecondColumn = styled(TableCell)`
	width: 521px;
	padding-left: 9px;
	color: #ffffff;
`;

const SecondColumnInput = styled.input`
	box-sizing: border-box;
	width: 518px;
	height: 36px;
	border: 1px solid #414144;
	border-radius: 6px;
	padding: 8px 10px;
	color: #71717a;
	font-weight: 400;
	font-size: 14px;
	line-height: 130%;
	letter-spacing: 0.1px;
	background-color: #202124;
	text-align: left;
	opacity: 0;
	transition: 0.2s;
	animation: show 0.5s 1;
	animation-fill-mode: forwards;
	animation-delay: 0.1s;
	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

const NextColumn = styled(TableCell)`
	width: 180px;
	padding-left: 9px;
	color: #ffffff;
`;

const NextColumnInput = styled(SecondColumnInput)`
	width: 178px;
`;

export const TableRow = ({
	entities,
	entityRowsArr,
	rowID,
	parentId,
	level,
	rowName,
	salary,
	equipmentCosts,
	overheads,
	estimatedProfit,
	isEdited,
	setEntityRowsArr,
	setEntities,
	setCurrenScreen,
	eID,
}: Props) => {
	const [isCurrentEdited, setIsCurrenEdited] = useState<boolean>(isEdited);
	const [currentRowName, setCurrentRowName] = useState<string>(rowName);
	const [currentSalary, setCurrentSalary] = useState<number>(salary);
	const [currentEquipmentCosts, setCurrentEquipmentCosts] =
		useState<number>(equipmentCosts);
	const [currentOverheads, setCurrentOverheads] = useState<number>(overheads);
	const [currentEstimatedProfit, setCurrentEstimatedProfit] =
		useState<number>(estimatedProfit);

	const updateRow = useCallback(
		async (eID: string) => {
			const model: ModelToCreateType = {
				equipmentCosts: currentEquipmentCosts,
				estimatedProfit: currentEstimatedProfit,
				machineOperatorSalary: 0,
				mainCosts: 0,
				materials: 0,
				mimExploitation: 0,
				overheads: currentOverheads,
				parentId: parentId || 0,
				rowName: currentRowName,
				salary: currentSalary,
				supportCosts: 0,
			};
			try {
				const resp = await updateRowResponse(eID, String(rowID), model);
				const data = await resp;
				if (data) {
					setIsCurrenEdited(false);
				}
			} catch (e) {
				setCurrenScreen(SCREEN_TYPE.FAIL);
			}
		},
		[currentEquipmentCosts, currentEstimatedProfit, currentOverheads, currentRowName, currentSalary, parentId, rowID, setCurrenScreen]
	);

	const editRow = (currenId: number | unknown) => {
		setEntityRowsArr(
			entityRowsArr.map((item) => {
				if (item.id === currenId) {
					item.isEdited = true;
				}
				return item;
			})
		);
		setIsCurrenEdited(true);
	};

	const handleKeyPress = (
		ev: React.KeyboardEvent<HTMLInputElement>,
		currenId?: number
	) => {
		if (ev.key === 'Enter') {
			setEntityRowsArr(
				entityRowsArr.map((item) => {
					if (item.id === currenId) {
						item.rowName = currentRowName;
						item.salary = currentSalary;
						item.equipmentCosts = currentEquipmentCosts;
						item.overheads = currentOverheads;
						item.estimatedProfit = currentEstimatedProfit;
					}
					return item;
				})
			);
			updateRow(eID);
		}
	};

	return (
		<Row onDoubleClick={() => editRow(rowID)}>
			<th>
				<FirstColumn>
					<LevelIcons
						eID={eID}
						rowID={rowID}
						parentId={parentId}
						entities={entities}
						entityRowsArr={entityRowsArr}
						setEntities={setEntities}
						setEntityRowsArr={setEntityRowsArr}
						level={level}
					/>
				</FirstColumn>
			</th>
			<th>
				{isCurrentEdited ? (
					<SecondColumnInput
						autoFocus
						value={currentRowName}
						onChange={(e) => setCurrentRowName(e.target.value)}
						onKeyPress={(e) => handleKeyPress(e, rowID)}
						placeholder={currentRowName}
					/>
				) : (
					<SecondColumn>{currentRowName}</SecondColumn>
				)}
			</th>
			<th>
				{isCurrentEdited ? (
					<NextColumnInput
						value={String(currentSalary)}
						type="number"
						step="0.01"
						min="0"
						onChange={(e) => setCurrentSalary(Number(e.target.value))}
						onKeyPress={(e) => handleKeyPress(e, rowID)}
					/>
				) : (
					<NextColumn>{currentSalary}</NextColumn>
				)}
			</th>
			<th>
				{isCurrentEdited ? (
					<NextColumnInput
						value={String(currentEquipmentCosts)}
						type="number"
						step="0.01"
						min="0"
						onChange={(e) => setCurrentEquipmentCosts(Number(e.target.value))}
						onKeyPress={(e) => handleKeyPress(e, rowID)}
					/>
				) : (
					<NextColumn>{currentEquipmentCosts}</NextColumn>
				)}
			</th>
			<th>
				{isCurrentEdited ? (
					<NextColumnInput
						value={String(currentOverheads)}
						type="number"
						step="0.01"
						min="0"
						onChange={(e) => setCurrentOverheads(Number(e.target.value))}
						onKeyPress={(e) => handleKeyPress(e, rowID)}
					/>
				) : (
					<NextColumn>{currentOverheads}</NextColumn>
				)}
			</th>
			<th>
				{isCurrentEdited ? (
					<NextColumnInput
						value={String(currentEstimatedProfit)}
						type="number"
						step="0.01"
						min="0"
						onChange={(e) => setCurrentEstimatedProfit(Number(e.target.value))}
						onKeyPress={(e) => handleKeyPress(e, rowID)}
					/>
				) : (
					<NextColumn>{currentEstimatedProfit}</NextColumn>
				)}
			</th>
		</Row>
	);
};
