import React from 'react';
import styled from 'styled-components';

import { TABLE_LEVELS } from '../../constants/tableConstants';
import {
	EntityArrItemType,
	FirstLevelEntityType,
	SecondLevelEntityType,
	TableLevelType, ThirdLevelEntityType,
} from '../../types/projectTypes';

import folder1 from '../../assets/images/folder1.png';
import folder2 from '../../assets/images/folder2.png';
import doc from '../../assets/images/doc.png';
import del from '../../assets/images/del.png';
import { getEntitiesExtraction } from '../../utils/entityModification';

type Props = {
	level: TableLevelType,
	rowID: number,
	parentId: number | null,
	entities: FirstLevelEntityType[],
	entityRowsArr: EntityArrItemType[],
	setEntities: (arr: FirstLevelEntityType[]) => void,
	setEntityRowsArr: (arr: EntityArrItemType[]) => void
};

const IconWrap = styled.div`
	display: none;
	margin-left: 8px;

	:nth-child(1) {
		display: block;
		margin-left: 0;
	}
`;

const IconsWrapper =
	styled.div <
	{ level: TableLevelType } >
	`
	box-sizing: border-box;
	background-color: #202124;
  border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
	margin-left: ${({ level }) => {
		switch (level) {
			case TABLE_LEVELS.second:
				return '22px';

			case TABLE_LEVELS.third:
				return '42px';

			default:
				return '0';
		}
	}};
	
	&:hover {
		background-color: #414144;
	}

  &:hover ${IconWrap} {
    display: block;
  }
`;

const getIconsArr = (level: TableLevelType) => {
	switch (level) {
		case TABLE_LEVELS.first:
			return [{ src: folder1, iconName: 'folder1' }, { src: folder2, iconName: 'folder2' }, { src: del, iconName: 'del' }];

		case TABLE_LEVELS.second:
			return [{ src: folder2, iconName: 'folder2' }, { src: doc, iconName: 'doc' }, { src: del, iconName: 'del' }];

		default:
			return [{ src: doc, iconName: 'doc' }, { src: del, iconName: 'del' }];
	}
};

