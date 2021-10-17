import styled from 'styled-components';
import Grid from '../elements/Grid';
import InnerWrapper from '../elements/InnerWrapper';

const FooterWrapper = styled.footer`
	height: calc(100vh - 55px);
	background: ${props => props.theme.colours.black};
	color: ${props => props.theme.colours.white};
	position: relative;
	z-index: 5;

	transition: filter ${props => props.theme.transitionSpeed.slow} ease;

	.inner-wrapper
	{
		height: 100%;
	}
`;

const FooterInner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;

const FooterTop = styled.div``;

const FooterBottom = styled.div`
	margin-bottom: 16px;
`;

const MainDetails = styled.div`
	grid-column: 1 / 5;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 80px;

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		grid-column: 1 / -1;
	}
`;

const Phone = styled.a`
	color: ${props => props.theme.colours.white};
`;

const Email = styled.a`
	color: ${props => props.theme.colours.white};
`;

const SubDetails = styled.div`
	grid-column: 5 / 9;
	padding-top: 80px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		grid-column: 1 / 10;
		padding-top: 24px;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
	}
`;

const Content = styled.p`
	margin-bottom: 24px;
`;

const GearList = styled.p`
	color: ${props => props.theme.colours.white};
`;

const SocialLink = styled.a`
	color: ${props => props.theme.colours.white};
`;

const Copyright = styled.div`
	grid-column: 1 / 5;
`;

const BuiltBy = styled.div`
	grid-column: 5 / 10;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 5 / -1;
	}
`;

const BuiltByLink = styled.a`
	color: ${props => props.theme.colours.white};
`;

const Backtotop = styled.div`
	grid-column: 11 / -1;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		display: none;
	}
`;

const Footer = ({ data, handleGearListPanelOpen }) => {
	const handleScrollTopClick = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	return (
		<FooterWrapper className="dim-wrapper" id="contact">
			<InnerWrapper>
				<FooterInner>

					<FooterTop id="about">
						<Grid>

							<MainDetails>

								{data.phone && (
									<Phone
										className="cursor-link"
										href={`tel: ${data.phone}`}
									>
										{data.phone}
									</Phone>
								)}

								{data.email && (
									<Email
										className="cursor-link"
										href={`mailto: ${data.email}`}
									>
										{data.email}
									</Email>
								)}

							</MainDetails>

							<SubDetails>

								{data.footer_content && (
									<Content>{data.footer_content}</Content>
								)}

								<GearList
									className="cursor-link"
									onClick={() => handleGearListPanelOpen()}
								>
									Gear List
								</GearList>

								{data.instagram && (
									<SocialLink
										className="cursor-link"
										href={data.instagram.url}
										target="_blank"
									>
										Instagram
									</SocialLink>
								)}

								{data.vimeo && (
									<SocialLink
										className="cursor-link"
										href={data.vimeo.url}
										target="_blank"
									>
										Vimeo
									</SocialLink>
								)}

							</SubDetails>
						</Grid>
					</FooterTop>

					<FooterBottom>
						<Grid>
							<Copyright>
								&copy; {new Date().getFullYear()} Joey Knox
							</Copyright>
							<BuiltBy>
								Built by <BuiltByLink href="https://tayte.co/" target="_blank">tayte.co</BuiltByLink>
							</BuiltBy>
							<Backtotop
								className="cursor-link"
								onClick={() => handleScrollTopClick()}
							>
								Back to top
							</Backtotop>
						</Grid>
					</FooterBottom>
				</FooterInner>
			</InnerWrapper>
		</FooterWrapper>
	);
};

export default Footer;
