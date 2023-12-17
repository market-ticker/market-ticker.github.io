//import Footer from "./Footer";
//import Hero from "./Hero";
import Navbar from "./Navbar";
import CommodityItems from './CommodityItems';
import CreateCommodity from './Createcommodity';
import RegisterUser from './RegisterUser';
import OrderItems from './OrderItems';
import PlaceOrder from './PlaceOrder';
import UserEvents from './UserEvents';
import { useState, useCallback } from 'react';
import { useWalletContext } from '../context/wallet';
export default function Root() {
  const [refreshKey] = useState(0);
  const { isLoggedIn } = useWalletContext();
  const [commodities, setCommodities] = useState([]);
  const refreshCommodities = useCallback(() => {
    // Increment the key to re-render the CommodityItems component
   // setRefreshKey((prevKey) => prevKey + 1);
  }, []);
  const handleCommoditiesFetched = useCallback((fetchedCommodities) => {
    setCommodities(fetchedCommodities);
  }, []);
  const refreshOrder = useCallback(() => {
    // Increment the key to re-render the CommodityItems component
  //  setRefreshKey((prevKey) => prevKey + 1);
  }, []);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);

  const handleFetchComplete = (success) => {
    setIsFetchSuccessful(success);
  };
  const {  ownerAddress, scaAddress } = useWalletContext();
  return (
    <div className="flex flex-col text-black dark:text-white items-center justify-between p-[96px] gap-[72px]">
      <Navbar />
     
      {isLoggedIn && scaAddress &&  <UserEvents address={scaAddress} onFetchComplete={handleFetchComplete} />}
      {isLoggedIn && !isFetchSuccessful && <RegisterUser onRegistrationComplete={function (): void {
        alert('Account created');
      } } />}
         {isLoggedIn && (
        <div> Account abstration infos:
          <p>Owner Address: {ownerAddress}</p>
          <p>SCA Address: {scaAddress}</p>
        </div>
      )}
      <br/> <br/>
       <CommodityItems key={refreshKey}  onCommoditiesFetched={handleCommoditiesFetched} />
      {isLoggedIn && scaAddress == '0x9E24A5FFC47ab0B5A2E8B66d7970b31cA9B2133D' && <CreateCommodity onCreationComplete={refreshCommodities} />}
   
      <OrderItems/>
      {isLoggedIn && <PlaceOrder onOrderPlaced={refreshOrder}  commodities={commodities} />}
     
    </div>
  );
}
