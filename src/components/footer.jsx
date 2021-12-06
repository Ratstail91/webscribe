import React from 'react';
import { Link } from 'react-router-dom';

const Break = () => {
	return (
		<>
			<span className='mobile hide'> - </span>
			<br className='mobile show' />
		</>
	);
}

const Footer = () => {
	return (
		<footer>
			<p className='text centered'>© <a href='https://krgamestudios.com'>KR Game Studios</a> 2021</p>
		</footer>
	);
};

export default Footer;
