import styled from 'styled-components';
import Grid from '../elements/Grid';
import InnerWrapper from '../elements/InnerWrapper';
import { useInView } from 'react-intersection-observer';

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

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.grey};
	}
`;

const Email = styled.a`
	color: ${props => props.theme.colours.white};

	transition: color ${props => props.theme.transitionSpeed.default} ease;
	transition: opacity ${props => props.theme.transitionSpeed.default} ease 150ms;

	&:hover
	{
		color: ${props => props.theme.colours.grey};
	}
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

	transition: color ${props => props.theme.transitionSpeed.default} ease;
	transition: opacity ${props => props.theme.transitionSpeed.default} ease 150ms;

	&:hover
	{
		color: ${props => props.theme.colours.grey};
	}
`;

const SocialLink = styled.a`
	color: ${props => props.theme.colours.white};

	transition: color ${props => props.theme.transitionSpeed.default} ease;
	transition: opacity ${props => props.theme.transitionSpeed.default} ease 300ms;

	&:hover
	{
		color: ${props => props.theme.colours.grey};
	}
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

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.grey};
	}
`;

const Backtotop = styled.div`
	grid-column: 11 / -1;

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.grey};
	}

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

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<>
			{data && (
				<FooterWrapper className="dim-wrapper" id="contact" ref={ref}>
					<InnerWrapper>
						<FooterInner>

							<FooterTop id="about">
								<Grid>

									<MainDetails>

										{data.phone && (
											<Phone
												className={`cursor-link view-element-fade-in ${
													inView ? 'view-element-fade-in--in-view' : ''
												}`}
												href={`tel: ${data.phone}`}
											>
												{data.phone}
											</Phone>
										)}

										{data.email && (
											<Email
												className={`cursor-link view-element-fade-in ${
													inView ? 'view-element-fade-in--in-view' : ''
												}`}
												href={`mailto: ${data.email}`}
											>
												{data.email}
											</Email>
										)}

									</MainDetails>

									<SubDetails>

										{data.footer_content && (
											<Content
												className={`view-element-fade-in ${
													inView ? 'view-element-fade-in--in-view' : ''
												}`}
											>
												{data.footer_content}
											</Content>
										)}

										<GearList
											className={`cursor-link view-element-fade-in ${
												inView ? 'view-element-fade-in--in-view' : ''
											}`}
											onClick={() => handleGearListPanelOpen()}
										>
											Gear List
										</GearList>

										{data.instagram && (
											<SocialLink
												className={`cursor-link view-element-fade-in ${
													inView ? 'view-element-fade-in--in-view' : ''
												}`}
												href={data.instagram.url}
												target="_blank"
											>
												Instagram
											</SocialLink>
										)}

										{data.vimeo && (
											<SocialLink
												className={`cursor-link view-element-fade-in ${
													inView ? 'view-element-fade-in--in-view' : ''
												}`}
												href={data.vimeo.url}
												target="_blank"
											>
												Vimeo
											</SocialLink>
										)}

									</SubDetails>
								</Grid>
							</FooterTop>

							<FooterBottom
								className={`cursor-link view-element-fade-in ${
									inView ? 'view-element-fade-in--in-view' : ''
								}`}
							>
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
			)}
		</>
	);
};

export default Footer;
