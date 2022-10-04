
export function jsDateToHsMin(timeInMS){
  const jsDate= new Date(timeInMS);
  return ('0'+jsDate.getHours()).slice(-2)+':'+('0'+jsDate.getMinutes()).slice(-2);
}

export function jsDateToText(timeInMS){
  const months=[
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  const days=[
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
  ]
  const jsDate= new Date(timeInMS);
  const day=days[jsDate.getDay()];
  const dayNumber=parseInt(jsDate.getDate());
  const month=months[jsDate.getMonth()];

  return `${day} ${dayNumber} de ${month}`;
}