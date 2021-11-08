import styled from 'styled-components';
import { getSiteOptions, getAllWork } from '../lib/source/prismic/api';
import IntroMenu from '../components/blocks/IntroMenu';
import IntroShowreel from '../components/blocks/IntroShowreel';
import FeaturedProjects from '../components/blocks/FeaturedProjects';
import Projects from '../components/blocks/Projects';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

const HomeWrapper = styled(motion.div)``;

const pageTransitionVariants = {
	hidden: { opacity: 0, transition: { duration: 0.5 } },
	visible: { opacity: 1, transition: { duration: 0.5 } }
};

const Home = ({ options, data, cursorRefresh }) => {
	return (
		<HomeWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo 
				title={options.site_title ? options.site_title : 'Joey Knox Cinematography'}
				description={options.site_description ? options.site_description : null}
			/>
			<IntroMenu data={options} />
			<IntroShowreel data={options} />
			<FeaturedProjects data={options} />
			<Projects data={data} cursorRefresh={cursorRefresh} />
		</HomeWrapper>
	);
};

export async function getStaticProps() {
	const options = await getSiteOptions();
	const data = await getAllWork();

	return {
		props: {
			options: options,
			data: data
		}
	};
}

export default Home;
