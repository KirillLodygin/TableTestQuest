import React, { useState } from 'react';
import styled from 'styled-components';

import { EntityArrItemType, TableLevelType } from '../../types/projectTypes';
import { LevelIcons } from './LevelIcons';

type Props = {
	entities: EntityArrItemType[],
	id: number,
	level: TableLevelType,
	rowName: string,
	salary: number,
	equipmentCosts: number,
	overheads: number,
	estimatedProfit: number,
	isEdited: boolean,
	setEntityArr: (arr: EntityArrItemType[]) => void,
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
	padding: 10px;
	color: #71717a;
	background-color: #202124;
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
	id,
	level,
	rowName,
	salary,
	equipmentCosts,
	overheads,
	estimatedProfit,
	isEdited,
	setEntityArr,
}: Props) => {
	const [isRowEdited, setIsRowEdited]= useState<boolean>(isEdited);

	const editRow = (currenId: number) => {
		entities.map((item) => {
			if (item.id === currenId) {
				item.isEdited = true;
			}
			return item;
		});
		setEntityArr(entities);
		setIsRowEdited(!isEdited);
	};

	return (
		<Row onDoubleClick={() => editRow(id)}>
			<th>
				<FirstColumn>
					<LevelIcons level={level} />
				</FirstColumn>
			</th>
			<th>
				{isRowEdited ? (
					<SecondColumnInput value={rowName} />
				) : (
					<SecondColumn>{rowName}</SecondColumn>
				)}
			</th>
			<th>
				{isRowEdited ? <NextColumnInput value={salary} /> : <NextColumn>{salary}</NextColumn>}
			</th>
			<th>
				{isRowEdited ? (
					<NextColumnInput value={equipmentCosts} />
				) : (
					<NextColumn>{equipmentCosts}</NextColumn>
				)}
			</th>
			<th>
				{isRowEdited ? <NextColumnInput value={overheads} /> : <NextColumn>{overheads}</NextColumn>}
			</th>
			<th>
				{isRowEdited ? (
					<NextColumnInput value={estimatedProfit} />
				) : (
					<NextColumn>{estimatedProfit}</NextColumn>
				)}
			</th>
		</Row>
	);
};
