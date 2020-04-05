import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


export default function AddProject() {

    const SUBMIT_PROJECT = gql`
        mutation SubmitProject($projectData: projectData)
        {
            submitProject(projectData: $projectData)
            {
                success
                error {
                    field
                    msg
                }
            }
        }
    
    `;


    let [projectData, setProjectData] = useState({
        title: '',
        // links: {
        preview: '',
        github: '',
        // },
        tags: '',
        category: '',
        description: ''
    });

    let [error, setError] = useState({success: false});

    const inputChange = name => e => {
        let val = e.target.value;
        setProjectData(prev => ({
            ...prev,
            [name]: val
        }))
    }
    
    const [submitProject] = useMutation(SUBMIT_PROJECT);

    const handleProjectSubmission = () => {
        // console.log(projectData);
        const {title, preview, github, tags, category, description} = projectData;
        let links = {};
        let tagsArray = [];
        
        // Convert tags to an array
        if(tags)
            tagsArray = tags.replace(/ /g, '').split(',');
        if(github || preview)
            links = {preview, github};

        // console.log(projectData, tagsArray);

        submitProject({
            variables: {
                projectData: {
                    title,
                    links,
                    tags: tagsArray,
                    category,
                    description
                }
            }
        }).then(res => {
            // console.log('RES: ', res.data.submitProject)
            setError(res.data.submitProject);
        }).catch(err => {
            console.log('SUBMIT_PROJECT_ERROR: ', err)
        })
    }

    
    return (
        <React.Fragment>

            <div className='w-2/4 mx-auto'>
                {
                    error.success ?
                        <div className='bg-green-500 text-gray-300 '> Project has been successfully submitted </div>
                    :
                        null
                }

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Project Title
                    </label>
                    <input onChange={inputChange('title')} className="bg-gray-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500" type="text" placeholder='e.g: eCommerce website, ...' />
                    
                </div>            

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Project links
                    </label>
                    <input onChange={inputChange('preview')} className="bg-gray-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500" type="text" placeholder='Preview link' />

                    <input onChange={inputChange('github')} className="mt-2 bg-gray-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500" type="text" placeholder='Github link' />
                </div>

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Tags
                    </label>
                    <input onChange={inputChange('tags')} className="bg-gray-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500" type="text" placeholder='enter tags seperated by comma (,) e.g: express.js, GraphQL, mongodb' />
                </div>

                <div className="mb-10">
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Category
                    </label>
                    <select onChange={inputChange('category')} className="block appearance-none w-full bg-gray-700 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow text-gray-200 leading-tight focus:bg-gray-800 focus:border-gray-500" name='category'>
                        <option value=''>Select project category</option>
                        <option value='Web App'>Web App</option>
                        <option value='Mobile App'>Mobile App</option>
                        <option value='Machine Learning'> Machine Learning </option>
                        <option value='Helpful module'> Helpful module </option>
                        <option value='Other'> Other </option>
                    </select>
                </div>

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Description
                    </label>
                    <textarea rows='4' onChange={inputChange('description')} className="bg-gray-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500" type="text" placeholder='describe your application, challenges you passed...'></textarea>
                </div>

                <button type='button' onClick={handleProjectSubmission} className='mt-16 p-3 shadow-md bg-blue-900 text-gray-300 hover:bg-gray-800 rounded text-center w-full block border border-gray-700 font-bold'> Add My Project </button>
            </div>

        </React.Fragment>
    );
}