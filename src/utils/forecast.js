const request=require('request')

const forecast=(lat,lon,callback)=>{
    weatherUrl='https://api.darksky.net/forecast/4e80c7424ca85d53c87f3dbbcedb8335/'+lat+','+lon
    request({url:weatherUrl,json:true},(error,response)=>{
        if(error)
            callback("Unable to connect to Weather network.",undefined)
        else if(response.body.error)
            callback("Unable to find location.",undefined)
        else
            {
              callback(undefined,{  
                temp:response.body.currently.temperature,
                rainPorbability:response.body.currently.precipProbability
              })
            }
    })
}

module.exports=forecast