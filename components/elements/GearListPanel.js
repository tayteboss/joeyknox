import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

const GearListPanelWrapper = styled.aside`
	position: fixed;
	top: 0;
	left: 100%;
	width: 50vw;
	height: 100%;
	background: ${props => props.theme.colours.white};
	box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	transform: ${props => props.isOpen ? 'translateX(-100%)' : 'translateX(0)'};
	z-index: 100;
	overflow-y: scroll;

	transition: all ${props => props.theme.transitionSpeed.slow} ease;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		width: 70vw;
	}
`;

const GearListPanelInner = styled.div`
	padding: 130px 30px;
	overflow-y: scroll;
`;

const BlurPanel = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 50vw;
	height: 100%;
	visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
	pointer-events: ${props => props.isOpen ? 'all' : 'none'};
	z-index: 99;
`;

const Content = styled.div``;

const GearListPanel = ({ isOpen, siteOptions, handleGearListPanelClose }) => {
	return (
		<>
			<GearListPanelWrapper isOpen={isOpen}>
				{siteOptions && (
					<GearListPanelInner>
						{siteOptions.gear_list && (
							<Content className="content">
								<RichText render={siteOptions.gear_list} />
							</Content>
						)}
					</GearListPanelInner>
				)}
			</GearListPanelWrapper>
			<BlurPanel
				isOpen={isOpen}
				onClick={() => handleGearListPanelClose()}
				className="cursor-close"
			/>
		</>
	);
};

export default GearListPanel;
