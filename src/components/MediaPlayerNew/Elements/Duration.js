//https://github.com/cookpete/react-player/blob/master/src/demo/Duration.js

import React from 'react';

const Duration = ({ className, seconds }) => {
	return (
		<time dateTime={`P${Math.round(seconds)}S`} className={className}>
			{format(seconds)}
		</time>
	);
};

function format(seconds) {
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = pad(date.getUTCSeconds());
	if (hh) {
		return `${hh}:${pad(mm)}:${ss}`;
	}
	return `${mm}:${ss}`;
}

function pad(string) {
	return ('0' + string).slice(-2);
}
export default Duration;
