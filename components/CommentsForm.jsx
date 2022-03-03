import React , {useRef , useState , useEffect} from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  // const [localStorage , setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentsEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(()=>{
    nameEl.current.value=window.window.localStorage.getItem('name')
    emailEl.current.value=window.window.localStorage.getItem('email')
  },[])

  const handleCommentSubmission =() => {
    setError(false);

    const { value : comment } = commentsEl.current;
    const { value : name } = nameEl.current;
    const { value : email } = emailEl.current;
    const { checked : storeData } = storeDataEl.current;

    if(!comment || !name || !email){
      setError(true);
      return;
    }

    const commentObj = {name , email , comment , slug};
    
    if(storeData){
      window.localStorage.setItem('name' , name)
      window.localStorage.setItem('email' , email)
    }else {
      window.localStorage.removeItem('name' , name)
      window.localStorage.removeItem('email' , email)
    }

    submitComment(commentObj)
      .then((res)=>{
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000);
      })
  }

  return (
    <div className='bg-[#333232] text-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='tet-xl mb-8 font-semibold border-b pb-4'>Comments Form</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
          ref={commentsEl} 
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-[#232223] bg-opacity-60' 
          placeholder='Comment'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input 
          type='text' ref={nameEl}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-[#232223] bg-opacity-60'
          placeholder='Name'
          name='name'
        />
        <input 
            type='text' ref={emailEl}
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-[#232223] bg-opacity-60'
            placeholder='Email'
            name='email'
          />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input 
            ref={storeDataEl}
            type='checkbox' checked
            id='storeData'
            name='storeData'
            className='form-check-input appearance-none h-4 w-4 rounded-sm bg-white checked:bg-orange-600 checked:border-orange-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
          />
          <label className='text-gray-300 cursor-pointer ml-2' htmlFor='storeData'>Save my info for future comments</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required.</p>}
      <div className='mt-8'>
        <button 
          type='button' 
          onClick={handleCommentSubmission} 
          className='transition duration-500 ease hover:bg-orange-600 bg-orange-400  inline-block px-8 py-3 w-full  rounded-full text-lg font-semibold ' 
          >
          Send
        </button>
        {showSuccessMessage && <span className='text-xl text-center mt-4 text-green-500'>Comment submitted successfully!</span>}
 
      </div>
    </div>
  )
}

export default CommentsForm