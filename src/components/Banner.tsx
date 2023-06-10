type Props = {
  src: string;
  srcSmallScreen?: string;
  bannerKey: number;
};

function Banner(props: Props) {
  const hasSale = false;
  const largeScreenClassName = 'hidden md:block';
  const smallScreenClassName = 'block md:hidden';
  const bannerClassName = `-z-10 ${
    props.bannerKey == 0 && !hasSale ? `h-screen` : `h-[calc(100vh-64px)]`
  } w-full object-cover brightness-90`;
  return (
    <>
      {props.src.split('.').pop() == 'mp4' ? (
        <video
          className={`${bannerClassName} ${largeScreenClassName}`}
          autoPlay
          loop
          muted
          src={props.src}
        ></video>
      ) : (
        <img
          className={`${bannerClassName} ${largeScreenClassName}`}
          src={props.src}
          alt=""
        />
      )}
      <img
        className={`${bannerClassName} ${smallScreenClassName}`}
        src={props.srcSmallScreen ? props.srcSmallScreen : props.src}
        alt=""
      />
    </>
  );
}

export default Banner;
