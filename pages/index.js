import styled from 'styled-components';
import { getSiteOptions, getAllWork } from '../lib/source/prismic/api';
import IntroMenu from '../components/blocks/IntroMenu';
import IntroShowreel from '../components/blocks/IntroShowreel';

const HomeWrapper = styled.div``;

const Home = ({ options }) => {
	console.log('options', options);

	return (
		<HomeWrapper>
			<IntroMenu data={options} />
			<IntroShowreel />
		</HomeWrapper>
	);
};

export async function getStaticProps() {
	const options = await getSiteOptions();
	const data = await getAllWork();

	return {
		props: {
			options: options
		}
	};
}

export default Home;
