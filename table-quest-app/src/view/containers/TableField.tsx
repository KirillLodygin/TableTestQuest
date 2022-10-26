import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { TableBody } from '../components/TableBody';
import { TableHeaders } from '../components/TableHeaders'
import { entityModel } from '../../entityModel';
import { EntityArrItemType } from '../../types/projectTypes';
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
	const entities = entityModel;

	let entityArr = useRef<EntityArrItemType[]>([]);

	useMemo(() => {
		entities.forEach((entity) => {
			entityArr.current = getEntitiesExtraction({ entity });
		});
		setEntityRowsArr(entityArr.current);
	}, [entities]);

	useMemo(() => {
		console.log(entityRowsArr);
	}, [entityRowsArr]);

	return (
		<TableBackground>
			<Table>
				<TableHeaders currentHeaders={currentHeaders}/>
				<TableBody entities={entityRowsArr} setEntityArr={setEntityRowsArr} />
			</Table>
		</TableBackground>
	);
};
