import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Cover from '../components/Cover';
import Advertisement from '../components/Advertisement';
import DownloadApp from '../components/DownloadApp';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Collection } from '../app/types';

function HomePage() {
  const data = [
    {
      id: 1,
      src: 'https://asrv.com/cdn/shop/files/Summer-Banner.jpg',
      srcSmallScreen:
        'https://asrv.com/cdn/shop/files/Summer-Banner-Mobile.jpg',
      mainTitle: "SUMMER '23 COLLECTION",
      productListTitle: 'CORE COLLECTION',
      subTitle: '2023-06-12T08:00:00',
      firstButton: 'SHOP NOW',
      secondButton: null,
    },
    {
      id: 2,
      src: 'https://cdn.shopify.com/videos/c/o/v/a1e944e243cd4e06b50e5eebd96d0d2f.mp4',
      srcSmallScreen: 'https://asrv.com/cdn/shop/files/DSC00896.png',
      mainTitle: null,
      productListTitle: "SPRING '23 COLLECTION",
      subTitle: 'THE ART OF ADAPTATION',
      firstButton: 'SHOP NOW',
      secondButton: 'TUTORIAL',
    },
    {
      id: 3,
      src: 'https://asrv.com/cdn/shop/files/wide-boy-final.jpg',
      srcSmallScreen: 'https://asrv.com/cdn/shop/files/BF-Banner-Mobile.jpg',
      mainTitle: null,
      productListTitle: "WINTER '22 COLLECTION",
      subTitle: 'EXPLORE NATURE IN ITS HARSHEST FORM',
      firstButton: 'SHOP NOW',
      secondButton: 'LOOKBOOK',
    },
  ];
  const collections = useSelector(
    (state: RootState) => state.collection.collections,
  );
  return (
    <>
      <Navbar />
      {data.map((item: any, index) => (
        <Cover
          key={index}
          coverKey={index}
          src={item.src}
          srcSmallScreen={item.srcSmallScreen || item.src}
          mainTitle={item.mainTitle || item.productListTitle}
          productListTitle={item.productListTitle}
          subTitle={item.subTitle}
          firstButton={item.firstButton}
        />
      ))}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="order-last md:order-last lg:order-first">
          <img
            src="https://cdn.shopify.com/s/files/1/0297/6293/files/spring-app-banner-web2_1200x.png?v=1679009396"
            alt=""
          />
        </div>
        <div className="grid place-content-center">
          <h1 className="mb-3 text-center text-4xl font-bold text-gray-700 md:text-center lg:text-left">
            THE ASRV APP
          </h1>
          <h2 className="text-1xl mb-3 text-center font-light text-gray-500 md:text-center lg:text-left">
            DOWNLOAD FOR EARLY ACCESS AND EXCLUSIVE DROPS.
          </h2>
          <div className="mx-auto w-96 md:mx-auto lg:mx-0">
            <DownloadApp />
          </div>
        </div>
      </div>

      <div className="mx-auto">
        <Advertisement
          srcImg="https://cdn.shopify.com/s/files/1/0297/6293/files/phil-4_1800x.png?v=1678912482"
          adText="“ASRV exists for the individual who relentlessly chases the next challenge, in search of that beautiful place between pressure and ability, where we find our deepest sense of purpose.”"
          buttonText="new collection"
          isCenter
          isSmallText
          link={`/collections/${
            collections
              .find((item: Collection) => item.type === 'FEATURED')
              ?.name.replace(/\W+/gi, '-')
              .toLowerCase() || '/'
          }`}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Advertisement
            srcImg="https://asrv.com/cdn/shop/files/zach_mindset_750x960_crop_center.png"
            adText="TOPS"
            buttonText="explore"
            className="mt-2 mb-2 lg:mx-1"
            link={
              collections.find((item: Collection) => item.type === 'TOPS')
                ? collections
                    .find((item: Collection) => item.type === 'TOPS')!
                    .name.replace(/\W+/gi, '-')
                    .toLowerCase()
                : `/`
            }
          />
          <Advertisement
            srcImg="https://asrv.com/cdn/shop/files/omar_cycle.png"
            adText="BOTTOMS"
            buttonText="explore"
            className="mb-2 lg:mx-1 lg:mt-2"
            link={
              collections.find((item: Collection) => item.type === 'BOTTOMS')
                ? collections
                    .find((item: Collection) => item.type === 'BOTTOMS')!
                    .name.replace(/\W+/gi, '-')
                    .toLowerCase()
                : `/`
            }
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
