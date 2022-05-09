/**
 * 
 * @param {{
 * description: string,
 * icon: string,
 * id: number,
 * main: string
 * }} weatherObj 
 * @returns 
 */
const getIconByWeatherDescription = (weatherObj) => {
  switch(weatherObj.main) {
    case 'Clear': return '☀️' 
    case 'Clouds': return '☁️' 
    case 'Rain': return '🌧' 
    default: return weatherObj.main;
  }
}

module.exports = { getIconByWeatherDescription }
