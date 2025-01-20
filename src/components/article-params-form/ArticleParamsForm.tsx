import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import {
	OptionType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

export type ArticleParamsFormProps = {
	setPageState: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setPageState } = props;

	const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
	const [currentState, setCurrentState] = useState(defaultArticleState);

	const updateField =
		(field: keyof typeof defaultArticleState) => (value: OptionType) => {
			setCurrentState((prevState) => ({
				...prevState,
				[field]: value,
			}));
		};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPageState(currentState);
	};

	const handleFormReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentState(defaultArticleState);
		setPageState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isPanelOpen}
				onClick={() => setIsPanelOpen((prev) => !prev)}
			/>
			<div
				onClick={() => setIsPanelOpen(false)}
				className={clsx(
					styles.overlay,
					isPanelOpen && styles.overlay_open
				)}></div>
			<aside
				className={clsx(
					styles.container,
					isPanelOpen && styles.container_open
				)}>
				<form
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}
					className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={currentState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={updateField('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={currentState.fontSizeOption}
						options={fontSizeOptions}
						onChange={updateField('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={currentState.fontColor}
						options={fontColors}
						onChange={updateField('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={currentState.backgroundColor}
						options={fontColors}
						onChange={updateField('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={currentState.contentWidth}
						options={contentWidthArr}
						onChange={updateField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
