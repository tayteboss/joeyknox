import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

const GearListPanelWrapper = styled.aside`
	position: fixed;
	top: 0;
	right: 0;
	width: 50vw;
	height: 100%;
	background: ${props => props.theme.colours.white};
	z-index: 20;
	box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
	transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};

	transition: all ${props => props.theme.transitionSpeed.slow} ease;
`;

const GearListPanelInner = styled.div`
	padding: 130px 30px 0;
	overflow-y: scroll;
`;

const BlurPanel = styled.div`
	position: fixed;
	top: 0;
	right: 100%;
	width: 50vw;
	height: 100%;
	visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
	pointer-events: ${props => props.isOpen ? 'all' : 'none'};
`;

const Content = styled.div``;

const GearListPanel = ({ isOpen, siteOptions, handleGearListPanelClose }) => {
	return (
		<GearListPanelWrapper isOpen={isOpen}>
			<>
				<GearListPanelInner>
					{siteOptions.gear_list && (
						<Content className="content">
							<RichText render={siteOptions.gear_list} />
						</Content>
					)}
				</GearListPanelInner>
				<BlurPanel
					isOpen={isOpen}
					onClick={() => handleGearListPanelClose()}
				/>
			</>
		</GearListPanelWrapper>
	);
};

export default GearListPanel;
