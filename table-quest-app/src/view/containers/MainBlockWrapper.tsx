import React from 'react';
import styled from 'styled-components';

const BlockWrap = styled.div`
	display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

type Props = {
	children: React.ReactElement;
};

export const MainBlockWrapper = ({ children }: Props) => (
	<BlockWrap>{children}</BlockWrap>
);