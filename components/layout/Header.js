import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import { motion } from 'framer-motion';

const HeaderWrapper = styled(motion.header)`
	position: fixed;
	top: 0;
	left: 0;
	padding: 16px 0;
	width: 100%;
	z-index: 10;
	background: ${props => props.theme.colours.white};

	transition: filter ${props => props.theme.transitionSpeed.slow} ease;
`;

const Logo = styled.img`
	width: 92px;
`;

const headerVariant = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: 3.5,
			ease: 'easeOut'
		}
	}
};

export default function Header() {
	return (
		<HeaderWrapper
			variants={headerVariant}
			initial="hidden"
			animate="visible"
			className="dim-wrapper"
		>
			<InnerWrapper>
				<Grid>
					<Logo src="./icons/logo.svg" />
				</Grid>
			</InnerWrapper>
		</HeaderWrapper>
	);
}
