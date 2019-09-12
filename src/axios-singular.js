export default class AxiosSingular {
    constructor(axiosInstance) {
        this._axiosInstance = axiosInstance;
        this._lastRequestCancel = null;
    }

    _cancelLastRequest(reason = 'Request was canceled') {
        if (this._lastRequestCancel) {
            this._lastRequestCancel(reason);
            this._lastRequestCancel = null;
        }
    }

    _handleBeforeRequest() {
        this._cancelLastRequest();
    }

    _getPatchedConfig(config) {
        const CancelToken = this._axiosInstance.CancelToken;
        const source = CancelToken.source();
        this._lastRequestCancel = source.cancel.bind(source);

        config.cancelToken = source.token;
        return config;
    }

    request(config) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.request(this._getPatchedConfig(config)));
    }

    get(url, config = {}) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.get(url, this._getPatchedConfig(config)));
    }

    delete(url, config = {}) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.delete(url, this._getPatchedConfig(config)));
    }

    head(url, config = {}) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.head(url, this._getPatchedConfig(config)));
    }

    options(url, config = {}) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.options(url, this._getPatchedConfig(config)));
    }

    post(url, data = {}, config = {}) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.post(url, data, this._getPatchedConfig(config)));
    }

    put(url, data = {}, config = {}) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.put(url, data, this._getPatchedConfig(config)));
    }

    patch(url, data = {}, config = {}) {
        this._handleBeforeRequest();
        return this._getWrappedResponse(this._axiosInstance.patch(url, data, this._getPatchedConfig(config)));
    }

    _getWrappedResponse(requestPromise) {
        return requestPromise.then((response) => {
            this._lastRequestCancel = null;
            return response;
        }, (error) => {
            if (!this._axiosInstance.isCancel(error)) {
                this._lastRequestCancel = null;
            }
            return Promise.reject(error);
        });
    }

    cancel(reason = undefined) {
        this._cancelLastRequest(reason);
    }
}
