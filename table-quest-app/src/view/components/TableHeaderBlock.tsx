import React from 'react';
import styled from 'styled-components';

import checkDown from '../../assets/images/checkDown.png';
import checkUp from '../../assets/images/checkUp.png';

type Props = {
	sideBarHeaderH2: string,
	sideBarHeaderH3: string,
	tableTitle: string,
	isSideBareSeen: boolean,
	setIsSideBareSeen: (item: boolean) => void,
};

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	width: 100%;
	background-color: #27272a;
	border: 1px solid #414144;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;
`;

const SideBarHeader = styled.div`
	height: 44px;
	width: 234px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 20px;
	box-sizing: border-box;
	color: #a1a1aa;
	border-right: 1px solid #414144;
`;

const SideBarHeaderTextBlock = styled.div`
	padding: 8px 0;
	box-sizing: border-box;
	text-align: left;
`;

const TextFirstLine = styled.div`
	font-size: 14px; ;
`;

const TextSecondLine = styled.div`
	font-size: 10px;
`;

const IconBlock = styled.div`
	box-sizing: border-box;
	padding: 18px 13px;
`;

const TableHeader = styled.div`
	height: 44px;
	box-sizing: border-box;
	border-right: 1px solid #414144;
	padding: 11px 15px;
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 21px;
	color: #ffffff;
`;

export const TableHeaderBlock = ({
	sideBarHeaderH2,
	sideBarHeaderH3,
	tableTitle,
	isSideBareSeen,
	setIsSideBareSeen,
}: Props) => {
	return (
		<HeaderWrapper>
			<SideBarHeader>
				<SideBarHeaderTextBlock>
					<TextFirstLine>{sideBarHeaderH2}</TextFirstLine>
					<TextSecondLine>{sideBarHeaderH3}</TextSecondLine>
				</SideBarHeaderTextBlock>
				<IconBlock
					onClick={() => {
						setIsSideBareSeen(!isSideBareSeen);
					}}
				>
					<img
						src={isSideBareSeen ? checkDown : checkUp}
						alt="Иконка checkDown/checkUp"
					/>
				</IconBlock>
			</SideBarHeader>

			<TableHeader>{tableTitle}</TableHeader>
		</HeaderWrapper>
	);
};
