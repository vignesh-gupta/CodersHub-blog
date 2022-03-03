import React , { useState , useEffect } from 'react';
import Link from 'next/link';
import logo from '../images/CODERSHUB-withName.png'
import Image from 'next/image';
import { getCategories } from '../services';
import { titleCase } from '../pages/api/hello'


const Header = () => {
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    getCategories()
      .then((newCategories)=> setCategories(newCategories))
  }, [])
  return (
    <div className='container mx-auto px-10 mb-8 top-0'>
      <div className='border-b w-full inline-block border-orange-400 pt-6 pb-3'>
        <div className='md:float-left block'>
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl text-orange-400'>
              <Image src={logo} height={40} width={250} className='object-cover'/>
            </span>
          </Link>
        </div>
        <div className='hidden md:contents md:float-left'>
          {categories.map(category=>(
            <Link key={category.slug} href={`category/${category.slug}`}>
              <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                {titleCase(category.name)}
              </span>
            </Link> 
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Header