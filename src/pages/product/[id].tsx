import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
export default function DetailProduct({data}) {
    
    return(<>
<div >
    <Swiper 
      spaceBetween={50}
      slidesPerView={1}
    >
        {
            data.images.map((val) =>(
                <SwiperSlide > <img src={val} width={350}/></SwiperSlide> 
            ))
        }
    </Swiper>
    <center>...</center>
</div>
        <section  className="detail-page">
            {/* <div><img src={data.thumbnail} width={350}/></div> */}
            <div className="product-title">{data.title}</div>
            <div className="product-desc">{data.description}</div>
            <div className="product-item">Price: {data.price}
                 
            </div>
        </section> </>
    )
}
export async function getServerSideProps(context){
    const { query: {id}} = context
    const response  =  await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    console.log("id ", id)
    console.log("data ", data)
    return {
        props: {data}
    }
}