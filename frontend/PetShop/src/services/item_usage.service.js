import createApiClient from './api.service'

class ItemUsageService {
    constructor(baseUrl='http://localhost:3001/api/item_usage') {
        this.api = createApiClient(baseUrl)
    }

    async findAll() {
        try {
            const items = (await this.api.get('/')).data
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

    async create(item, species) {
        console.log(species)
        const itemHandle = {
            PetItemId: item,
            SpeciesId: species
        }
        try {
            console.log(itemHandle)
            const result = (await this.api.post('/', {item:itemHandle
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
}

export default new ItemUsageService()