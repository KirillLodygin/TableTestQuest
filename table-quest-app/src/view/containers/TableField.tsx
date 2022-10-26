import React from 'react';
import styled from 'styled-components';

import { TableBody } from '../components/TableBody';
import { TableHeaders } from '../components/TableHeaders'

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
	return (
		<TableBackground>
			<Table>
				<TableHeaders currentHeaders={currentHeaders}/>
				<TableBody />
			</Table>
		</TableBackground>
	);
};
