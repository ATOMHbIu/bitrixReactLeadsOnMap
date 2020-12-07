import React, {useState,useEffect} from 'react'
import Slider from '../elements/slider'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import ru from 'date-fns/locale/ru';
// registerLocale('ru', ru)

const ToolBar = ({dateStart, dateEnd, newData})=>{
    const [type, setType] = useState('lead')
    const [startDate, setStartDate] = useState(moment(dateStart).toDate());
    const [endDate, setEndDate] = useState(moment(dateEnd).toDate());

    const settings={
        type:type,
        startDate:startDate,
        endDate:endDate,
    }

    const click=(e)=>{
        newData(settings)
    }

    useEffect(()=>{
        console.log('end updated')
    },[endDate])

    const updateTime=(type, newDate)=>{
        switch (type){
            case 'start':
                setStartDate(newDate)
                console.log(startDate);
                break;
            case 'end':
                setEndDate(newDate);
                console.log(endDate);
                break
            default:
                break;
        }
    }

    return (
        <div className="toolBar">
            <Slider
                leftTitle="Лиды"
                rightTitle="Сделки"
            />

            <div className="dates">
                <div className="dateStart">Начало: <DatePicker locale={ru} dateFormat="dd-MM-yyyy" selected={startDate} onChange={e=>updateTime('start', e)} /></div>
                <div className="dateEnd">Конец: <DatePicker locale={ru} dateFormat="dd-MM-yyyy" selected={endDate} onChange={e=>updateTime('end',e)} /></div>
            </div>
            <div className="button show"
                onClick={(e)=>click(e)}
            >Показать</div>
        </div>
    )
}

export default ToolBar;