import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '../app/cartSlice';
import { setHoverMenuId } from '../app/collectionSlice';
import { RootState } from '../app/store';
import ModalNavbar from '../modals/ModalNavbar';
import CartContent from './CartContent';
import SearchBar from './SearchBar';
import { setShowSearchBar } from '../app/searchSlice';

type Props = {
  className?: string;
  changeColor: boolean;
  onClick: () => void;
  onClose: () => void;
};

function NavbarRight(props: Props) {
  const visible = useSelector((state: RootState) => state.cart.visible);
  const dispatch = useDispatch();
  const showSearchBar = useSelector(
    (state: RootState) => state.search.showSearchBar,
  );
  const location = useLocation();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const handleCartAppear = () => {
    dispatch(toggleVisibility(true));
    dispatch(setHoverMenuId(-1));
  };
  const handleClickCart = () => {
    if (location.pathname != '/cart') {
      handleCartAppear();
      props.onClick();
    }
  };
  const isAuth = useSelector(
    (state: RootState) => state.account.isAuthenticated,
  );
  return (
    <>
      <ul
        className={`flex items-center justify-end gap-6 uppercase md:flex lg:hidden ${props.className}`}
      >
        <li>
          <img
            onClick={() => {
              dispatch(setShowSearchBar(!showSearchBar));
            }}
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
            className={`mx-auto h-4 cursor-pointer duration-300 ${
              props.changeColor ? `` : `grayscale invert`
            }`}
          />
        </li>
        <li>
          <img
            onClick={handleClickCart}
            alt=""
            src={
              totalQuantity
                ? 'https://media.discordapp.net/attachments/1026660684739653674/1089228771149762690/cart_has_product.png'
                : 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png'
            }
            className={`mx-auto h-4 cursor-pointer duration-300 ${
              props.changeColor ? `` : `grayscale invert`
            }`}
          />
        </li>
        <li>
          <Link to="/account">
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
              className={`mx-auto h-4 cursor-pointer duration-300 ${
                props.changeColor ? `` : `grayscale invert`
              }`}
            />
          </Link>
        </li>
      </ul>
      <ul
        className={`hidden w-1/6 items-center justify-end gap-12 px-6 font-light duration-300 md:hidden lg:flex ${
          props.className
        } ${props.changeColor ? `text-neutral-600` : `text-white`}`}
      >
        <li className="capitalize">
          <Link to="/account">{isAuth ? 'account' : 'login'}</Link>
        </li>
        <li
          className="navbar-list capitalize hover:cursor-pointer"
          onClick={() => dispatch(setShowSearchBar(!showSearchBar))}
        >
          search
        </li>
        <li>
          <button className="capitalize" onClick={handleClickCart}>
            cart({totalQuantity})
          </button>
        </li>
      </ul>
      {visible && (
        <ModalNavbar
          isRight
          isShown={visible}
          className={`flex justify-end ${
            visible ? `visible` : `collapse`
          } duration-500`}
          onClose={() => {
            dispatch(toggleVisibility(false));
            dispatch(setHoverMenuId(-1));
            props.onClose();
          }}
        >
          <CartContent onClose={props.onClose} />
        </ModalNavbar>
      )}
      {showSearchBar && <SearchBar />}
    </>
  );
}

export default NavbarRight;
