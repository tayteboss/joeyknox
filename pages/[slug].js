// import { useRouter } from 'next/router';

// export default function Page({ page, options }) {
// 	const router = useRouter();

// 	return (
// 		<>
// 			Slug
// 		</>
// 	);
// }

// export async function getStaticPaths() {
// 	const allWork = await getAllWork();

// 	return {
// 		paths: allWork.map((item) => {
// 			return `/${item.node._meta.uid}`;
// 		}),
// 		fallback: true
// 	};
// }

// export async function getStaticProps() {
// 	const options = await getSiteOptions();

// 	return {
// 		props: {
// 			options: options
// 		}
// 	};
// }
