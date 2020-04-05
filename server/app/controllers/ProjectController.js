const ProjectModel = require('../models/Project');


class Project {

    async getProjects(args)
    {
        const {skip} = args,
                limit = 1;
        // console.log(args)

        let projects = await ProjectModel.find()
                                        .populate('author', ['name', 'image'])
                                        .skip(skip)
                                        .limit(limit)
                                        .sort({ created_at: -1})
        // console.log(projects)
        return projects;
    }

    async submitProject(data, session)
    {
        
        const { title, links, description, tags, category } = data;
        // console.log(data)
        const user_id = session.userid;

        let errors = [];

        if(!title)
            errors.push({field: 'title', msg: 'Please enter the title'});

        if (!description)
            errors.push({ field: 'description', msg: 'Please enter the description'});

        if (tags.length == 0)
            errors.push({ field: 'tags', msg: 'Please enter some tags'});
            
        if(tags.length > 5)
            errors.push({ field: 'tags', msg: 'You cant enter more then 5 tags'});

        if (tags.length > 0 && tags.length < 5 ) {
            // tags = tags.split(',');
            let i = 0,
                tagIsOk = true;
            do {
                tagIsOk = tags[i].trim().length > 15 ? false : true;
                i = i + 1;
            } while (tagIsOk && i < tags.length);

            if (!tagIsOk)
                setError({ field: 'tags', msg: 'Tag must not contain more then 15 chars' })
        }

        if (!category)
            errors.push({ field: 'category', msg: 'Please choose a category'});

        if(errors.length > 0)
            return {error: errors, success: false};
        
            
        await ProjectModel.create({
            title,
            links,
            tags,
            category,
            description,
            author: user_id
        });

        return {error: null, success: true};

    }

}

module.exports = new Project();