import ajax from './ajax'

//1.定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';

export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');

export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);

