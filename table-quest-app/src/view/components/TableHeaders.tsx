import React from 'react';
import styled from 'styled-components';

type Props = {
	currentHeaders: Array<string>,
};

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

const FirstColumnTitle = styled(TableCell)`
	width: 120px;
	padding-left: 8px;
	color: #a1a1aa;
`;

const SecondColumnTitle = styled(FirstColumnTitle)`
	width: 521px;
	padding-left: 9px;
	color: #a1a1aa;
`;

const NextColumnTitle = styled(TableCell)`
	width: 180px;
	padding-left: 9px;
	color: #a1a1aa;
`;

export const TableHeaders = ({ currentHeaders }: Props) => (
	<TableRow>
		{currentHeaders.map((title, index) => {
			switch (index) {
				case 0:
					return (
						<th>
							<FirstColumnTitle>{title}</FirstColumnTitle>
						</th>
					);

				case 1:
					return (
						<th>
							<SecondColumnTitle>{title}</SecondColumnTitle>
						</th>
					);

				default:
					return (
						<th>
							<NextColumnTitle>{title}</NextColumnTitle>
						</th>
					);
			}
		})}
	</TableRow>
);
