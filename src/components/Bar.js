import { useState, useEffect } from 'react';
import useWindowDimensions from '../getDimensions';

const Bars = ({ index, length, colorKey, changeArray,arrayLen }) => {
	const { width } = useWindowDimensions();
	const [len, setLen] = useState(length);
	
	console.log(width," ",arrayLen," ",width/arrayLen);

	const colors = ['#ffffff', '#483d8b', '#008080'];

	useEffect(() => {
		setLen(length);
	}, [length]);

	let barStyle = {
		background: colors[colorKey],
		height: 2*length,
		marginTop: 200 - 2*length,
		width: Math.max((width/3)/arrayLen,40) ,
		color:"blue",
	};

	return (
		<div className='relative gap-x-2 hover:shadow-md hover:shadow-gray-200/50 ' style={barStyle}>
			<span className="text-gray-800 font-bold absolute -rotate-90 top-2 left-0 " >{ width>640 && length}</span>
		</div>
	);
};

export default Bars;