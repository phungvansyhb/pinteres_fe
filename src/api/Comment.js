import {Base} from './Base'


class Comment{
    constructor() {
        this.userName =''
        this.content =''
        this.createdAt = Date.now()
        this.image_id =''
    }
    getCommentByImageId(id){
        return Base.get(`/comments/${id}`)
    }
}
export default new Comment()