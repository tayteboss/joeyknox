import Head from 'next/head';
import parse from 'html-react-parser';

export default function Meta({ seo }) {
	if (!seo) {
		return <Head></Head>;
	}
	const seoTags = parse(seo);

	return (
		<Head>
			{seoTags}
		</Head>
	);
}
