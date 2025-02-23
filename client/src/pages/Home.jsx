import React from 'react'
import auctionPng from '../assets/auction.png';
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
        <div className='bg-white w-full h-auto rounded-3xl shadow-md '>
            <div className='w-full flex p-10 px-20 items-center'>
                <div className='w-[70%] flex flex-col gap-6'> 
                    <h1 className='font-mono text-[4rem] font-extrabold uppercase'>Welcome to Auctioneer</h1>
                    <p className=' mr-20 pr-10 text-justify text-[16px] font-medium'>
                    Discover a world of unique treasures and unbeatable deals at Auctioneer! Our platform 
                    is designed to make online auctions simple, secure, and exciting for everyone. Whether you're 
                    a seasoned collector, a bargain hunter, or someone looking to sell items, our user-friendly 
                    interface ensures a seamless experience. With a wide range of categories—from electronics and 
                    fashion to art and collectibles—you'll find something that catches your eye. Our robust search 
                    and filtering tools make it easy to explore, while real-time bidding keeps the thrill alive. 
                    Join our growing community today and experience the joy of winning amazing items at great 
                    prices!
                    </p>

                    <div className='flex items-center gap-6 mt-5'>
                        <Link className='bg-[#2973B2] text-white font-medium text-lg px-6 py-3 rounded-lg
                        transition-all duration-300 hover:bg-blue-600' to="/login">
                            Get Started!
                        </Link>

                        <Link className='flex items-center gap-2 text-blue-600 font-medium text-lg'
                        to="/auctions">
                            View Active Auctions
                            <BsArrowRightShort />
                        </Link>
                    </div>
                </div>

                <div className='w-[30%]'>
                    <img src={auctionPng} alt='auctionPng' className='w-full h-full object-cover' loading='lazy'/>
                </div>
            </div>
        </div>

        <div className='bg-white w-full h-auto rounded-3xl shadow-md '>
            <div className='flex flex-col gap-6 items-center w-full px-20 py-10'>

                <h1 className='text-[4rem] font-bold'>Active Auctions</h1>
                <p className='text-[2.5rem] font-mono'>No Active Auctions Right now!!</p>

            </div>
        </div>

        <div className='bg-[#2973B2] w-full h-auto rounded-3xl shadow-md '>
            <div className='flex flex-col text-white gap-6 items-center w-full px-20 py-10'>

                <h1 className='text-[4rem] font-bold'>Footer</h1>
                <p className='text-[2.5rem] font-mono'>Not Ready yet!! </p>

            </div>
        </div>
    
    </>
  )
}

export default Home
