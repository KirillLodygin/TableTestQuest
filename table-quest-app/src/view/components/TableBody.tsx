import React, { useState } from 'react';
import styled from 'styled-components';
import {
	EntityArrItemType,
	FirstLevelEntityType,
} from '../../types/projectTypes';
import { getEntitiesExtraction } from '../../utils/entityModification';
import { LevelIcons } from './LevelIcons';

import { entityModel } from '../../entityModel';

const TableRow = styled.tr`
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

export const TableBody = () => {
	const [entities, setEntities] = useState<FirstLevelEntityType[]>(entityModel);

	let entityArr: EntityArrItemType[] = [];
	entities.forEach((entity) => {
		entityArr = getEntitiesExtraction({ entity });
	});
	console.log(entityArr);

	return (
		<>
			{entityArr.map(
				({
					id,
					level,
					rowName,
					salary,
					equipmentCosts,
					overheads,
					estimatedProfit,
				}) => (
					<TableRow key={id}>
						<th>
							<FirstColumn>
								<LevelIcons level={level} />
							</FirstColumn>
						</th>
						<th>
							<SecondColumn>{rowName}</SecondColumn>
						</th>
						<th>
							<NextColumn>{salary}</NextColumn>
						</th>
						<th>
							<NextColumn>{equipmentCosts}</NextColumn>
						</th>
						<th>
							<NextColumn>{overheads}</NextColumn>
						</th>
						<th>
							<NextColumn>{estimatedProfit}</NextColumn>
						</th>
					</TableRow>
				)
			)}
		</>
	);
};
