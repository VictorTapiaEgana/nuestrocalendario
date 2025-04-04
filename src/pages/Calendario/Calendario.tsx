import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const Calendario = () => {

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

  return (

     <>
            <h1>Calendario</h1>

            <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        weekends={false}
                        dateClick={handleDateClick}
                        events={[
                            { title: 'event 1', date: '2019-04-01' },
                            { title: 'event 2', date: '2019-04-02' }
                        ]}
            />

     </>

  )

}

export default Calendario