import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
interface IInitialState {
	count: number;
}
const initialState: IInitialState = {
	count: 0
};

// 发起网络请求获取数据
const loadMoviesAPI = () =>
	fetch(
		'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=11&page_id=2&ret_num=48'
	).then((res) => res.json());
// 这个action是可以直接调用的，用来处理异步操作获取数据
export const loadData = createAsyncThunk('learn/loadData', async (id: any) => {
	const res = await loadMoviesAPI();
	return res; // 此处的返回结果会在 .fulfilled中作为payload的值
});
export const learnSlice = createSlice({
	name: 'learn',
	initialState,
	reducers: {
		increment(state, data) {
			state.count += data.payload;
		}
	},
    extraReducers: {
        [loadData.fulfilled.type](state: any, data: any) {
            
        },
        [loadData.pending.type](state: any, data: any) {
            
        },
        [loadData.rejected.type](state: any, data: any) {
            console.log('失败了')
        },
    }
});
