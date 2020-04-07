import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Input from '../components/form/Input';


export default function AddProject() {

    const SUBMIT_PROJECT = gql`
        mutation SubmitProject($projectData: projectData)
        {
            submitProject(projectData: $projectData)
            {
                success
                error
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

    let [response, setResponse] = useState({success: false, error: null});

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
            setResponse({
                success: res.data.submitProject.success,
                error: res.data.submitProject.error  ? JSON.parse(res.data.submitProject.error)[0] : null
            });
        }).catch(err => {
            console.log('SUBMIT_PROJECT_ERROR: ', err)
        })
    }

    
    return (
        <React.Fragment>

            <div className='w-2/4 mx-auto'>
                {
                    response.success ?
                        <div className='bg-green-500 text-gray-300 p-2 rounded'> Project has been successfully submitted </div>
                    :
                        null
                }

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Project Title
                    </label>

                    <Input 
                        name='title'
                        changeEvent={inputChange}
                        submitRes={response}
                        type='text'
                        placeholder='e.g: eCommerce website, To-Do app, ...'
                    />
                    
                    {
                        response.error && response.error.title 
                        ?
                            <p className='text-red-500 text-xs mt-1'> {response.error.title.msg} </p>
                        : 
                            null
                    }
                </div>           

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Project links
                    </label>
                    <Input
                        name='preview'
                        changeEvent={inputChange}
                        submitRes={response}
                        type='text'
                        placeholder='preview link'
                    />

                    {
                        response.error && response.error.preview
                        ?
                            <p className='text-red-500 text-xs mt-1'> {response.error.preview.msg} </p>
                        :
                            null
                    }

                    <Input
                        name='github'
                        changeEvent={inputChange}
                        submitRes={response}
                        type='text'
                        className='mt-4'
                        placeholder='Github link'
                    />

                    {
                        response.error && response.error.github
                        ?
                            <p className='text-red-500 text-xs mt-1'> {response.error.github.msg} </p>
                        :
                            null
                    }
                </div>

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Tags
                    </label>
                    <Input
                        name='tags'
                        changeEvent={inputChange}
                        submitRes={response}
                        type='text'
                        placeholder='e.g: MySQL, Express.js, Java, Python, ...'
                    />

                    {
                        response.error && response.error.tags 
                        ?
                            <p className='text-red-500 text-xs mt-1'> {response.error.tags.msg} </p>
                        : 
                            null
                    }
                </div>

                <div className="mb-10">
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Category
                    </label>
                    <select onChange={inputChange('category')} 
                        className={`block appearance-none w-full bg-gray-700 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow text-gray-200 leading-tight focus:bg-gray-800 focus:border-gray-500 
                        ${response.error && response.error.tags ? 'border-red-500': null}`} 
                        name='category'
                    >
                        <option value=''>Select project category</option>
                        <option value='Web App'>Web App</option>
                        <option value='Mobile App'>Mobile App</option>
                        <option value='Machine Learning'> Machine Learning </option>
                        <option value='Helpful module'> Helpful module </option>
                        <option value='Other'> Other </option>
                    </select>
                    {
                        response.error && response.error.category 
                        ?
                            <p className='text-red-500 text-xs mt-1'> {response.error.category.msg} </p>
                        :
                            null
                    }
                </div>

                <div className='mb-10'>
                    <label className="block text-gray-500 font-bold mb-1 pr-4">
                        Description
                    </label>
                    <textarea rows='4' onChange={inputChange('description')} 
                        className={`bg-gray-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-800 focus:border-gray-500 
                        ${response.error && response.error.category ? 'border-red-500': null}`} 
                    type="text" placeholder='describe your application, challenges you passed...'></textarea>

                    {
                        response.error && response.error.description 
                        ?
                            <p className='text-red-500 text-xs mt-1'> {response.error.description.msg} </p>
                        : 
                            null
                    }
                </div>

                <button type='button' onClick={handleProjectSubmission} className='mt-16 p-3 shadow-md bg-blue-900 text-gray-300 hover:bg-gray-800 rounded text-center w-full block border border-gray-700 font-bold'> Add My Project </button>
            </div>

        </React.Fragment>
    );
}