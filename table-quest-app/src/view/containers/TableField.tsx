import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { TableBody } from '../components/TableBody';
import { TableHeaders } from '../components/TableHeaders'
import { entityModel } from '../../entityModel';
import { EntityArrItemType, FirstLevelEntityType } from '../../types/projectTypes';
import { getEntitiesExtraction } from '../../utils/entityModification';

type Props = {
	currentHeaders: Array<string>,
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

export const TableFields = ({ currentHeaders }: Props) => {
	const [entityRowsArr, setEntityRowsArr] = useState<EntityArrItemType[]>([]);
	const [entity, setEntity] = useState< FirstLevelEntityType[]>(entityModel);

	useMemo(() => {
		entity.forEach((entity) => {
			setEntityRowsArr(getEntitiesExtraction({ entity }));
		});
	}, [entity]);

	return (
		<TableBackground>
			<Table>
				<TableHeaders currentHeaders={currentHeaders}/>
				<TableBody entityRowsArr={entityRowsArr} setEntityArr={setEntityRowsArr} />
			</Table>
		</TableBackground>
	);
};
