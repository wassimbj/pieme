const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    
    title: {
        type: String,
        require: true
    }

    , links: {
        preview: String,
        github: String
    }

    , description: {
        type: String,
        required: true
    }
    
    , tags: {
        type: Array,
        required: true
    }

    , category: {
        type: String,
        required: true
    }

    , author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

    , created_at: {
        type: Date,
        default: new Date()
    }
    
});

module.exports = mongoose.model('Project', ProjectSchema);