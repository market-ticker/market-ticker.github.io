//import Footer from "./Footer";
//import Hero from "./Hero";
import Navbar from "./Navbar";
import CommodityItems from './CommodityItems';
import CreateCommodity from './Createcommodity';
import { useState, useCallback } from 'react';
import { useWalletContext } from '../context/wallet';
export default function Root() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { isLoggedIn } = useWalletContext();

  const refreshCommodities = useCallback(() => {
    // Increment the key to re-render the CommodityItems component
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="flex flex-col text-black dark:text-white items-center justify-between p-[96px] gap-[72px]">
      <Navbar />
      <CommodityItems key={refreshKey}  />
      {isLoggedIn && <CreateCommodity onCreationComplete={refreshCommodities} />}
    </div>
  );
}
