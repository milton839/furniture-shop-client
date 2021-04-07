import moment from 'moment';
import React from 'react';

const OrderView = ({order}) => {
    console.log(order)
    return (
        <tr>
            <td>{order.shipment.name}</td>
            <td>{order.shipment.email}</td>
            <td>{order.shipment.address}</td>
            <td>{order.shipment.phone}</td>
            <td>{order.products?.title}</td>
            <td>{moment(order.orderTime).format('DD-MM-YYYY hh:mm:ss A')}</td>
        </tr>
    );
};

export default OrderView;