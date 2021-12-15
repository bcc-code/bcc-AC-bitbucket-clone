import Content from '@/components/Content';
import { LayoutH1 } from '@/components/Headers';
import Video16to9 from '@/components/Images/Video16to9';
import MotionAppear from '@/components/Motion/AppareY';
import { IImage, IAuthor, IPostRes } from '@/types';
import * as React from 'react';
import Gallery from './Gallery';
import OnePostBanner from './OnePostBanner';
import PostItems from './PostItems';
import QuoteBlock from './QuoteBlock';

const getContentBlock = (block: IPageCompTypes) => {
	console.log(block.type);
	switch (block.type) {
		case 'featured_items':
			return (
				<div className="py-8">
					{block.data.map((child, k) => {
						return <OnePostBanner key={k} {...child} />;
					})}
				</div>
			);

		case 'quote_block':
			return <QuoteBlock {...block} />;
		case 'post_items':
			return <PostItems {...block} />;
		case 'gallery':
			return <Gallery {...block} />;
		case 'text':
			return <Content content={block.data.content} />;
		case 'embed':
			return <Video16to9 src={block.data.url} className={`rounded-xxl sm:rounded-xl overflow-hidden`} />;
		default:
			return <div>section</div>;
	}
};

export const getTheme = (themeName?: IThemeName) => {
	switch (themeName) {
		case 'primary':
			return 'bg-ac-slate-lighter';
		case 'secondary':
			return 'bg-gray-100';
		case 'light':
			return '';
		case 'dark':
			return 'bg-ac-slate-dark w-full text-white';
		case 'black':
			return 'bg-black w-full text-white';
		default:
			return 'bg-ac-slate-lighter';
	}
};

const BlockWrapper: React.FC<IBlockWrapper> = ({ children, theme, h1, content }) => {
	let customTHemeName = theme;
	if (content.type === 'featured_items' && content.data.length === 1 && content.data[0].type === 'post') {
		customTHemeName = 'dark';
	}

	const themeColorClassname = getTheme(customTHemeName);
	const renderBlock = getContentBlock(content);

	return (
		<MotionAppear
			className={`${themeColorClassname} flex flex-col items-center justify-center`}
			style={{ minHeight: '360px' }}
		>
			{h1 && <LayoutH1 className="mx-auto px-4 tablet:px-0 pb-0 w-full standard-max-w" title={h1} />}
			<div className={`mx-auto px-4 tablet:px-0 py-8 sm:py-12 w-full standard-max-w`}>{renderBlock}</div>
		</MotionAppear>
	);
};

export default BlockWrapper;

export type IThemeName = 'primary' | 'secondary' | 'light' | 'dark' | 'black';

interface IBlockWrapper {
	h1?: string;
	theme?: IThemeName;
	content: IPageCompTypes;
}

export interface IPageFeaturedPost {
	type: 'playlist' | 'ebook' | 'post';
	id: number;
	image: IImage;
	slug: string;
	sub: string;
	title: string;
}

export interface IModifiedFields {
	exceprt?: string;
	title?: string;
	image?: IImage;
}

export interface IPageTextComp {
	type: 'text';
	data: {
		content: string;
	};
}

export interface IPageEmbedComp {
	type: 'embed';
	data: {
		url: string;
	};
}

export interface IPostItems {
	type: 'post_items';
	data: {
		author: string;
		id: number;
		image: { src: string };
		slug: string;
		sub: string;
		title: string;
		type: 'post';
	}[];
}

export interface IPageFeaturedItems {
	type: 'featured_items';
	data: IPageFeaturedPost[];
}

export interface IPagePost {
	type: 'article_banner';
	data: {
		author: string;
		id: number;
		image: IImage;
		slug: string;
		title: string;
	};
}

export interface IQuoteBlock {
	type: 'quote_block';
	data: {
		active_from?: string;
		active_to?: string;
		author?: IAuthor;
		author_id?: number;
		content: string;
		id: number;
		post?: IPostRes;
		post_id?: number;
		public: 1;
		source?: string;
	};
}

export interface IGalleryImage extends IImage {
	quote_id: number;
}
export interface IGallery {
	type: 'gallery';
	data: {
		image: IGalleryImage;
		type: 'quoteimage';
	}[];
}

export type IPageCompTypes =
	| IPagePost
	| IPageFeaturedItems
	| IPageTextComp
	| IPostItems
	| IPageEmbedComp
	| IQuoteBlock
	| IGallery;
