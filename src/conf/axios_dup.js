import axios from 'axios';
import React from 'react';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import {API_HOST} from './index';

export const instance = axios.create({
  baseURL: API_HOST
});

const ErrorAlert = withReactContent(Swal)

export const setupAxiosInterceptor = (store, axiosInstance) => {

  axiosInstance.interceptors.request.use(
    async function (config) {
      //console.log('config: ', config)
      const regx = new RegExp('^v[2345]+\.[0-9]+\.[0-9]\/*');

      if (config.url.match(regx)) {
        config.url
      } else {
        config.url = '/v1.0/admin' + config.url;
      }

      const authData = store.getState().member?.get('authData')?.toJS();
      const token = authData?.token;
      if (authData?.token) {
        config.headers['Authorization'] = `Bearer ${authData.token}`;
      }
      console.log('after config: ', config);
      return config;
    },
    function (error) {
      console.log('Error in Config :', error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log('Error in response :', error);
      if (error.response.status === 401) {
        store.dispatch({type: 'AUTH_ERROR', payload: '驗證失敗，請重新登入'});
      }
      return Promise.reject(error);
    }
  );

};

