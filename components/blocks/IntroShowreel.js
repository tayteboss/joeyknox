import styled from 'styled-components';

const IntroShowreelWrapper = styled.section`
	width: 100%;
	height: calc(100vh - 44px);
	background: grey;
	margin-top: 270px;
	position: relative;
	z-index: 5;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-top: 240px;
	}
`;

const IntroShowreel = () => {
	return (
		<IntroShowreelWrapper>
		</IntroShowreelWrapper>
	);
};

export default IntroShowreel;
