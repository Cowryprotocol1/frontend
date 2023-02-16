import React from 'react';
import Image from 'next/image';
import { FaCamera }  from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import type { NextPageWithLayout } from "../../pages/_app";

type AvatarProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  editBg: string;
  onClick?: () => void; 
}
const  Avatar: NextPageWithLayout<AvatarProps> = ({ src, alt, className, width=70, height=70, editBg, onClick }) => {

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onClick={onClick}
      />
      <span className={`${editBg} -mt-8 ml-4 p-2 rounded-full`}>
      <FaCamera size={15} className="text-white_day"/>
      </span>
      
    </div>
  )
}
Avatar.getLayout = (page) => <Layout>{page}</Layout>;
export default React.memo(Avatar);