import React from 'react';
import styled from 'styled-components';

import { LevelIcons } from '../components/LevelIcons';
import { TABLE_LEVELS } from '../../constants/tableConstants';
import { FirstLevelEntityType } from '../../types/projectTypes';

type Props = {
	currentHeaders: Array<string>,
	entity: FirstLevelEntityType[],
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

const FirstColumn = styled(FirstColumnTitle)`
	color: #ffffff;
`;

const SecondColumnTitle = styled(FirstColumnTitle)`
	width: 521px;
	padding-left: 9px;
	color: #a1a1aa;
`;

const SecondColumn = styled(SecondColumnTitle)`
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

const NextColumnTitle = styled(TableCell)`
	width: 180px;
	padding-left: 9px;
	color: #a1a1aa;
`;

const NextColumn = styled(NextColumnTitle)`
	color: #ffffff;
`;

const NextColumnInput = styled(SecondColumnInput)`
	width: 178px;
`;

export const TableFields = ({ currentHeaders, entity }: Props) => {
	const tableHead = (
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

	return (
		<TableBackground>
			<Table>
				{tableHead}
				<TableRow>
					<th>
						<FirstColumn>
							<LevelIcons level={TABLE_LEVELS.first} />
						</FirstColumn>
					</th>
					<th>
						<SecondColumn>AXAXA</SecondColumn>
					</th>
					<th>
						<NextColumn>AXAXA</NextColumn>
					</th>
					<th>
						<NextColumn>AXAXA</NextColumn>
					</th>
					<th>
						<NextColumn>AXAXA</NextColumn>
					</th>
					<th>
						<NextColumn>AXAXA</NextColumn>
					</th>
				</TableRow>
				<TableRow>
					<th>
						<FirstColumn>
							<LevelIcons level={TABLE_LEVELS.second} />
						</FirstColumn>
					</th>
					<th>
						<SecondColumn>
							<SecondColumnInput />
						</SecondColumn>
					</th>
					<th>
						<NextColumn>
							<NextColumnInput />
						</NextColumn>
					</th>
					<th>
						<NextColumn>
							<NextColumnInput />
						</NextColumn>
					</th>
					<th>
						<NextColumn>
							<NextColumnInput />
						</NextColumn>
					</th>
					<th>
						<NextColumn>
							<NextColumnInput />
						</NextColumn>
					</th>
				</TableRow>
			</Table>
		</TableBackground>
	);
};
