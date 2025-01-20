import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import '../../styles/index.module.scss'
import styles from './App.module.css'
import { ArticleStateType, defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setPageState={setPageState}
				initialState={pageState}
			/>
			<Article />
		</main>
	);
};
