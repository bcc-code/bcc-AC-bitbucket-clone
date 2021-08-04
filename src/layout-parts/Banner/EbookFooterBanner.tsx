import PostTitle from '@/components/PostElements/TextSizeWClamp';
import { IPostItem } from '@/types';
import * as React from 'react';

const EbookFooterBanner: React.FC<IPostItem> = ({ title, image, excerpt }) => {
	return (
		<div
			className="w-full p-4 flex flex-col sm:flex-row items-center sm:items-start rounded-lg border border-gray-300"
			style={{ backgroundImage: 'linear-gradient(to right,#EDF1FA,#fff)' }}
		>
			<div className="sm:w-1/3 ">
				<img className="rounded-lg" src={image.src} alt={`ebook ${title}`} />
			</div>
			<div className="w-full sm:w-2/3 p-4">
				<PostTitle rawText={title} bold="font-semibold" fontKey="header-post" clamp={3} className="mb-4" />
				<span className="hidden sm:block" dangerouslySetInnerHTML={{ __html: excerpt }}></span>
			</div>
		</div>
	);
};

export default EbookFooterBanner;
