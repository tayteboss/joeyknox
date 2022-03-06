import { useState, useEffect } from 'react';
import SiteOptionsProvider from '../components/common/SiteOptionsProvider';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/source/prismic/apolloClient';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { DefaultSeo } from 'next-seo';
import { GlobalStyles } from '../styles/global';
import Layout from '../components/common/Layout';
import Head from '../components/common/Head';
import { getAllWork, getSiteOptions } from '../lib/source/prismic/api';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const ComingSoon = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: black;
	color: white;
`;

const WebApp = ({ Component, pageProps }) => {
	const [siteOptions] = useState(pageProps.options);
	const [cursorRefresh, setCursorRefresh] = useState(0);
	const [hasVisited, setHasVisited] = useState(false);
	const router = useRouter();

	const handleCursorRefresh = () => {
		setCursorRefresh(cursorRefresh + 1);
	};

	const handleExitComplete = () => {
		window.scrollTo(0, 0);
		handleCursorRefresh();

		setTimeout(() => {
			handleCursorRefresh();
		}, 1000);
	};

	useEffect(() => {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		if (Cookies.get('jk-visit')) {
			setHasVisited(true);
		}

		window.scrollTo(0, 0);

		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 200);

		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 400);

		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 600);

		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 800);

		setTimeout(() => {
			setHasVisited(true);
			Cookies.set('jk-visit', '1', { expires: 1 });
		}, 4000);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<ApolloProvider client={client}>
				<SiteOptionsProvider value={siteOptions}>
					<Head />
					<DefaultSeo />
					<GlobalStyles />
					<Layout
						siteOptions={pageProps.options}
						work={pageProps.work}
						cursorRefresh={handleCursorRefresh}
						hasVisited={hasVisited}
					>
						<AnimatePresence
							exitBeforeEnter
							onExitComplete={() => handleExitComplete()}
						>
							<Component
								{...pageProps}
								key={router.asPath}
								cursorRefresh={handleCursorRefresh}
								hasVisited={hasVisited}
							/>
						</AnimatePresence>
					</Layout>
				</SiteOptionsProvider>
			</ApolloProvider>
		</ThemeProvider>
	);
};

WebApp.getInitialProps = async () => {
	const options = await getSiteOptions();
	const work = await getAllWork();

	return {
		pageProps: {
			options,
			work
		}
	};
};

export default WebApp;
