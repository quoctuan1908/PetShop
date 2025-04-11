import createApiClient from './api.service'

class OrderService {
    constructor(baseUrl='http://localhost:3001/api/order') {
        this.api = createApiClient(baseUrl)
    }

    async findAll() {
        try {
            const orders = (await this.api.get('/')).data
            console.log(orders)
            return orders
        } catch (error) {
            console.log(error)
        }
    }

    async findHistory(id) {
        try {
            const orders = (await this.api.get('/history', {params: {id : id}})).data
            console.log(orders)
            return orders
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id) {
        try {
            const order = (await this.api.get('/' + id)).data
            console.log(order)
            return order
        } catch (error) {
            console.log(error)
        }
    }

    async findByUser(id) {
        console.log(id)
        try {
            const orders = (await this.api.get('/' + id)).data
            console.log(orders)
            return orders
        } catch (error) {
            console.log(error)
        }
    }


    async create(orders,address) {
        try {
            localStorage.setItem('address', address)
            const result = (await this.api.post('/', {
                orders:orders,
                address: address
            })).data
            console.log(result)
            return result
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

    async accept(order_id, staff_id) {
        try {
            const result = (await (this.api.patch('/' + order_id,{staff_id: staff_id}))).data
            return result
        } catch (error) {
            console.error(error)
        }
    }

    async cancel(order_id, staff_id) {
        try {
            const result = (await (this.api.patch('/' + order_id + "/cancel",{staff_id: staff_id}))).data
            return result
        } catch (error) {
            console.error(error)
        }   
    }

    async finishDelivering(order_id, staff_id) {
        try {
            const result = (await (this.api.patch('/' + order_id + "/finish",{staff_id: staff_id}))).data
            return result
        } catch (error) {
            console.error(error)
        }   
    }
    async countProcessingOrder() {
        try {
            const result = (await (this.api.get('/count/processing'))).data
            return result
        } catch (error) {
            console.error(error)
        }
    }
}

export default new OrderService()