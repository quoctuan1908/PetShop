import createApiClient from './api.service'

class SpeciesService {
    constructor(baseUrl='http://localhost:3001/api/species') {
        this.api = createApiClient(baseUrl)
    }

    async findAll() {
        try {
            const species = (await this.api.get('/')).data
            console.log(species)
            return species
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id) {
        try {
            const species = (await this.api.get('/' + id)).data
            console.log(species)
            return species
        } catch (error) {
            console.log(error)
        }
    }

    async create(species,image) {
        const formData = new FormData()
        formData.append('species', JSON.stringify(species))
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
            const species = (await this.api.patch('/' + id,newData)).data
            console.log(species)
            return species
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

export default new SpeciesService()