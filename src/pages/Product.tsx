import Link from "next/link";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSort, setSort] =useState(false);
  const getProducts = async () => {
    setLoading(true);
    let tmp = [];
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    tmp = data.products;
    console.log(tmp);
    setProducts(tmp);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);
  async function checkdata() {
    setSort(!isSort);
  }
  if (isLoading) return "Fetching Data ...";
  return (
    <>
      <div className="product-desc center">
        <input type="text" className="s-bar " placeholder="Search..." />
         <div>Sort by Price </div> <button onClick={() => setSort(!isSort)}>{(isSort?'ASC':'DESC')}</button>
      </div>
      <section className="product-item">
        {products.map((val) => (
          <div key={val.id} className="sc-item">
            <div>
              <img src={val.thumbnail} width={250} />
            </div>
            <div>
              <div className="item-title">{val.title}</div>
              <div className="item-price">Price : {val.price}</div>
              <div>Description:</div>
              <div className="item-desc">{val.description}</div>
              <div>
                <Link href={`product/${val.id}`}>Detail...</Link>{" "}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
