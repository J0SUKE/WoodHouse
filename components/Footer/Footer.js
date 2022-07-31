import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
        <div className='w-[100%] border-t border-border grid grid-areas-footer'>
            <div className='border-r border-border grid-in-div1'>
                <a href='https://www.houseplant.com' target='_blank' rel="noreferrer">
                    <div className='border-b border-border uppercase text-titles font-[700] pl-[.5rem] text-[clamp(2rem,4vw,2.5rem)] tracking-tighter'>inspiration</div>
                </a>
                <a href='https://github.com/J0SUKE/WoodHouse' target='_blank' rel="noreferrer"> 
                    <div className='border-b border-border uppercase text-titles font-[700] pl-[.5rem] text-[clamp(2rem,4vw,2.5rem)] tracking-tighter'>project</div>
                </a>    
                <a href='https://jeanmazouni.com' target='_blank' rel="noreferrer">
                    <div className='border-b border-border uppercase text-titles font-[700] pl-[.5rem] text-[clamp(2rem,4vw,2.5rem)] tracking-tighter'>developer</div>
                </a>
                <a href='https://blog.jeanmazouni.com' target='_blank' rel="noreferrer">
                    <div className='border-b border-border uppercase text-titles font-[700] pl-[.5rem] text-[clamp(2rem,4vw,2.5rem)] tracking-tighter'>blog</div>
                </a>                
            </div>
            <div className='grid-in-div2 border-b border-border flex items-center justify-center'>
                <ul className='flex flex-col sm:flex-row w-[50%] items-center justify-between'>
                    <li>
                        <a href='https://twitter.com/Jean_mazouni' target={'_blank'} rel="noreferrer">
                            <Image
                                src={'/images/twitter.svg'}
                                alt={'twitter'}
                                height={30}
                                width={30}
                            />
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/J0SUKE' target={'_blank'} rel="noreferrer">
                            <Image
                                src={'/images/github.svg'}
                                alt='github'
                                height={30}
                                width={30}
                            />
                        </a>
                    </li>
                    <li>
                        <a href='mailto:jeanmazouni@gmail.com' target={'_blank'} rel="noreferrer">
                            <Image
                                src={'/images/email.svg'}
                                alt='email'
                                height={30}
                                width={30}
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className='uppercase text-titles tracking-tighter font-[700] text-[16vw] overflow-hidden'>
            woodhouse
        </div>
    </footer>
  )
}
