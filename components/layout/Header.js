import { useState, useEffect } from 'react';
import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const HeaderWrapper = styled(motion.header)`
	position: fixed;
	top: 0;
	left: 0;
	padding: 16px 0;
	width: 100%;
	z-index: 15;
	mix-blend-mode: difference;
	pointer-events: none;

	transition: filter ${props => props.theme.transitionSpeed.slow} ease;
`;

const Link = styled.a`
	pointer-events: all;
`;

const Logo = styled.img`
	width: 92px;
	mix-blend-mode: difference;
	pointer-events: all;
`;

const MenuTrigger = styled.p`
	grid-column: 9 / -1;
	text-align: right;
	color: ${props => props.theme.colours.white};
	pointer-events: all;
	opacity: ${props => props.hasScrolled ? '1'  : '0'};
	visibility: ${props => props.hasScrolled ? 'visible' : 'hidden'};

	transition: all ${props => props.theme.transitionSpeed.default} ease;
`;

const Menu = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 50vw;
	height: 100%;
	background: ${props => props.theme.colours.white};
	z-index: 10;
	box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	pointer-events: all;
	transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};

	transition: all ${props => props.theme.transitionSpeed.slow} ease;

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		width: 80vw;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		width: 100%;
	}
`;

const MenuInner = styled(motion.div)`
	padding: 16px 0 0 16px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		padding: 60px 0 0 16px;
	}
`;

const MenuList = styled(motion.div)`
	display: flex;
	flex-direction: column;
	margin-bottom: 50px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: 30px;
	}
`;

const MenuItem = styled(motion.a)`
	grid-column: span 2;
	color: ${props => props.theme.colours.grey};
	width: 50px;

	transition: all ${props => props.theme.transitionSpeed.fast} ease;

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}
`;

const ContactDetails = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 50px;
`;

const Phone = styled(motion.a)`
	color: ${props => props.theme.colours.grey};

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}
`;

const Email = styled(motion.a)`
	color: ${props => props.theme.colours.grey};

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}
`;

const WorkList = styled(motion.div)`
	max-width: 430px;
`;

const WorkItem = styled(motion.a)`
	color: ${props => props.theme.colours.grey};

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}
`;

const headerVariant = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: 3.5,
			ease: 'easeOut'
		}
	}
};

const parentVariant = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: 0.2,
			ease: 'easeOut',
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	}
};

const childVariant = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	}
};

export default function Header({ siteOptions, work }) {
	const [isOpen, setIsOpen] = useState(false);
	const [hasScrolled, setHasScrolled] = useState(false);
	const [isHome, setIsHome] = useState(false);
	const router = useRouter();

	console.log('work', work);

	useEffect(() => {
		const handleScroll = () => {
			if (isOpen || router.asPath !== '/') {
				setHasScrolled(true);
			} else {
				if (window.scrollY > 300) {
					setHasScrolled(true);
				} else {
					setHasScrolled(false);
				}
			}

			if (router.asPath === '/') {
				setIsHome(true);
			} else {
				setIsHome(false);
			}
		};

		const throttledHandleScroll = _.throttle(handleScroll, 100);
		window.addEventListener('scroll', throttledHandleScroll);
		return () => window.removeEventListener('scroll', throttledHandleScroll);
	}, [isOpen, router.asPath]);

	return (
		<>

			<HeaderWrapper
				variants={isHome ? headerVariant : null}
				initial="hidden"
				animate="visible"
				className="dim-wrapper"
			>
				<InnerWrapper>
					<Grid align="center">
						<Link href="/">
							<Logo
								className="cursor-link"
								src="./icons/logo-white.svg"
							/>
						</Link>
						<MenuTrigger
							className="cursor-link"
							onClick={() => setIsOpen(!isOpen)}
							hasScrolled={hasScrolled}
						>
							{isOpen ? 'Close' : 'Menu'}
						</MenuTrigger>
					</Grid>
				</InnerWrapper>
			</HeaderWrapper>

			<Menu isOpen={isOpen}>
				<MenuInner
					variants={parentVariant}
					initial="hidden"
					animate={isOpen ? 'visible' : 'hidden'}
				>

					<MenuList>
						<MenuItem
							href="#work"
							className="cursor-link"
							variants={childVariant}
							onClick={() => setIsOpen(false)}
						>
							Work
						</MenuItem>
						<MenuItem
							href="#about"
							className="cursor-link"
							variants={childVariant}
							onClick={() => setIsOpen(false)}
						>
							About
						</MenuItem>
						<MenuItem
							href="#contact"
							className="cursor-link"
							variants={childVariant}
							onClick={() => setIsOpen(false)}
						>
							Contact
						</MenuItem>
						<MenuItem
							href="/work/showreel"
							className="cursor-link"
							variants={childVariant}
							onClick={() => setIsOpen(false)}
						>
							Showreel
						</MenuItem>
					</MenuList>

					<ContactDetails>
						{siteOptions.phone && (
							<Phone
								className="cursor-link"
								href={`tel: ${siteOptions.phone}`}
								variants={childVariant}
							>
								{siteOptions.phone}
							</Phone>
						)}

						{siteOptions.email && (
							<Email
								className="cursor-link"
								href={`mailto: ${siteOptions.email}`}
								variants={childVariant}
							>
								{siteOptions.email}
							</Email>
						)}
					</ContactDetails>

					{work && (
						<WorkList>
							{work.map((item, index) => (
								<Link
									key={index}
									passHref
									href={item.node._meta.uid}
								>
									<WorkItem
										className="cursor-link"
										onClick={() => setIsOpen(false)}
										variants={childVariant}
									>
										{item.node.title},{' '}
									</WorkItem>
								</Link>
							))}
						</WorkList>
					)}

				</MenuInner>
			</Menu>

		</>
	);
}
