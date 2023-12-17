import { useEffect, useState } from 'react';

interface Order {
  orderId: string;
  owner: string;
  commodityId: string;
  region: string;
  country: string;
  amount: number;
  price: number;
  currency: string;
  harvestDate: string;
  validityPeriod: string;
  isBuyOrder: boolean;
}

// GraphQL query to fetch orders
const ORDERS_QUERY = `{
    orderPlaceds {
      orderId
      owner
      commodityId
      region
      country
      amount
      price
      currency
      harvestDate
      validityPeriod
      isBuyOrder
    }
  }
`;

// Function to fetch orders from The Graph API
async function fetchOrders() {
  try {
    const response = await fetch('https://api.studio.thegraph.com/query/33148/commodity-market-ticker/v0.0.3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: ORDERS_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.data.orderPlaceds as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export default function OrderItems(){
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders().then(fetchedOrders => {
      setOrders(fetchedOrders);
    });
  }, []);

  return (
    <section>
      <p>Existing Orders</p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Owner</th>
              <th>Commodity ID</th>
              <th>Region</th>
              <th>Country</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Harvest Date</th>
              <th>Validity Period</th>
              <th>Buy Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderId}</td>
                <td>{order.owner}</td>
                <td>{order.commodityId}</td>
                <td>{order.region}</td>
                <td>{order.country}</td>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>{order.currency}</td>
                <td>{new Date(parseInt(order.harvestDate)).toLocaleDateString()}</td>
                <td>{order.validityPeriod}</td>
                <td>{order.isBuyOrder ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
