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

        let errors = [{}];
        //     [{ 
        //         fieldName: {msg: 'fffff'}, 
        //         fieldName2: {msg: '4444'} 
        // }]

        if(!title)
            errors[0]['title'] = {msg: 'Please enter the title'};

        if (!description)
            errors[0]['description'] = { msg: 'Please enter the description' };
            // errors.push({ field: 'description', msg: 'Please enter the description'});
            
        if (tags.length == 0)
            errors[0]['tags'] = { msg: 'Please enter some tags' };
            // errors.push({ field: 'tags', msg: 'Please enter some tags'});
            
        if(tags.length > 5)
            errors[0]['tags'] = { msg: 'You cant enter more then 5 tags' };
            // errors.push({ field: 'tags', msg: 'You cant enter more then 5 tags'});
            
        if (tags.length > 0 && tags.length < 5 ) {
            // tags = tags.split(',');
            let i = 0,
            tagIsOk = true;
            do {
                tagIsOk = tags[i].trim().length > 15 ? false : true;
                i = i + 1;
            } while (tagIsOk && i < tags.length);
                
            if (!tagIsOk)
                errors[0]['tags'] = { msg: 'Tag must not contain more then 15 chars' };
        }
        
        if (!category)
            errors[0]['category'] = { msg: 'Please choose a category' };
            // errors.push({ field: 'category', msg: 'Please choose a category'});

            // console.log(errors)
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