const request=require('request')

const geocode=(address,callback)=>{
    const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJrYWRlZXAiLCJhIjoiY2p4MmJ1d2psMGhmcDN6cDlkajg2a2J3NCJ9.5CwU-qS0nNBvXH9KYLyb-g&limit=1'
    request({url:geoUrl,json:true},(error,response)=>{
        if(error)
            callback("Unable to connect to Geocoding network.",undefined)
        else if(response.body.features.length==0)
            callback("Unable to find location.",undefined)
        else{
            
            callback(undefined,{
                location: response.body.features[0].place_name,
                 longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]
             })
        }
    })
}

module.exports=geocode