import createApiClient from './api.service'

class SupplierService {
    constructor(baseUrl='http://localhost:3001/api/supplier') {
        this.api = createApiClient(baseUrl)
    }

    async findAll() {
        try {
            const suppliers = (await this.api.get('/')).data
            console.log(suppliers)
            return suppliers
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id) {
        try {
            const supplier = (await this.api.get('/' + id)).data
            console.log(supplier)
            return supplier
        } catch (error) {
            console.log(error)
        }
    }

    async create(supplier) {
        try {
            const result = (await this.api.post('/', {
                supplier:supplier
            })).data
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        }        
    }

    async update(id,newData) {
        try {
            const pet = (await this.api.patch('/' + id,newData)).data
            console.log(pet)
            return pet
        } catch (error) {
            console.log(error)
        }
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

export default new SupplierService()