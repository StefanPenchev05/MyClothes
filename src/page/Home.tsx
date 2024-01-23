import '../components/Home/Home.css'
import { useEffect, useRef } from 'react'
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import data from '../components/Home/aboutUs.json'

import StefanAvatar from '../assets/images/StefanPenchev.jpeg'
import DanielAvatar from '../assets/images/DanielGeorgiev.jpg'
import homeWallpaper from '../assets/images/homeWallpaper.jpg'

import Card from '../components/Home/UI/Card';
import PostCard from '../features/Products/PostCard';

function Home() {

  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const textElement = textRef.current;
    const handleAmimationEnd = () => {
      sectionRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    textElement?.addEventListener('animationend', handleAmimationEnd);

    return () => {
      textElement?.removeEventListener('animationend', handleAmimationEnd);
    }
  }, [])

  return (
    <section className='flex h-screen flex-col'>
      <div className='w-full flex justify-center'>
       <div className='relative w-full'>
          <img src={homeWallpaper} alt="homeWallpaper" className='w-full h-full' />
          <div className='absolute top-0 left-0 w-full h-1/2 flex justify-center items-center'>
            <p ref={textRef} className='text-4xl font-bold text-white animate-fade-in'>{t('home.Welcome to DesignerZone')}</p>
          </div>
       </div>
      </div>
      <section ref={sectionRef} className=' bg-transparent'>
        <div className='w-full flex justify-center items-center flex-col bg-blue-500 p-10'>
          <Typography variant='h4' className='text-white'>{t('home.About Us')}</Typography>
          <Typography variant='body1' className='text-white mt-4 text-center'>
            {t('home.We are a team of passionate individuals dedicated to providing the best service possible. Our goal is to exceed your expectations and ensure your satisfaction.')}
          </Typography>
        </div>
        <div className='flex justify-around mt-10'>
         <Card
          name='Stefan Penchev'
          avatar={StefanAvatar}
          bio='Greetings! I am Stefan, a seasoned programmer currently affiliated with Mathetaic High School. With a rich history spanning 9 years, I harm ve honed my skills in various programming languages, navigating through the intricate landscapes of software development.'
          title='Full-stack Developer'
          email='penchev.stefan@icloud.com'
          languages={data.StefanPenchev}
          experience='9 years'
         />
         <Card
          name='Daniel Georgiev'
          avatar={DanielAvatar}
          bio='Hello, I am Stefan. I am a programmer in Mathetaic High School, I have 9 years of experience in programming in different languages.'
          title='Full-stack Developer'
          email='danielgeorgievv07@gmail.com'
          languages={data.DanielaGeorgiev}
          experience='3 years'
         />
        </div>
      </section>
      <section className='w-full flex justify-center items-center flex-col bg-blue-500 p-10'>
      <Typography variant='h4' className='text-white'>{t('home.Products')}</Typography>
      <Typography variant='body1' className='text-white mt-4 text-center'>
        {t('home.Our products are crafted with precision and love. We offer a wide range of solutions tailored to your needs.')}
      </Typography>
        <PostCard />
      </section>
    </section>
  )
}

export default Home