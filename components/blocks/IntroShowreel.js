import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

const IntroShowreelWrapper = styled(motion.section)`
	width: 100%;
	padding-top: 270px;
	position: relative;
	z-index: 5;
	overflow: hidden;
	pointer-events: none;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		padding-top: 200px;
	}

	video
	{
		object-fit: cover;
		height: 100vh;
		width: 100vw;
	}
`;

const videoVariant = {
	hidden: {
		y: -270,
		height: 'calc(100vh + 270px)'
	},
	visible: {
		y: 0,
		height: '100vh',
		transition: {
			duration: 0.75,
			delay: 3,
			ease: 'easeOut'
		}
	}
};

const IntroShowreel = ({ data }) => {
	return (
		<IntroShowreelWrapper
			variants={videoVariant}
			initial="hidden"
			animate="visible"
		>
			<ReactPlayer
				width="100vw"
				height="100vh"
				playing={true}
				loop={true}
				muted={true}
				url={data.showreel_snippet.url}
				playsinline={true}
			/>
		</IntroShowreelWrapper>
	);
};

export default IntroShowreel;
