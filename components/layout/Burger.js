import styled from 'styled-components';

const BurgerWrapper = styled.button`
	position: absolute;
	top: 22px;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 16px;
	height: 14px;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 10;
	transform: translateY(-50%);

	&:focus {
		outline: none;
	}
`;

const BurgerSVG = styled.svg`
	position: absolute;
	top: 0;
	right: 0;
	opacity: ${props => props.isOpen ? '0' : '1'};

	transition: all ${props => props.theme.transitionSpeed.default} ease;
`;

const BurgerPath = styled.path``;

const CloseSVG = styled.svg`
	position: absolute;
	top: 0;
	right: 0;
	opacity: ${props => props.isOpen ? '1' : '0'};

	transition: all ${props => props.theme.transitionSpeed.default} ease;
`;

const ClosePath = styled.path``;

const Burger = ({ isOpen, handleMenuClick }) => {
	return (
		<BurgerWrapper onClick={handleMenuClick} className="cursor-link">
			<BurgerSVG
				width="16"
				height="14"
				viewBox="0 0 16 14"
				fill="none"
				isOpen={isOpen}
			>
				<BurgerPath d="M16 7.27686L-7.15256e-07 7.27685" stroke="black" />
				<BurgerPath d="M16 1.27686L-7.15256e-07 1.27685" stroke="black" />
				<BurgerPath d="M16 13.2769L0 13.2769" stroke="black" />
			</BurgerSVG>

			<CloseSVG
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				isOpen={isOpen}
			>
				<ClosePath d="M15 15L1.21294 1.21294" stroke="black" />
				<ClosePath d="M1.21289 15L15 1.21294" stroke="black" />
			</CloseSVG>

		</BurgerWrapper>
	);
};

export default Burger;
