import axios from "axios";

axios.defaults.baseURL = 'http://api.mycentos.com/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('access_token');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//获取用户信息
export const getUserInfo = params => {
    return axios.get(`/userinfo`, {params: params});
};
//获取用户权限
export const getUserAuth = params => {
    return axios.get(`/userauth`, {params: params});
};
export const requestLogin = params => {
    return axios.post(`/user/login`, params).then(res => res.data);
};


//分类
export const getCategory = params => {
    return axios.get(`/getWapCategory`, {params: params});
};
//文章
export const getArticle = params => {
    return axios.get(`/getWapArticle`, {params: params});
};
//文章
export const getArticleById = params => {
    return axios.get(`/getWapArticleById`, {params: params});
};
//文章
export const getArticleByCategory = params => {
    return axios.get(`/getWapArticleByCategory`, {params: params});
};






//文章管理
export const getArticleListPage = params => {
    return axios.get(`/article`, {params: params});
};
export const getTopArticle = params => {
    return axios.get(`/article`, {params: params});
};

//评论
export const getCommentListPage = params => {
    return axios.get(`/comment`, {params: params});
};


export const errors = rs => {
    if (rs.response.status == '500') {
        return {message: '服务器错误', type: 'error', duration: '3000'};
    } else if (rs.response.status == '422') {
        let msg =''
        for(let v in rs.response.data){
           msg += v+':'+rs.response.data[v].join()
        }
        return {message: '验证数据失败!!' + msg, type: 'error', duration: '3000'};
    } else if (rs.response.status == '403') {
        return {message: '没有权限', type: 'error', duration: '3000'};
    } else {
        return {message: rs.response.status, type: 'error', duration: '3000'};
    }
};
