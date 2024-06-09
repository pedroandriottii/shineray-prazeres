import * as React from "react"
import Image from "next/image"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import Link from "next/link"

export function DynamicCarousel() {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                <CarouselItem>
                    <Image
                        src={'/jef.jpg'}
                        width={100}
                        height={100}
                        alt="Jef"
                        className="w-full" />
                    <div className='flex  justify-between w-full p-4'>
                        <h1>JEF-150 2024</h1>
                        <h1>R$ 10.000,00</h1>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <Image
                        src={'/shi.jpg'}
                        width={100}
                        height={100}
                        alt="Jef"
                        className="w-full" />
                    <div className='flex justify-between w-full p-4'>
                        <h1>SHI-1502024</h1>
                        <h1>R$ 10.000,00</h1>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <Link href={'/catalogo'}>
                        <div className="relative w-full">
                            <Image
                                src="/shi.jpg"
                                layout="responsive"
                                width={100}
                                height={100}
                                alt="Jef"
                                className="w-full filter brightness-50"
                            />
                            <button className="absolute inset-0 flex items-center justify-center text-white">
                                Ver Todo o Catálogo
                            </button>
                        </div>
                    </Link>
                </CarouselItem>
            </CarouselContent>
        </Carousel >
    )
}
