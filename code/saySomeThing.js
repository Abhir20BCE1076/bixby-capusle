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
  const nllb_header = {
    passAsJson: true, 
    returnHeaders: true, 
    format: 'json',
    headers: {
      Authorization: 'Bearer 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'
    }
  }
  const lang_detect_code = JSON.parse(http.postUrl("https://api-inference.huggingface.co/models/facebook/fasttext-language-identification", {"inputs" : whatUserSaid}, options).responseText)[0][0].label;
  console.log(lang_detect_code);
  const nllb_body = {"text": whatUserSaid, "source": lang_detect_code,"target": "eng_Latn"};
  const response_gtts = http.postUrl("https://django-api-phi.vercel.app/api/langTranslate/",text,options);
  const response_nllb = http.postUrl("https://pvabhiram2003-final.hf.space/v1/translate",nllb_body, nllb_header);
   
	// console.log(result?.data);
  // console.log(response.responseText.substring(1,response.responseText.length-1).split(":")[1]);
  return response_gtts.responseText.substring(1,response_gtts.responseText.length-1).split(":")[1] + ". Also it can be said as " + JSON.parse(response_nllb.responseText).text; 
}

