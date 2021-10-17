/* eslint-disable func-style */
import { SITE_OPTIONS_QUERY } from './queries/siteOptions';
import { ALL_WORK_QUERY, SINGLE_WORK_QUERY } from './queries/work';

import client from './apolloClient';

async function fetchAPI(query, { variables } = {}) {
	const json = await client.query({
		query,
		variables
	});
	if (json.errors) {
		console.log(json.errors);
		console.log('Error details: ', query, variables);
		throw new Error('Failed API call');
	}

	return json.data;
}

export async function getSiteOptions() {
	const query = SITE_OPTIONS_QUERY;
	const data = await fetchAPI(query);
	return data.allSite_optionss.edges[0].node;
}

export async function getAllWork() {
	const query = ALL_WORK_QUERY;
	const data = await fetchAPI(query);
	return data.allProjects.edges;
}

export async function getSingleWork(slug) {
	const query = SINGLE_WORK_QUERY;
	const variables = {
		variables: {
			slug
		}
	};
	const data = await fetchAPI(query, variables);
	if (data.length <= 0) {
		return [];
	}
	return data.allProjects.edges[0].node;
}
