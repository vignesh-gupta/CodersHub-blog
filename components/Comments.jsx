import React , {useState , useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser';
import { getComments } from '../services';

const Comments = ({slug}) => {

  const [comments, setComments] = useState([])

  useEffect(()=>{
    getComments(slug)
      .then((result)=> {
        setComments(result)
        console.log(result);})
  },[])
  return (
    <>
      {comments.length>0 && (
        <div className='bg-[#333232] text-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length}
            {' '}
            Comments
          </h3>
          {comments.map((comment)=> (
            <div key={comment.createdAt} className='border-b border-gray-600 mb-4 pb-4'>
              <p className='mb-4'>
                <span className='font-semibold'>{comment.name}</span>
                {' '}
                on
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <blockquote className='bg-[#232322] bg-opacity-40 py-2 whitespace-pre-line text-gray-200 w-full ml-4 pl-3 border-l-4 border-gray-200'>{parse(comment.comment)}</blockquote>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments