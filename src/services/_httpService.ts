import axios, { /* AxiosHeaders ,*/ type AxiosResponse } from 'axios'
import config from './_config.json'
// import { errorToast, showToast } from '../utils/toastUtils';
import { toast } from 'sonner';
import { errorToast } from '@/utils/toastUtils';

export const apiPath = config.offlinePath

axios.defaults.timeout = 10000;

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        const res = error?.response;
        if (!res?.status) {
            errorToast('مشکلی در ارتباط با سرور وجود دارد')
        } else if (res.status >= 500) {
            errorToast(`مشکلی از سمت سرور رخ داده است (error ${res.status})`)
        } else if (res.status == 401) {
            errorToast(`ورود غیر مجاز (error ${res.status})`)
        } else if (res.status == 403) {
            errorToast(`شما مجاز به استفاده نیستید (error ${res.status})`)
        } else if (res.status >= 400) {
            errorToast(`در ورود اطلاعات دقت کنید (error ${res.status})`)
        } else if (res.status > 201) {
            const message =
                res?.data?.message || `در ورود اطلاعات دقت کنید (error ${res.status})`
            toast(message)
        }
        return Promise.reject(error)
    }
)

const httpService = (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data?: unknown,
    // headers?: AxiosHeaders,
): Promise<AxiosResponse> => {
    return axios({
        baseURL: apiPath,
        url,
        method,
        data,
        // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
}

export default httpService;