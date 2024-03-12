import moment from 'moment'
import React from 'react'

const ForecastNotificationsModalBody = ({ notifications }) => {
    return (
        <>
            <div className='d-flex flex-column'>
                {notifications.map((data, index) => {
                    return (
                        <div className='p-2' style={{fontSize:'12px'}}>
                            <div
                                key={index}
                                className={`${data.type !== 'ship' ? 'bg-primary' : 'bg-success'}`}
                                style={{ width: '12rem', padding: '10px', borderRadius: '7px', color: 'white', marginRight: '1rem' }}
                            >
                                <span>{`${data.type !== 'ship' ? 'Reorder' : 'Ship'}`} By <b>{moment(data.date).format('MMM DD yyyy')}</b></span>
                                <p className="pt-1">Quantity <b>{data.units}</b> Units</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ForecastNotificationsModalBody