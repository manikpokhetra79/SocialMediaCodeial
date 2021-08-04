const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user : {
        type :  mongoose.Schema.Types.ObjectId
    },
    // this defines the object id of the liked object
    likeable : {
        type :   mongoose.Schema.Types.ObjectId,
        required : true,
        // make dynamic reference
        refPath : 'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onModel : {
        type : String,
        required: true,
        enum : ['Post','Comment'] // Parent value can be either Post or Comment
    }

},{
    timestamps : true
})

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;