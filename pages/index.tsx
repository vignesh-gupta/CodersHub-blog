import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard , PostWidgets , Categories } from '../components';
import { getPosts } from '../services'

const Home: NextPage<{ posts: [Post] }> = ({ posts }) => { 
  return (
  <div className="container mx-auto px-10 mb-8 ">
    <Head>
      <title>DUD3's Blog</title>
    </Head>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className='lg:col-span-8 col-span-1'>
        {posts.map((post , i ) => <PostCard post={post.node} key={i} />)}
      </div>
      <div className='lg:col-span-4 col-span-1 '>
        <div className="lg:sticky reative top-8">
          <PostWidgets categories={undefined} slug={undefined} />
          <Categories />
        </div>
      </div>
    </div>

  </div>
)}

export default Home;


// export default Home;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}