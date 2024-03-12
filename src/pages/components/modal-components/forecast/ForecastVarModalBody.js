import React from 'react'
import { Icon } from '../../../../components/Component'

const ForecastVarModalBody = ({ toggleForecastModal }) => {
    return (
        <>
            <div className='d-flex justify-content-between'>
                <p>Forecast</p>
                <div className='d-flex gap-2'>
                    <p className='text-primary'>37.000/day</p>
                    <p>Avg.Velocity</p>
                    <Icon name='pen-fill' className='mt-1' onClick={() => { toggleForecastModal() }} />
                </div>
            </div>
        </>
    )
}

export default ForecastVarModalBody