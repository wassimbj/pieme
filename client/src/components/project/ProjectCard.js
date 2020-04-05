import React, { useState } from 'react';
import { config } from './../../config/config';
import {GitHub, ExternalLink} from 'react-feather';
import timeAgo from 'nta';

export default function ProjectCard({project}) {

    let max_to_read = 50;
    let [MaxDescToRead, setMaxDescToRead] = useState(max_to_read);

    const toggleExpandDescription = (action) => {
        if (action == 'less')
            setMaxDescToRead(max_to_read);
        else
            setMaxDescToRead(project.description.length);
    }

    return (
        <div>
            <div className='bg-gray-800 shadow-md border border-gray-600 p-3 rounded-lg my-5'>

                <div className='mb-3 flex items-center justify-between'>
                    <div>
                        <span className='inline-block m-2 mt-0 bg-black px-3 py-1 rounded-full text-gray-600'>
                            {project.category}
                        </span>
                        {
                            project.tags
                                ?
                                project.tags.map((tag, i) => (
                                    <span key={i} className='inline-block m-2 mt-0 bg-gray-700 px-3 py-1 rounded-full text-gray-500'>
                                        {tag}
                                    </span>
                                ))
                                :
                                null
                        }
                    </div>
                    <span className='block text-sm text-gray-600 ml-2'>
                        {timeAgo(new Date(Number(project.created_at)), 'en', 'ago')}
                    </span>
                </div>                
                
                <div className='flex items-center'>
                    <img src={`${config.server_url}${project.author.image}`} className='rounded-full w-12 h-12 p-2' />
                    <span className='text-gray-600'> {project.author.name} </span>
                </div>

                <div className='pl-3 mt-3'>
                    <span className='font-bold text-xl text-gray-400 text-center'> {project.title} </span>
                    <div className='p-2'>
                    {
                        project.description.length <= max_to_read ?
                            <p> {project.description} </p>
                        : project.description.length == MaxDescToRead ? 
                            <p>
                                {project.description}.
                                <button className='text-gray-400 cursor-pointer text-xs hover:text-gray-300 ml-2 border-b border-gray-600' onClick={() => toggleExpandDescription('less')}> Less </button>
                            </p>
                        : 
                            <p>
                                {project.description.substr(0, MaxDescToRead) + '...'}
                                <button className='text-gray-400 cursor-pointer text-xs hover:text-gray-300 ml-2 border-b border-gray-600' onClick={() => toggleExpandDescription('more')}> Read more </button>
                            </p>
                    }
                    </div>
                </div>

                {
                    project.links
                    ? 
                        <div className='flex items-center mt-2'>
                           {
                                project.links.preview ?
                                    <a href={`${project.links.preview}`} className='inline-block p-2 bg-gray-700 text-gray-500 rounded-full mx-2 text-sm' rel="noopener noreferrer" target='_blank'>
                                        <ExternalLink size='20' />
                                    </a>
                                : null
                           }
                           {
                               project.links.github ?
                                    <a href={`${project.links.github}`} className='inline-block p-2 bg-gray-700 text-gray-500 rounded-full mx-2 text-sm' rel="noopener noreferrer" target='_blank'>
                                        <GitHub size='20' />
                                    </a>
                                : null
                           }

                        </div>
                    :
                        null
                }

                <div className='flex items-center flex-wrap mt-4 border-t border-gray-900 pt-3'>
                    <span className='m-2 py-1 px-3 bg-gray-700 text-green-400 rounded-full cursor-pointer hover:bg-gray-900'> Great work </span>
                    <span className='m-2 py-1 px-3 bg-gray-700 text-red-400 rounded-full cursor-pointer hover:bg-gray-900'> Love it </span>
                    <span className='m-2 py-1 px-3 bg-gray-700 text-blue-400 rounded-full cursor-pointer hover:bg-gray-900'> Well done </span>
                    <span className='m-2 py-1 px-3 bg-gray-700 text-yellow-400 rounded-full cursor-pointer hover:bg-gray-900'> WOW </span>
                </div>

                
            </div>
        </div>
    )
}
