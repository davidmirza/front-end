import Link from "next/link";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSort, setSort] = useState(false);
  const [slcCat, setSclCat] = useState("");
  const getProducts = async () => {
    setLoading(true);
    let tmp = [];
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    tmp = data.products;
    setProducts(tmp);
    setLoading(false);
  };
  const getProductsCat = async (categori) => {
    setLoading(true);
    let tmp = [];
    const response = await fetch(
      `https://dummyjson.com/products/category/${categori}`
    );
    const data = await response.json();
    tmp = data.products;
    console.log(tmp);
    setProducts(tmp);
    setLoading(false);
  };
  const getCategory = async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const ctg = await response.json();
    setCategory(ctg);
  };
  useEffect(() => {
    getProducts();
    getCategory();
  }, []);
  async function checkdata() {
    setSort(!isSort);
  }
  const CatChange = (event) => {
    setSclCat(event.target.value);
    getProductsCat(event.target.value);
  };
  const OrderBy_ = (e) => {
    setSort(!isSort);
    if (!isSort) {
      const sAsc = [...products].sort((a, b) => a.price - b.price);
      setProducts(sAsc);
    } else {
      const sDesc = [...products].sort((a, b) => b.price - a.price);
      setProducts(sDesc);
    }
  };
  if (isLoading) return "Fetching Data ...";
  return (
    <>
      <div className="product-desc center">
        Category{" "}
        <select onChange={CatChange}>
          {Category.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <div>| Sort by Price </div>{" "}
        <button onClick={OrderBy_}>{isSort ? "ASC" : "DESC"}</button>
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
