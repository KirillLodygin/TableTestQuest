import React from 'react';
import styled from 'styled-components';

import grid from '../../assets/images/grid.png';
import { sideBarStringType } from '../../types/projectTypes';


type Props = {
	sideBarMenu: sideBarStringType[];
	isSideBareSeen: boolean;
	setTableTitle: (title: string) => void;
}

const SideBarWrapper = styled.div`
  width: 234px;
	min-height: 992px;
	max-height: 100vh;
  background-color: #27272A;
  border: 1px solid #414144;
`;

const MenuPointWrapper =
	styled.div <
	{ isSideBareSeen: boolean } >
	`
	display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 234px;
	height: 34px;
  padding-left: 22px;
  box-sizing: border-box;
	opacity: ${({ isSideBareSeen }) => (isSideBareSeen ? 1 : 0)};
  transition: 1s;

  &:hover {
		background-color: #A1A1AA;
	}
`;

const IconBlock = styled.div`
	padding: 0;
	margin-right: 17px;
`;

const MenuPoit = styled.div`
  padding: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
`;

export const SideBar = ({ sideBarMenu, isSideBareSeen, setTableTitle }: Props) => {

	return (
		<SideBarWrapper>
			{sideBarMenu.map(({shortTitle, title}) => (
				<MenuPointWrapper isSideBareSeen={isSideBareSeen} onClick={() => { setTableTitle(title)}}>
					<IconBlock>
						<img src={grid} alt="Иконка grid"/>
					</IconBlock>
					<MenuPoit>{shortTitle}</MenuPoit>
				</MenuPointWrapper>
			))}
		</SideBarWrapper>
	);
};
