import React from 'react';

import { EntityArrItemType } from '../../types/projectTypes';
import { TableRow } from './TableRow';

type Props = {
	entityRowsArr: EntityArrItemType[];
	setEntityArr: (arr: EntityArrItemType[]) => void;
};

export const TableBody = ({ entityRowsArr, setEntityArr }: Props) => {

	return (
		<>
			{entityRowsArr.map(
				({
					id,
					level,
					rowName,
					salary,
					equipmentCosts,
					overheads,
					estimatedProfit,
					isEdited,
				}) => (
					<TableRow
						key={id}
						entities={entityRowsArr}
						id={id}
						level={level}
						rowName={rowName}
						salary={salary}
						equipmentCosts={equipmentCosts}
						overheads={overheads}
						estimatedProfit={estimatedProfit}
						isEdited={isEdited}
						setEntityArr={setEntityArr}
					/>
				)
			)}
		</>
	);
};
