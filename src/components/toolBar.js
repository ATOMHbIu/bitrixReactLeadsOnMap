import React, {useState,useEffect} from 'react'
import Slider from '../elements/slider'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import ru from 'date-fns/locale/ru';

const ToolBar = ({dateStart, dateEnd, newData})=>{
    const [type, setType] = useState('lead');
    const [startDate, setStartDate] = useState(moment(dateStart).toDate());
    const [endDate, setEndDate] = useState(moment(dateEnd).toDate());

    const settings={
        type:type,
        startDate:startDate,
        endDate:endDate
    }

    useEffect(()=>{
        newData(settings);
    },[])

    const click=(e)=>{
        newData(settings)
    }

    const updateTime=(type, newDate)=>{
        switch (type){
            case 'start':
                setStartDate(newDate)
                break;
            case 'end':
                setEndDate(newDate);
                break
            default:
                break;
        }
    }

    const updateType=(newType)=>{
        setType(newType)
    }

    return (
        <div className="toolBar">
            <Slider
                leftTitle="Лиды"
                rightTitle="Сделки"
                type={(type)=>{updateType(type)}}
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