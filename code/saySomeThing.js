import http from 'http' 
import console from 'console'
export default function(saySomething) {
  
  const {whatUserSaid} = saySomething;
  const text = {"text":whatUserSaid}; 
  const options = {
    passAsJson: true,
    returnHeaders: true,
    format: 'json'
  };
  const response = http.postUrl("https://django-api-phi.vercel.app/api/langTranslate/",text,options);
  console.log(response.responseText.substring(1,response.responseText.length-1).split(":")[1]);
  return response.responseText.substring(1,response.responseText.length-1).split(":")[1];
}
