import API from './api';
import { FirstLevelEntityType, ModelToCreateType } from '../types/projectTypes';

export const createEntityResponse = async () => {
	const response = await API.post('/v1/outlay-rows/entity/create');
	return response.data;
};

export const getTreeRowsResponse = async (eID: string) => {
	const response = await API.get(`/v1/outlay-rows/entity/${eID}/row/list`);
	return response.data;
};

export const createRowInEntityResponse = async (
	eID: string,
	reqData: ModelToCreateType
) => {
	const data = JSON.stringify(reqData);
	const response = await API.post(
		`/v1/outlay-rows/entity/${eID}/row/create`,
		{ data },
		{
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}
	);
	return response.data;
};

export const updateRowResponse = async (
	eID: string,
	rID: string,
	reqData: ModelToCreateType
) => {
	const data = JSON.stringify(reqData);
	const response = await API.post(
		`/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
		{ data },
		{
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}
	);

	return response.data;
}

export const deleteRowResponse = async (
	eID: string,
	rID: string,
) => {
	const response = await API.delete(`/v1/outlay-rows/entity/${eID}/row/${rID}/delete`);
	return response.data;
};

