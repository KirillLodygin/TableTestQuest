import { FirstLevelEntityType, SecondLevelEntityType, ThirdLevelEntityType, EntityArrItemType } from '../types/projectTypes';
import { TABLE_LEVELS } from '../constants/tableConstants';

type EntityType = FirstLevelEntityType | SecondLevelEntityType | ThirdLevelEntityType;

type Props = {
	parentId?: null | number;
	entity: FirstLevelEntityType | SecondLevelEntityType | ThirdLevelEntityType;
	entityArr?: EntityArrItemType[];
};

const getLevel = (entity: EntityType, parentId: null | number) => {
	if (parentId === null) {
		return TABLE_LEVELS.first
	}

	if (Object.keys(entity).includes('child')) {
		return TABLE_LEVELS.second
	}

	return TABLE_LEVELS.third;
};

export const getEntitiesExtraction = ({parentId = null, entity, entityArr = []}: Props) => {
	const rowObj = {
		rowName: entity.rowName,
		equipmentCosts: entity.equipmentCosts,
		estimatedProfit: entity.estimatedProfit,
		overheads: entity.overheads,
		salary: entity.salary,
		parentId,
		id: entity.id,
		isEdited: false,
		level: getLevel(entity, parentId)
	};

	entityArr.push(rowObj);

	if (entity.child) {
		entity.child.forEach((entity) => {
			let parentId = rowObj.id;
			getEntitiesExtraction({ parentId, entity, entityArr })
		});
	}

	return entityArr;
}