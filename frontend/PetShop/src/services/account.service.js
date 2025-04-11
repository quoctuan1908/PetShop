import { jwtDecode } from "jwt-decode";
import createApiClient from './api.service';


class AccountService {
    constructor(baseUrl='http://localhost:3001/api/account') {
        this.api = createApiClient(baseUrl)
    }

    async findAll() {
        try {
            const accounts = (await this.api.get('/')).data
            console.log(accounts)
            return accounts
        } catch (error) {
            console.log(error)
        }
    }

    async changeRole(id, role) {
        try {
            const changeRole = (await this.api.patch('/' + id + "/role",{
                role: role
            })).data
            return changeRole
        } catch (error) {
            console.log(error)
        }
    }

    async login(username, password) {
        try {
            const login = (await this.api.post('/login', {
                account: {
                    username: username,
                    password: password
                }
            })).data
            if (login.statusCode == 200) {
                const parsedToken = jwtDecode(login.token)
                localStorage.setItem('token', login.token)
                localStorage.setItem('account', JSON.stringify(parsedToken.payload.account))
                localStorage.setItem('role',parsedToken.payload.account.role)
                localStorage.setItem('user', JSON.stringify(parsedToken.payload.user))
            }
            return login
        } catch(err) {
            console.error(err)
        }
    }

    async signup(username, password, role) {
        try {
            const signup  = (await this.api.post('/', {
                account: {
                    username: username,
                    password: password,
                    role: role
                }
            })).data
            console.log(signup)
            return signup
        }
        catch(err) {
            console.error(err)
        }
    }

    logout() {
        localStorage.removeItem('account')
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        location.href="/login"
    }

    async delete(id) {
        try {
            const result = (await (this.api.delete('/' + id))).data
            return result
        } catch (error) {
            console.error(error)
        }
    }

    async count() {
        try {
            const result = (await (this.api.get('/count'))).data
            return result
        } catch (error) {
            console.error(error)
        }
    }
}

export default new AccountService()