import React from 'react';

import { EntityArrItemType } from '../../types/projectTypes';
import { TableRow } from './TableRow';

type Props = {
	entities: EntityArrItemType[];
	setEntityArr: (arr: EntityArrItemType[]) => void;
};

export const TableBody = ({ entities, setEntityArr }: Props) => {

	return (
		<>
			{entities.map(
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
						entities={entities}
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
