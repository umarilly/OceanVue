import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Widgets.scss';

const data = [
    { name: '.', Cargo: 4000, Pessanger: 2400, Tug: 1000, Tanker: 2000 },
    { name: '.', Cargo: 3000, Pessanger: 1398, Tug: 2000, Tanker: 1000 },
    { name: '.', Cargo: 2000, Pessanger: 9800, Tug: 3000, Tanker: 1500 },
    { name: '.', Cargo: 2780, Pessanger: 3908, Tug: 4000, Tanker: 500 },
    { name: '.', Cargo: 1890, Pessanger: 4800, Tug: 5000, Tanker: 2500 },
    { name: '.', Cargo: 2390, Pessanger: 3800, Tug: 6000, Tanker: 3000 },
    { name: '.', Cargo: 3490, Pessanger: 4300, Tug: 7000, Tanker: 4000 },
];

const Widgets3 = () => {
    return (
        <>
            <div className='widget2' >
                <div className="left2">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer width="120%" height="100%">
                            <LineChart
                                data={data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 40,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" hide={true} />
                                <YAxis hide={true} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Cargo" stroke=" #4884d8" activeDot={{ r: 8 }} dot={false} />
                                <Line type="monotone" dataKey="Pessanger" stroke=" #79cadd" activeDot={{ r: 8 }} dot={false} />
                                <Line type="monotone" dataKey="Tug" stroke=" #829e"  activeDot={{ r: 8 }} dot={false} />
                                <Line type="monotone" dataKey="Tanker" stroke=" #82fd"  activeDot={{ r: 8 }} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Widgets3;
