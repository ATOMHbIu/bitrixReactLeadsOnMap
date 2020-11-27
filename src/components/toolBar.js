import React, {useState} from 'react'
import Slider from '../elements/slider'

const ToolBar = () =>{
    const [leads, setLeads] = useState('leads')
    const [selectedDate, setSelectedDate] = useState(null)

    return (
        <div className="toolBar">
            <Slider
                leftTitle="Лиды"
                rightTitle="Сделки"
            />
        </div>
    )
}

export default ToolBar;