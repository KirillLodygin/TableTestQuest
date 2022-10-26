import { initialStateTypes } from './types/projectTypes';

export const initialState: initialStateTypes = {
	topMenu: [
		{
			title: 'Просмотр',
			onClick: () => {
				console.log('Просмотр');
			},
		},
		{
			title: 'Управление',
			onClick: () => {
				console.log('Управление');
			},
		},
	],
	sideBarHeaderH2: 'Название проекта',
	sideBarHeaderH3: 'Аббревиатура',
	sideBarMenu: [
		{
			shortTitle: 'По проекту',
			title: 'По проекту',
		},
		{
			shortTitle: 'Объекты',
			title: 'Объекты',
		},
		{
			shortTitle: 'РД',
			title: 'РД',
		},
		{
			shortTitle: 'МТО',
			title: 'МТО',
		},
		{
			shortTitle: 'СМР',
			title: 'Строительно-монтажные работы',
		},
		{
			shortTitle: 'График',
			title: 'График',
		},
		{
			shortTitle: 'МиМ',
			title: 'МиМ',
		},
		{
			shortTitle: 'Рабочие',
			title: 'Рабочие',
		},
		{
			shortTitle: 'Капвложения',
			title: 'Капвложения',
		},
		{
			shortTitle: 'Бюджет',
			title: 'Бюджет',
		},
		{
			shortTitle: 'Финансирование',
			title: 'Финансирование',
		},
		{
			shortTitle: 'Панорамы',
			title: 'Панорамы',
		},
		{
			shortTitle: 'Камеры',
			title: 'Камеры',
		},
		{
			shortTitle: 'Поручения',
			title: 'Поручения',
		},
		{
			shortTitle: 'Контрагенты',
			title: 'Контрагенты',
		},
	],
	tableHeaders: [
		{
			tableId: 'Строительно-монтажные работы',
			headers: [
				'Уровень',
				'Наименование работ',
				'Основная з/п',
				'Оборудование',
				'Накладные расходы',
				'Сметная прибыль',
			],
		},
	],
};
