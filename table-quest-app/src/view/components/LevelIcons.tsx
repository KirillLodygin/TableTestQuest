import React from 'react';
import styled from 'styled-components';

import { TABLE_LEVELS } from '../../constants/tableConstants';
import { TableLevelType } from '../../types/projectTypes';

import folder1 from '../../assets/images/folder1.png';
import folder2 from '../../assets/images/folder2.png';
import doc from '../../assets/images/doc.png';
import del from '../../assets/images/del.png';

type Props = {
	level: TableLevelType,
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
			return [folder1, folder2, doc, del];

		case TABLE_LEVELS.second:
			return [folder2, doc, del];

		default:
			return [doc, del];
	}
};

export const LevelIcons = ({ level }: Props) => {
	const iconsArr = getIconsArr(level);

	return (
		<IconsWrapper level={level}>
			{iconsArr.map((icon, index) => (
				<IconWrap key={index}>
					<img src={icon} alt={`Иконка ${index}`} />
				</IconWrap>
			))}
		</IconsWrapper>
	);
};
