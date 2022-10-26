import React from 'react';
import styled from 'styled-components';
import menu from '../../assets/images/menu.svg';
import reply from '../../assets/images/reply.png';

import { MenuStringType } from '../../types/projectTypes';

type HeaderMenuProps = {
	topMenu: MenuStringType[],
};

const MenuBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	height: 44px;
	width: 100%;
	background-color: #27272a;
	border: 1px solid #414144;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	color: #a1a1aa;
`;

const MenuBlock = styled.div`
	margin-left: 27px;
	border: none;

	:nth-child(2) {
		margin-right: 7px;
	}
`;

const MenuTitle = styled.div`
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: flex-start;

	&:hover {
		color: #ffffff;
		border-bottom: #ffffff solid 1px;
	}
`;

export const HeaderMenuBlock = ({ topMenu }: HeaderMenuProps) => {
	return (
		<MenuBar>
			<MenuBlock>
				<img src={menu} alt="Иконка Меню" />
			</MenuBlock>

			<MenuBlock>
				<img src={reply} alt="Иконка Назад" />
			</MenuBlock>

			{topMenu.map((menuTitle) => (
				<MenuBlock key={menuTitle.title}>
					<MenuTitle>{menuTitle.title}</MenuTitle>
				</MenuBlock>
			))}
		</MenuBar>
	);
};
