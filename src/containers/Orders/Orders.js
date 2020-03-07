import React, { useEffect, useState } from 'react';
import Order from 'components/Order/Order/Order';
import axios from 'axios-orders';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

const Orders = () => {
  const [data, setData] = useState({
    orders: [],
    loading: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('/orders.json');

        console.log(result.data);
        const fetchedOrders = [];

        for (const key in result.data) {
          fetchedOrders.push({
            ...result.data[key],
            id: key,
          });
        }
        setData({ loading: false, orders: fetchedOrders });
      } catch (error) {
        setData({ loading: false });
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {data.orders.map((el) => (
        <Order
          key={el.id}
          ingredients={el.ingredients}
          price={el.price}
        />
      ))}
    </div>
  );
};

export default withErrorHandler(Orders, axios);
