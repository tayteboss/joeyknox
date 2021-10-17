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

const WebApp = ({ Component, pageProps }) => {
	const [siteOptions] = useState(pageProps.options);

	useEffect(() => {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		window.scrollTo(0, 0);
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
					>
						<Component {...pageProps} />
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
