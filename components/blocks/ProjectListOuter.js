import styled from 'styled-components';
import ProjectList from './ProjectList';
import { motion } from 'framer-motion';

const ProjectListOuterWrapper = styled(motion.div)`
	grid-column: 1 / -1;
`;

const ProjectListInner = styled(motion.div)``;

const parentVarients = {
	hidden: {
		opacity: 0,
		display: 'none',
		transition: {
			duration: 1,
			when: 'afterChildren',
			staggerChildren: 0.05,
			staggerDirection: 1,
			delay: 1,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		display: 'block',
		transition: {
			duration: 1,
			when: 'beforeChildren',
			staggerChildren: 0.05,
			staggerDirection: 1,
			delay: 1,
			ease: 'easeInOut'
		}
	}
};

const childVarients = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3
		}
	}
};

const ProjectListOuter = ({
	musicVideos,
	commercials,
	narratives,
	isActive
}) => {
	return (
		<ProjectListOuterWrapper
			variants={parentVarients}
			initial="hidden"
			animate={isActive ? 'visible' : 'hidden'}
		>
			<ProjectListInner
				variants={childVarients}
				initial="hidden"
				animate={isActive ? 'visible' : 'hidden'}
			>
				<ProjectList
					data={musicVideos}
					title="Music Videos"
					id="music-videos"
				/>
				<ProjectList
					data={commercials}
					title="Commercial"
					id="commercial"
				/>
				<ProjectList
					data={narratives}
					title="Narrative"
					id="narrative"
				/>
			</ProjectListInner>
		</ProjectListOuterWrapper>
	);
};

export default ProjectListOuter;
