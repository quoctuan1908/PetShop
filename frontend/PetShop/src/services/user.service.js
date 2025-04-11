import createApiClient from './api.service'

class UserService {
    constructor(baseUrl='http://localhost:3001/api/user') {
        this.api = createApiClient(baseUrl)
    }

    async updateUserProfile(account_id,user) {
        const result = (await this.api.post('/'+account_id, user)).data
        if (result)
            localStorage.setItem('user', JSON.stringify(user))
        return result
    }   

    async findOne(id) {
        const result = (await this.api.get("/"+id)).data
        return result;
    }

}

export default new UserService()