import createApiClient from './api.service'

class PetService {
    constructor(baseUrl='http://localhost:3001/api/pet') {
        this.api = createApiClient(baseUrl)
    }

    async findAll(prompt) {
        try {
            const pets = (await this.api.get('/search/'+prompt)).data
            console.log(pets)
            return pets
        } catch (error) {
            console.log(error)
        }
    }

    async findPetsWithSpeciesId(species_id) {
        try {
            const pets = (await this.api.get('/species/' + species_id)).data
            console.log(pets)
            return pets
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id) {
        try {
            const pet = (await this.api.get('/' + id)).data
            console.log(pet)
            return pet
        } catch (error) {
            console.log(error)
        }
    }

    async create(pet,image) {
        const formData = new FormData()
        formData.append('pet', JSON.stringify(pet))
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

export default new PetService()