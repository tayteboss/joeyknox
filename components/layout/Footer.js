import styled from 'styled-components';
import Grid from '../elements/Grid';
import InnerWrapper from '../elements/InnerWrapper';

const FooterWrapper = styled.footer`
	height: 100vh;
	background: ${props => props.theme.colours.black};
	color: ${props => props.theme.colours.white};
`;

const MainDetails = styled.div`
	grid-column: 1 / 5;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 120px;
`;

const Phone = styled.a`
	color: ${props => props.theme.colours.white};
	font-size: 27px;
	margin-bottom: 10px;
`;

const Email = styled.a`
	color: ${props => props.theme.colours.white};
	font-size: 27px;
`;

const SubDetails = styled.div`
	grid-column: 5 / 9;
	padding-top: 120px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Content = styled.p`
	margin-bottom: 24px;
`;

const GearList = styled.p`
	color: ${props => props.theme.colours.white};
	cursor: pointer;
`;

const CV = styled.p`
	color: ${props => props.theme.colours.white};
	cursor: pointer;
`;

const SocialLink = styled.a`
	color: ${props => props.theme.colours.white};
`;

const Footer = ({ data }) => {
	console.log('footer', data);

	return (
		<FooterWrapper>
			<InnerWrapper>
				<Grid>
					<MainDetails>
						{data.phone && (
							<Phone href={`tel: ${data.phone}`}>
								{data.phone}
							</Phone>
						)}
						{data.email && (
							<Email href={`mailto: ${data.email}`}>
								{data.email}
							</Email>
						)}
					</MainDetails>
					<SubDetails>
						{data.footer_content && (
							<Content>{data.footer_content}</Content>
						)}
						<GearList>Gear List</GearList>
						<CV>CV</CV>
						{data.instagram && (
							<SocialLink href={data.instagram.url} target="_blank">
								Instagram
							</SocialLink>
						)}
						{data.vimeo && (
							<SocialLink href={data.vimeo.url} target="_blank">
								Vimeo
							</SocialLink>
						)}
					</SubDetails>
				</Grid>
			</InnerWrapper>
		</FooterWrapper>
	);
};

export default Footer;
