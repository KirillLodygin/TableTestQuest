import React from 'react';

import { EntityArrItemType, FirstLevelEntityType } from '../../types/projectTypes';
import { TableRow } from './TableRow';

type Props = {
	entities: FirstLevelEntityType[];
	entityRowsArr: EntityArrItemType[];
	setEntityRowsArr: (arr: EntityArrItemType[]) => void;
	setEntities: (arr: FirstLevelEntityType[]) => void;
};

export const TableBody = ({ entities, entityRowsArr, setEntityRowsArr, setEntities }: Props) => {

	return (
		<>
			{entityRowsArr.map(
				({
					id,
					parentId,
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
						entityRowsArr={entityRowsArr}
						rowID={id}
						parentId={parentId}
						level={level}
						rowName={rowName}
						salary={salary}
						equipmentCosts={equipmentCosts}
						overheads={overheads}
						estimatedProfit={estimatedProfit}
						isEdited={isEdited}
						setEntityRowsArr={setEntityRowsArr}
						setEntities={setEntities}
					/>
				)
			)}
		</>
	);
};
