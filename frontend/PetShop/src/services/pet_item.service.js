import createApiClient from './api.service'

class PetItemService {
    constructor(baseUrl='http://localhost:3001/api/pet_item') {
        this.api = createApiClient(baseUrl)
    }

    async findAll(prompt) {
        try {
            const items = (await this.api.get('/search/'+ prompt)).data
            console.log(items)
            return items
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id) {
        try {
            const items = (await this.api.get('/' + id)).data
            console.log(items)
            return items
        } catch (error) {
            console.log(error)
        }
    }

    async create(item,image) {
        const formData = new FormData()
        formData.append('item', JSON.stringify(item))
        formData.append('file', image)
        console.log(image)
        console.log(formData)
        try {
            const result = (await this.api.post('/',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })).data
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,newData) {
        try {
            const item = (await this.api.patch('/' + id,newData)).data
            console.log(item)
            return item
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

    async findItemsWithSpeciesId(species_id) {
        try {
            const items = (await this.api.get('/species/' + species_id)).data
            console.log(items)
            return items
        } catch (error) {
            console.log(error)
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

export default new PetItemService()