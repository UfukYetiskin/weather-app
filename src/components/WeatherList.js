import React from 'react'

function WeatherList(data) {

console.log(data)
console.log(typeof data)
console.log(typeof data.list)
  return (
    <div>
        <ul>
          {/* {
            data && data.list.map((day) => (
              <li>
                {day.main.temp}
              </li>
            ))
          } */}
        </ul>
        
    </div>
  )
}

export default WeatherList