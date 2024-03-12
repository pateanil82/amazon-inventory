import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { RSelect } from '../../../../components/Component';
import { dropdownDaysOptions } from '../../../../utils/Utils'

const ProductionFrequencyModalBody = ({ close, value, updateValue }) => {
    const [selectedDay, setSelectedDay] = useState({ value: value, label: `${value} Days` });

    const handleFreqSelect = (data) => {
        setSelectedDay(data);
    };

    const handleSave = () => {
        updateValue('productionFrequency', selectedDay.value)
        close()
    }
    return (
        <>
            <div>
                <p className='m-0'>Ship when it is needed, the quantity that will cover.</p>
                
                <div className=' py-2'>
                    <RSelect
                        options={dropdownDaysOptions}
                        value={selectedDay}
                        placeholder="Production Frequency"
                        onChange={(e) => handleFreqSelect(e)}
                    />
                </div>

                <div className="form-group d-flex justify-content-end">
                    <Button
                        size="md"
                        className="btn"
                        style={{ color: 'black', background: 'none', border: 'none' }}
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="md"
                        className="btn"
                        type="submit"
                        color="primary"
                        onClick={() => { handleSave() }}
                    >
                        Save
                    </Button>
                </div>

            </div >
        </>
    )
}
export default ProductionFrequencyModalBody