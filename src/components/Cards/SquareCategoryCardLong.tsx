import Link from '@/components/CustomLink';
import SquareImages from '@/components/Images/Image1to1Rounded';
import { IImage } from '@/types';
import * as React from 'react';

export interface ISimpleSolidCard {
	title: string;
	to: string;
	className?: string;
	image: IImage;
}
const SimpleSolidCard: React.FC<ISimpleSolidCard> = ({ title, to, image }) => {
	return (
		<Link to={to} className="flex shadow rounded-lg overflow-hidden items-center">
			<div className="h-16 w-16">
				<SquareImages className="rounded-t-lg" {...image} />
			</div>

			<div className="font-roboto font-semi text-center py-2 px-6">{title}</div>
		</Link>
	);
};

export default SimpleSolidCard;
