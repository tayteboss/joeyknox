import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { motion } from 'framer-motion';
import { getSiteOptions } from '../../lib/source/prismic/api';

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 }
};

export default function Layout({ children, siteOptions }) {
	return (
		<>
			<Header />
			<motion.main
				initial="hidden"
				animate="visible"
				variants={variants}
				className="main-wrapper"
			>
				{children}
			</motion.main>
			<Footer data={siteOptions} />
		</>
	);
}
