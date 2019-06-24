const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const express=require('express')
const app=express()
const hbs=require('hbs')
const path=require('path')

const port=process.env.PORT || 3000
const pathViews=path.join(__dirname,'../templates/views')
const pathPartial=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')

app.set('views',pathViews)

hbs.registerPartials(pathPartial)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Arkadeep',
        content:"THis is a weather app"
    })
})

app.get('/weather',(req,res)=>{
    if(req.query.address)
    {
        ///
        address=req.query.address
        geocode(address,(error,data)=>{
            if(error)
                res.send({error:error})
            else{
                forecast(data.latitude,data.longitude,(error,data2)=>{
                    if(error)
                        res.send({error:error})
                    else    
                        {
                            res.send({
                                location:data.location,
                                forecast:data2
                            })
                        }
                        
                })
            }
        })
    }
    else{
        res.send({
            error:'provide address to get weather there.'
        })
    }
   
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Arkadeep',
        content:"Some help full text"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Arkadeep',
        content:"Some text about app."
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'ERROR',
        name:'Arkadeep',
        content:"Help article not found"
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'ERROR',
        name:'Arkadeep',
        content:"404 PAGE NOT FOUND."
    })
})
//console.log(pathToHtml)

//app.use(express.static(pathToHtml))

/*app.get('',(req,res)=>{
    res.send('Hello express!')
})*/

/*app.get('/help',(req,res)=>{
    res.send('Help Page.')
})

app.get('/about',(req,res)=>{
    res.send('About page.')
})

app.get('/weather',(req,res)=>{
    res.send('Show weather.')
})
*/
app.listen(port,()=>{
    console.log('Server is up in port '+port+'.')
})