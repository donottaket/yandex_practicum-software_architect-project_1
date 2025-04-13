import CardApi from 'card/api';
import ProfileApi from 'profile/api';

class Api {
    getAppInfo() {
        return Promise.all([CardApi.getCardList(), ProfileApi.getUserInfo()]);
    }
}

const api = new Api()

export default api;