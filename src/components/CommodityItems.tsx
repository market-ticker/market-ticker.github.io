import { useEffect, useState } from 'react';

interface Commodity {
  id: string;
  name: string;
  symbol: string;
  comId: string;
}

// GraphQL query to fetch commodities
const COMMODITIES_QUERY = `
  query {
        commodityCreateds {
          id
          comId
          name
          symbol
      }
  }
`;

// Function to fetch commodities from The Graph API
async function fetchCommodities() {
  try {
    const response = await fetch('https://api.studio.thegraph.com/query/33148/commodity-market-ticker/v0.0.3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: COMMODITIES_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.data.commodityCreateds as Commodity[];
  } catch (error) {
    console.error('Error fetching commodities:', error);
    return [];
  }
}

export default function  CommodityItems({ onCommoditiesFetched }){
  const [commodities, setCommodities] = useState<Commodity[]>([]);

  useEffect(() => {
    fetchCommodities().then(fetchedCommodities => {
      setCommodities(fetchedCommodities);
      if (onCommoditiesFetched) {
        onCommoditiesFetched(fetchedCommodities);
      }
    });
  }, [onCommoditiesFetched]);

  return (
    <section >
    <p>Existing Commodities</p>
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Sumbol</th>
        <th>Address Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {commodities.map((commodity, index) => (
          <tr key={index}>
             <th>{index}</th>
          <th>{commodity.name}</th>
          <td>{commodity.symbol}</td>
          <td>{commodity.comId}</td>
        </tr>
        ))}
    
    </tbody>
  </table>
</div>
    </section>
  );
};

