import { useEffect, useState } from 'react';
import { MyAppointmentsCancelAppt, profAppt } from '../services/API';
import '../styles/MyAppointments.css';
import UseHomeContext from '../services/UseHomeContext';
import { jsISODateToTextAndDate } from '../services/DateTime';
import { Link } from 'react-router-dom';

function ClientsAppointments(){
    const {home} = UseHomeContext();
    const [myAppointmentsBooked, setMyAppointmentsBooked] = useState([])

    useEffect(() => {
        if(home.categories){
            getAppt();
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [home])
    
    async function getAppt() {
        let apptsRaw = await profAppt();
        let appt = apptsRaw.map(ap=>{
            const id = ap.id;
            const date = jsISODateToTextAndDate(ap.ini);
            const time = ap.ini.slice(11,16);
            const state = ap.state;
            //El servicio esta anidado en Home por lo que busco primero la categoria
            const category = home.categories.find(cat=>
                cat.services.find(serv=>serv.id===ap.serviceId)
            );
            //Luego el servicio
            const servi = category.services.find(serv=>serv.id===ap.serviceId);
            const service = servi.name;
            //Busco el profesional en Home
            const prof = home.professionals.find(prof=>prof.id===ap.professionalId);
            const professional = prof.lastname+' '+prof.name;
            return {id,date,time,state,service,professional};
        });
        setMyAppointmentsBooked(appt);
    }

    function cancelAppt(id){
        MyAppointmentsCancelAppt(id);
        console.log('cancelando',id);
    }

    return(
        <div className='masterContainer flexColumn'>
            <div className='btnFrente'><Link to='/formsettingsappt'>Editar la configuración de turnos</Link></div>
            <h1 className='myAppointmentsTitle'>{
                (myAppointmentsBooked.length>0)?
                    'Turnos Reservados'
                :
                    'No posee turnos reservados'
            }</h1>
            {
                myAppointmentsBooked.map((appt, index) =>
                    <div className='grid' key={index}>
                        <div className='h1'>
                            Dia
                        </div>
                        <div className='d1'>
                            {appt.date}
                        </div>
                        <div className='h2'>
                            Hora
                        </div>
                        <div className='d2'>
                            {appt.time}
                        </div>
                        <div className='h3'>
                            Servicio
                        </div>
                        <div className='d3'>
                            {appt.service}
                        </div>
                        <div className='h4'>
                            Profesional
                        </div>
                        <div className='d4'>
                            {appt.professional}
                        </div>
                        <div  className='b flexRow'></div>
                        <div className='c flexRow'>
                            {
                                appt.state?
                                    appt.state===1?
                                        'Cancelado por el usuario'
                                    :
                                        'Cancelado por el professional'
                                :
                                    <div className='cBtn' onClick={()=>cancelAppt(appt.id)}>Cancelar</div>
                            }
                        </div>
                    </div>
                )
            }

        </div>
    )
}
export default ClientsAppointments;