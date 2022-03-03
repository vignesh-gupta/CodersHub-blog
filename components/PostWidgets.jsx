import React , {useState , useEffect} from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPost , getSimilarPosts } from '../services';

const PostWidgets = ({categories , slug}) => {

  const [relatedPost , setRelatedPost] = useState([]);
  
  useEffect(() => {
    if(slug){
      getSimilarPosts(categories , slug)
      .then((result)=>setRelatedPost(result))
    }else{
      getRecentPost()
      .then((result)=>setRelatedPost(result))
    }
  }, [slug])
  

  return (
    <div className='bg-[#333232] shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-white'>
        {slug? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPost.map(post=>(
        <div key={post.title} className='flex item-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img 
              alt={post.title}
              height='100px'
              width='60px'
              className='align-middle rounded-full'
              src={post.featuredImage.url}
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 font-xs'> {moment(post.createdAt).format('MMM DD, YYYY')} </p>
            <p className='text-md text-white'> <Link href={`/post/${post.slug}`} >{post.title}</Link> </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidgets