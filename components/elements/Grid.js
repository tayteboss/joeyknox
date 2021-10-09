import styled from 'styled-components';

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	grid-column-gap: 16px;
	align-items: ${props => props.align ? props.align : 'start'};
	row-gap: ${props => props.rowGap};

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
`;

const Grid = (props) => {
	return (
		<GridWrapper align={props.align} rowGap={props.rowGap} className="grid">
			{props.children}
		</GridWrapper>
	);
};

export default Grid;