const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export const LevelIcons = ({ level, rowID, parentId, entityRowsArr, entities, setEntities, setEntityRowsArr }: Props) => {
	const iconsArr = getIconsArr(level);

	const getNewTable = (entities:  FirstLevelEntityType[]) => {
		let intermediateArr: EntityArrItemType[] = [];
		entities.forEach((entity) => {
			intermediateArr = intermediateArr.concat(getEntitiesExtraction({ entity }));
		});
		setEntityRowsArr(intermediateArr);
	}

	const getFirstLevelString = () => {
		const newEntity: FirstLevelEntityType = {
			equipmentCosts: 0,
			estimatedProfit: 0,
			id: getRandomInt(1, 101),
			machineOperatorSalary: 0,
			mainCosts: 0,
			materials: 0,
			mimExploitation: 0,
			overheads: 0,
			rowName: '',
			salary: 0,
			supportCosts: 0,
			total: 0,
			parentId: null,
			level: TABLE_LEVELS.first,
			isEdited: true,
			child: []
		}

		entities.push(newEntity);
		setEntities(entities);

		getNewTable(entities);
	};

	const getSecondLevelString = () => {
		const newEntity: SecondLevelEntityType = {
			equipmentCosts: 0,
			estimatedProfit: 0,
			id: getRandomInt(1, 101),
			machineOperatorSalary: 0,
			mainCosts: 0,
			materials: 0,
			mimExploitation: 0,
			overheads: 0,
			rowName: '',
			salary: 0,
			supportCosts: 0,
			total: 0,
			parentId,
			level: TABLE_LEVELS.second,
			isEdited: true,
			child: []
		};

		if (level === TABLE_LEVELS.second) {
			const editableEntity = entities.find(({id}) => id === parentId);

			const indexToInsert = editableEntity?.child.findIndex(({id}) => id === rowID);

			if (indexToInsert || indexToInsert === 0) {
				editableEntity?.child.splice(indexToInsert + 1, 0, newEntity);
			}

			const editableEntityIndex = entities.findIndex(({id}) => id === parentId);
			if (editableEntity) {
				entities.splice(editableEntityIndex, 1, editableEntity);
			}

			getNewTable(entities.slice());
		}

		if (level === TABLE_LEVELS.first) {
			const editableEntity = entities.find(({id}) => id === rowID);
			const editableEntityIndex = entities.findIndex(({id}) => id === rowID);

			if (editableEntity) {
				editableEntity?.child.unshift(newEntity);
				entities.splice(editableEntityIndex, 1, editableEntity);

				getNewTable(entities.slice());
			}
		}
	};

	const getThirdLevelString = () => {
		const newEntity: ThirdLevelEntityType = {
			equipmentCosts: 0,
			estimatedProfit: 0,
			id: getRandomInt(1, 101),
			machineOperatorSalary: 0,
			mainCosts: 0,
			materials: 0,
			mimExploitation: 0,
			overheads: 0,
			rowName: '',
			salary: 0,
			supportCosts: 0,
			total: 0,
			parentId,
			level: TABLE_LEVELS.third,
			isEdited: true
		};

		if (level === TABLE_LEVELS.third) {
			const grandParentId = entityRowsArr.find(({id}) => id === parentId)?.parentId;

			if (grandParentId || grandParentId === 0) {
				const editableEntityParent = entities.find(({id}) => id === grandParentId);
				const editableEntity = editableEntityParent?.child.find(({id}) => id === parentId);

				if (editableEntity){
					const indexToInsert = editableEntity?.child.findIndex(({id}) => id === rowID);

					if (indexToInsert || indexToInsert === 0) {
						editableEntity?.child.splice(indexToInsert + 1, 0, newEntity);
					}

					const editableEntityIndex = editableEntityParent?.child.findIndex(({id}) => id === parentId);
					if (editableEntityIndex && editableEntity) {
						editableEntityParent?.child.splice(editableEntityIndex, 1, editableEntity);
					}

					const editableEntityParentIndex = entities.findIndex(({id}) => id === grandParentId);
					if (editableEntityParent) {
						entities.splice(editableEntityParentIndex, 1, editableEntityParent);
					}
				}
			}
			getNewTable(entities.slice());
		}

		if (level === TABLE_LEVELS.second) {
			if (parentId || parentId === 0) {
				const editableEntityParent = entities.find(({id}) => id === parentId);
				if (editableEntityParent) {
					const editableEntityParentIndex = entities.findIndex(({id}) => parentId);

					const editableEntity = editableEntityParent?.child.find(({id}) => id === rowID);
					if (editableEntity) {
						editableEntity?.child.unshift(newEntity);
						const editableEntityIndex = editableEntityParent?.child.findIndex(({id}) => id === rowID);

						if (editableEntityIndex || editableEntityIndex === 0) {
							editableEntityParent.child.splice(editableEntityIndex, 1, editableEntity);

							entities.splice(editableEntityParentIndex, 1, editableEntityParent);
						}
					}

					getNewTable(entities.slice());
				}
			}
		}
	};

	const deleteString = () => {
		if (level === TABLE_LEVELS.third) {
			const grandParentId = entityRowsArr.find(({id}) => id === parentId)?.parentId;

			if (grandParentId || grandParentId === 0) {
				const deletedEntityGrandParent = entities.find(({id}) => id === grandParentId);

				if (deletedEntityGrandParent) {
					const deletedEntityGrandParentIndex = entities.findIndex(({id}) => id === grandParentId);
					const deletedEntityParent = deletedEntityGrandParent.child.find(({id}) => id === parentId);

					if (deletedEntityParent) {
						const deletedEntityParentIndex = deletedEntityGrandParent.child.findIndex(({id}) => id === parentId);
						const deletedEntityIndex = deletedEntityParent.child.findIndex(({id}) => id === rowID);

						deletedEntityParent.child.splice(deletedEntityIndex, 1);
						deletedEntityGrandParent.child.splice(deletedEntityParentIndex, 1, deletedEntityParent);
						entities.splice(deletedEntityGrandParentIndex, 1, deletedEntityGrandParent);

						getNewTable(entities.slice());
					}
				}
			}
		}

		if (level === TABLE_LEVELS.first) {
			const deletedEntityIndex = entities.findIndex(({id}) => id === rowID);
			entities.splice(deletedEntityIndex, 1);
			getNewTable(entities.slice());
		}

		if (level === TABLE_LEVELS.second) {
			const deletedEntityParentIndex = entities.findIndex(({id}) => id === parentId);
			const deletedEntityParent = entities.find(({id}) => id === parentId);

			const deletedEntityIndex = deletedEntityParent?.child.findIndex(({id}) => id === rowID);
			if (deletedEntityIndex || deletedEntityIndex === 0) {
				deletedEntityParent?.child.splice(deletedEntityIndex, 1);
			}

			if (deletedEntityParent) {
				entities.splice(deletedEntityParentIndex, 1, deletedEntityParent);
				getNewTable(entities);
			}
		}

	}

	const getTableChange = (iconName: string) => {
		switch (iconName) {
			case 'folder1':
				return getFirstLevelString();

			case 'folder2':
				return getSecondLevelString();

			case 'doc':
				return getThirdLevelString();

			default:
				return deleteString();
		}
	};

	return (
		<IconsWrapper level={level}>
			{iconsArr.map(({ src, iconName }) => (
				<IconWrap key={iconName}>
					<img src={src} alt={`Иконка ${iconName}`} onClick={() => getTableChange(iconName)} />
				</IconWrap>
			))}
		</IconsWrapper>
	);
};
