import styled from 'styled-components';
import { getSiteOptions, getAllWork } from '../lib/source/prismic/api';
import IntroMenu from '../components/blocks/IntroMenu';
import IntroShowreel from '../components/blocks/IntroShowreel';

const HomeWrapper = styled.div``;

const Home = ({ options }) => {
	return (
		<HomeWrapper>
			<IntroMenu data={options} />
			<IntroShowreel data={options} />
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
