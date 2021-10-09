import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';

const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	padding: 16px 0;
	width: 100%;
	z-index: 10;
	background: ${props => props.theme.colours.white};
`;

const Logo = styled.img`
	width: 92px;
`;

export default function Header() {
	return (
		<HeaderWrapper>
			<InnerWrapper>
				<Grid>
					<Logo src="./icons/logo.svg" />
				</Grid>
			</InnerWrapper>
		</HeaderWrapper>
	);
}
