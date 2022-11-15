import {Base} from './Base'

class Image {
    constructor() {
        this._id = ''
        this.title = ''
        this.description = ''
        this.srcImage = ''
        this.category = ''
        this.subCategory = ''
        this.nameMember = ''
        this.amountComment = 0
        this.createdAt = Date.now()
        this.updateAt = Date.now()
    }

    getDetail(id) {
        return Base.get(`/image/${id}`)
    }

    uploadToCloudinary(data) {
        return Base.post('/upload', data)
    }

    createImage(data) {

    }

    getAllExcludeK16() {
        return Base.get('/')
    }
    getK16Only() {
        return Base.get('/k16')
    }

    searchByName(name) {
        return Base.get('/images/by-name', {params: {name: name}})
    }

    searchByCategory(category) {
        return Base.get('/images', {params: {category: category}})
    }
}

export default new Image()
