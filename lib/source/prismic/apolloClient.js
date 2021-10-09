import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PrismicLink } from 'apollo-link-prismic';

const client = new ApolloClient({
	link: PrismicLink({
		uri: process.env.NEXT_PUBLIC_PRISMIC_GRAPHQL,
		accessToken: process.env.PRISMIC_ACCESS_TOKEN
	}),
	cache: new InMemoryCache()
});

export default client;
