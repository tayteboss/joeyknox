import { createContext, useContext } from 'react';

export const SiteOptionsContext = createContext({});

export function useSiteOptionsContext() {
	return useContext(SiteOptionsContext);
}

export default function SiteOptionsProvider(props) {
	const { value, children } = props;

	return (
		<SiteOptionsContext.Provider value={value}>
			{children}
		</SiteOptionsContext.Provider>
	);
}
