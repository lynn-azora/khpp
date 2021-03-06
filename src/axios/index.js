import { Modal } from 'antd';
import axios from 'axios'
import Utils from '../utils/utils';

export default class Axios {

    static requestList(_this,url,params,isMock){
        var data = {
            params:params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading!==false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = '';
        if(options.isMock){
            baseApi = 'https://www.fastmock.site/mock/c8a5a603f1ea68656997314a831c2681/gxdc'
        }else{
            baseApi = 'https://www.fastmock.site/mock/c8a5a603f1ea68656997314a831c2681/gxdc'
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi, // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then(response=>{
                if(options.data && options.data.isShowLoading!==false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status===200){
                    let res = response.data;
                    if(res.code === 0){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.message
                        })
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}