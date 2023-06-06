import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import { setShippingPrice } from '../app/orderSlice';

function CheckoutShippingSection() {
    const [checked, setChecked] = useState(true);
    const emailOrder = useSelector((state: RootState) => state.order.emailOrder);
    const countryOrder = useSelector((state: RootState) => state.order.countryOrder);
    const addressOrder = useSelector((state: RootState) => state.order.addressOrder);
    const districtOrder = useSelector((state: RootState) => state.order.districtOrder);
    const cityOrder = useSelector((state: RootState) => state.order.cityOrder);
    const dispatch = useDispatch();
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setShippingPrice(Number(event.target.value)));
      };
    return <div className='w-full'>
        <div className="relative rounded border p-3 grid gap-3">
        <div className='flex flex-row'>
                <div className='basis-2/12 text-gray-500'>Contact</div>
                <div className='basis-9/12'>{emailOrder}</div>
                <div className='basis-1/12 text-sm grid items-center'><Link to="/checkout/information">Change</Link></div>
            </div>
            <div className='w-full h-px bg-gray-300'></div>
            <div className='flex flex-row'>
                <div className='basis-2/12 text-gray-500'>Ship to</div>
                <div className='basis-9/12'>{addressOrder + ", " + districtOrder + ", " + cityOrder + ", " + countryOrder}</div>
                <div className='basis-1/12 text-sm grid items-center'><Link to="/checkout/information">Change</Link></div>
            </div>
        </div>
        <h2 className="text-xl py-3">Shipping method</h2>
        <div className="relative rounded border grid">
            <label htmlFor="economy" className="cursor-pointer flex flex-row justify-between p-3">
                <div className='flex gap-3'>
                    <div className='grid items-start mt-1'>
                        <input className='cursor-pointer' type="radio" id="economy" value={52.37} name="shipping_method" checked={checked} onClick={() => setChecked(true)} onChange={handleRadioChange} />
                    </div>
                    <div className='grid'>
                        <p>FedEx International Economy®</p>
                        <p className='text-gray-500 text-sm'>6 to 10 business days</p>
                    </div>
                </div>
                <p className='text-right font-[Mulish] font-bold'>$52.37</p>
            </label>
            <div className='w-full h-px bg-gray-300'></div>
            <label htmlFor="priority" className="cursor-pointer flex flex-row justify-between p-3">
                <div className="flex gap-3">
                    <div className='grid items-start mt-1'>
                        <input type="radio" id="priority" value={58.61}name="shipping_method" checked={!checked} onClick={() => setChecked(false)} onChange={handleRadioChange} />
                    </div>
                    <div className='grid'>
                        <p>FedEx International Priority®</p>
                        <p className='text-gray-500 text-sm'>3 to 5 business days</p>
                    </div>
                </div>
                <p className='text-right font-[Mulish] font-bold'>$58.61</p>
            </label>
        </div>
    </div>;
}

export default CheckoutShippingSection;