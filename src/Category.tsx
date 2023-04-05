import { useEffect, useState } from 'react';
import Product from './components/Product';
import Loading from './Loading';
import axios from 'axios';

function Category() {
  const [scrollPercentageChange, setScrollPercentageChange] = useState(0);
  console.log(scrollPercentageChange);
  const [clickMode, setClickMode] = useState(true);
  const [gridMode, setGridMode] = useState('grid-cols-2');
  const [clickMode2, setClickMode2] = useState(true);
  const [gridMode2, setGridMode2] = useState('grid-cols-1');
  useEffect(() => {
    const handleScroll = () => {
      setScrollPercentageChange(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    // window.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('mouseover', handleHover)
    };
  }, []);
  // console.log(gridMode)
  const baseURL = 'http://localhost:5500/src/static/data/productsData.json';
  const [post, setPost] = useState<any>();
  // console.log(post)
  useEffect(() => {
    axios.get(baseURL).then(response => {
      setPost(response.data);
    });
  }, []);

  if (!post) return <Loading />;
  const products = post;
  const listItems = products.map((product: any) => (
    <Product
      key={product.productId}
      name={product.name}
      price={product.price}
      imageOne={product.image[0]}
      imageTwo={product.image[1]}
      size={product.size}
    />
  ));
  const handleClickMode1 = () => {
    setClickMode(true);
    setGridMode('grid-cols-2');
    // console.log(gridMode)
  };
  const handleClickMode2 = () => {
    setClickMode(false);
    setGridMode('grid-cols-3');
    // console.log(gridMode)
  };
  const handleClickMode3 = () => {
    setClickMode2(true);
    setGridMode2('grid-cols-1');
    // console.log(gridMode)
  };
  const handleClickMode4 = () => {
    setClickMode2(false);
    setGridMode2('grid-cols-2');
    // console.log(gridMode)
  };
  return (
    <>
      <div className="">
        <div className="sort fixed left-0 right-0 z-30 bg-white">
          <div className="flex flex-row-reverse md:flex-row lg:flex-row">
            <div className="flex grid basis-1/3 content-center justify-center border-2 lg:basis-1/6">
              <div className="flex justify-between">
                <img
                  onClick={handleClickMode1}
                  src="https://cdn-icons-png.flaticon.com/512/238/238910.png"
                  alt=""
                  className={`mr-5 h-5 cursor-pointer ${
                    clickMode ? 'opacity-100' : 'opacity-50'
                  } hidden md:block lg:block`}
                />
                {/* https://cdn1.iconfinder.com/data/icons/griddler-layouts/100/layout-display-view-grid-4x4-512.png */}
                <img
                  onClick={handleClickMode2}
                  src="https://cdn-icons-png.flaticon.com/512/3603/3603178.png"
                  alt=""
                  className={`h-5 cursor-pointer ${
                    clickMode ? 'opacity-50' : 'opacity-100'
                  } hidden md:block lg:block`}
                />
                <img
                  onClick={handleClickMode3}
                  src="https://cdn-icons-png.flaticon.com/512/25/25394.png"
                  alt=""
                  className={`mr-5 h-5 cursor-pointer ${
                    clickMode2 ? 'opacity-100' : 'opacity-50'
                  } block md:hidden lg:hidden`}
                />
                <img
                  onClick={handleClickMode4}
                  src="https://cdn-icons-png.flaticon.com/512/238/238910.png"
                  alt=""
                  className={`h-5 cursor-pointer ${
                    clickMode2 ? 'opacity-50' : 'opacity-100'
                  } block md:hidden lg:hidden`}
                />
              </div>
            </div>
            <div className="flex grid basis-0 content-center justify-center border-t-2 border-b-2 md:block md:basis-full lg:block lg:basis-full"></div>
            <div className="flex basis-1/3 justify-center border-2 lg:basis-1/6">
              <p className="font-light">Sort</p>{' '}
              <img
                src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
                alt=""
                className="ml-3 w-5"
              />
            </div>
            <div className="block flex grid basis-1/3 content-center justify-center border-2 lg:hidden lg:basis-1/6">
              <span className="font-light">Filter</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="sticky top-0 hidden h-screen basis-1/6 bg-neutral-600 lg:block">
          <div
            className={`${
              scrollPercentageChange >= 2012 ? `` : `fixed`
            } grid h-full content-center`}
          >
            <label className="uppercase">product type</label>
            <ul className="capitalize">
              <li>hoodies</li>
              <li>long sleeves</li>
              <li>outerwear</li>
              <li>short sleeves</li>
              <li>tanks</li>
            </ul>
            <label className="uppercase">activity</label>
            <ul className="capitalize">
              <li>rec</li>
              <li>train</li>
              <li>pro</li>
            </ul>
            <label className="uppercase">color type</label>
            <ul className="capitalize">
              <li>black</li>
              <li>blue</li>
              <li>brown</li>
              <li>pink</li>
              <li>grey</li>
              <li>off-white</li>
              <li>red</li>
              <li>white</li>
            </ul>
          </div>
        </div>
        <div
          className={`grid w-full basis-auto ${gridMode2} md:${gridMode} lg:${gridMode} bg-neutral-400`}
        >
          {listItems}
        </div>
      </div>
    </>
  );
}

export default Category;
