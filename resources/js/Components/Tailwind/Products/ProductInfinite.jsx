import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { useEffect, useRef, useState } from "react";
import CardHoverBtn from "./Components/CardHoverBtn";
import { adjustTextColor } from "../../../Functions/adjustTextColor";

const ProductInfinite = ({ items, data, setCart, cart }) => {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    // Ajuste de colores para los botones
    useEffect(() => {
        if (navigationPrevRef.current) adjustTextColor(navigationPrevRef.current);
        if (navigationNextRef.current) adjustTextColor(navigationNextRef.current);
    }, []);

    // Actualizar navegación cuando la instancia de Swiper esté lista
    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.params.navigation.prevEl = navigationPrevRef.current;
            swiperInstance.params.navigation.nextEl = navigationNextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    return (
        <section className="relative bg-sections-color">
            <div className="relative mx-auto px-[5%] py-[2.5%]">
                {/* Header */}
                <div className="md:flex justify-between items-center mb-8 pb-4 border-b customborder-neutral-light">
                    <h2 className="text-[28px] md:text-4xl font-bold font-font-secondary mb-4 md:mb-0 animate-fadeIn">
                        {data?.title}
                    </h2>
                    <a
                        href={data?.link_catalog}
                        className="bg-primary transition-all duration-300 text-white border-none flex justify-center flex-row items-center gap-3 px-10 py-4 text-base rounded-xl tracking-wide font-bold cursor-pointer hover:opacity-90 hover:scale-105 animate-slideIn"
                    >
                        Ver todos
                        <Tag width="1rem" className="rotate-90 animate-bounce" />
                    </a>
                </div>

                {/* Swiper Carousel */}
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Grid]}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                            enabled: true,
                        }}
                        spaceBetween={16}
                        slidesPerView={2}
                        grid={{
                            rows: 3,
                            fill: 'row'
                        }}
                        loop={true}
                        onSwiper={setSwiperInstance}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3, grid: { rows: 1 } },
                            1024: { slidesPerView: 4, grid: { rows: 1 } },
                            1280: { slidesPerView: 5, grid: { rows: 1 } },
                        }}
                        className="lg:h-[500px] lg:max-h-[500px] lg:!flex lg:items-center lg:justify-center animate-fadeIn"
                    >
                        {items.map((product, index) => (
                            <SwiperSlide
                                key={index}
                                className="!h-full lg:!flex lg:items-center lg:justify-center animate-slideIn"
                            >
                                <CardHoverBtn
                                    product={product}
                                    setCart={setCart}
                                    cart={cart}
                                    data={data}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons - Desktop */}
                    <div className="hidden md:block">
                        <button
                            ref={navigationPrevRef}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition-all duration-300 bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transform hover:-translate-x-1"
                            aria-label="Productos anteriores"
                        >
                            <ChevronLeft width="1.2rem" className="animate-pulse" />
                        </button>
                        <button
                            ref={navigationNextRef}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition-all duration-300 bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transform hover:translate-x-1"
                            aria-label="Siguientes productos"
                        >
                            <ChevronRight width="1.2rem" className="animate-pulse" />
                        </button>
                    </div>

                    {/* Navigation Buttons - Mobile */}
                    <div className="md:hidden flex justify-end gap-2 mt-4">
                        <button
                            ref={navigationPrevRef}
                            className="z-10 w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition-all duration-300 bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                            aria-label="Productos anteriores"
                        >
                            <ChevronLeft width="1.2rem" className="animate-pulse" />
                        </button>
                        <button
                            ref={navigationNextRef}
                            className="z-10 w-10 h-10 flex items-center justify-center rounded-lg shadow-lg transition-all duration-300 bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                            aria-label="Siguientes productos"
                        >
                            <ChevronRight width="1.2rem" className="animate-pulse" />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in;
                }
                .animate-slideIn {
                    animation: slideIn 0.5s ease-out;
                }
            `}</style>
        </section>
    );
};

export default ProductInfinite;
