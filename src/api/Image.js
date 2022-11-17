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

    getAllExcludeK16(page , limit) {
        return Base.get('/' , {params : {page : page , limit : 20}})
    }
    getK16Only(page , limit) {
        return Base.get('/k16' , {params : {page : page , limit : 20}})
    }

    searchByName(name , page) {
        return Base.get('/images/by-name', {params: {name: name , page : page , limit : 20}})
    }

    searchByCategory(category , page) {
        return Base.get('/images', {params: {category: category , page : page ,limit : 20}})
    }
}

export default new Image()
