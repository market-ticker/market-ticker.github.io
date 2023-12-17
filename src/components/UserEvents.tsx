import { useEffect, useState } from 'react';

interface UserEvent {
  id: string;
  userAddress: string;
  name: string;
  userType: string;
  location: string;
  verificationStatus: boolean;
  uid: string;
}

async function fetchUserEvents(address) {
    try {
      const response = await fetch('https://api.studio.thegraph.com/query/33148/commodity-market-ticker/v0.0.3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: USER_QUERY,
          variables: { address }
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const jsonResponse = await response.json();
      return jsonResponse.data.userEvents;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return [];
    }
  }
  
const USER_QUERY = `
  query GetUserByAddress($address: String!) {
    userEvents(where: { userAddress: $address }) {
      id
      userAddress
      name
      userType
      location
      verificationStatus
      uid
    }
  }
`;
const UserEvents = ({ address, onFetchComplete }) => {
    const [userEvents, setUserEvents] = useState<UserEvent[]>([]);

    useEffect(() => {
      if (address) {
        fetchUserEvents(address)
          .then(fetchedUserEvents => {
            setUserEvents(fetchedUserEvents);
    
            onFetchComplete(fetchedUserEvents.length > 0); // Indicate success
          })
          .catch(() => {
            onFetchComplete(false); // Indicate failure
          });
      } else {
        onFetchComplete(false); // No address provided
      }
    }, [address, onFetchComplete]);

  return (
    <section>
      <p>Your Information</p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Address</th>
              <th>Name</th>
              <th>User Type</th>
              <th>Location</th>
              <th>Verification Status</th>
              <th>UID</th>
            </tr>
          </thead>
          <tbody>
            {userEvents.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.userAddress}</td>
                <td>{user.name}</td>
                <td>{user.userType}</td>
                <td>{user.location}</td>
                <td>{user.verificationStatus ? 'Verified' : 'Not Verified'}</td>
                <td>{user.uid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserEvents;
