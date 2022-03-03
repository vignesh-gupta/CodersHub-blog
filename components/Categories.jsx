import React , { useState , useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { titleCase } from '../pages/api/hello'

const Categories = () => {
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    getCategories()
      .then((newCategories)=> setCategories(newCategories))
  }, [])
  
  
  return (
    <div className='bg-[#333232] shadow-lg rounded-lg p-8 mb-12 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-white'>
        Categories
      </h3>
      {categories.map(category=>(
        <Link key={category.slug} href={`/category/${category.slug}`} >
          <span className='cursor-pointer block pb-3 mb-3 text-white'>
            {titleCase(category.name)}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories