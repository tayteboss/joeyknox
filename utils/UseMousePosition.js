import { useEffect, useState } from 'react';
import _ from 'lodash';

export const useMousePosition = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });

	useEffect(() => {
		const throttledSetFromEvent = _.throttle(setFromEvent, 50);
		window.addEventListener('mousemove', throttledSetFromEvent);

		return () => {
			window.removeEventListener('mousemove', throttledSetFromEvent);
		};
	}, []);

	return position;
};
