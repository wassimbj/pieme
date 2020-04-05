import React, { useState} from 'react';
import { AuthConsumer } from '../helpers/AuthContext';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ProjectCard from '../components/project/ProjectCard';
import SkeletonProjectCard from '../components/project/SkeletonProjectCard';

function Home() {

    let [noMoreProjects, setNoMoreProjects] = useState(false);


    let GET_PROJECTS = gql`
        query 
            GetProjects($skip: Int!)
            {
                projects(skip: $skip)
                {
                    id
                    title
                    links {
                        preview
                        github
                    }
                    description
                    tags
                    category
                    # image
                    author {
                        name
                        image
                    }
                    created_at
                }
            }
        
    `;

    // let state = {

    // }

    let skip = 0;
    let { loading, error, data, fetchMore } = useQuery(GET_PROJECTS, {
        variables: {skip}
    });

    // Load more projects
    const loadMoreProjects = () => {
        skip = data.projects.length;

        fetchMore({
            variables: {skip},
            updateQuery: (prevData, {fetchMoreResult}) => {
                // console.log(fetch)
                if(!fetchMoreResult){
                    return prevData;
                }
                return Object.assign({}, {
                    projects: [...prevData.projects, ...fetchMoreResult.projects]
                });
            }
        }).then(fetchedData => {
            if(fetchedData.data.projects.length == 0)
                setNoMoreProjects(true)
        }).catch(e => {
            console.error('LOAD_MORE_ERROR: ', e)
            alert('An error occured, i will fix it soon :)')
        })
    }

    return (
        <AuthConsumer>
            {(value) => {
                return (
                    <div className='mt-5 flex justify-center'>
                        <div className='w-full lg:w-3/5 sm:w-full lg:mx-5 sm:mx-0'>
                        {
                            loading || data == undefined 
                            ?
                                <React.Fragment>
                                    <SkeletonProjectCard />
                                    <SkeletonProjectCard />
                                </React.Fragment>
                            : data.projects.length > 0 ?
                                data.projects.map((project, i) => (
                                    <ProjectCard key={i} project={project} />
                                )) 
                            :
                                <p> No projects </p>
                        }

                        {
                                !noMoreProjects
                                ?
                                    <button onClick={loadMoreProjects} className='mx-auto block bg-gray-900 text-gray-500 rounded border border-gray-600 px-3 py-2 mt-5'>
                                        Load more...
                                    </button>
                                :
                                    <div className='rounded-lg text-center block mt-10 bg-gray-800 text-gray-700 p-2 font-bold text-lg'>
                                        No more projects
                                    </div>
                        }

                        </div>

                        {/* <div className='lg:w-2/6 hidden lg:block'>
                            <div className='bg-gray-900 p-2 rounded-lg'> Hello </div>
                        </div> */}
                    </div>
                )
            }}
        </AuthConsumer>
    );
}

export default Home;
