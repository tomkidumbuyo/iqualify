var fs = require('fs');
var turf = require('@turf/turf');
var regionModel = require('../models/region');
var districtModel = require('../models/district');
var wardModel = require('../models/ward');


async function getLocation(lat, lng) {

    var obj = await JSON.parse(await fs.readFileSync('location_data/tanzania.geojson', 'utf8'));

    console.log(obj)
    result = []
    for (const feature of obj.features) {
        
        inside = await this.inside([parseFloat(lng),parseFloat(lat)], feature.geometry.coordinates)
        
        if(inside) {
            result = feature.properties;
            console.log("here : ", result);
        }

        // region = await regionModel.findOne({code : feature.properties.Region_Cod, name: feature.properties.Region_Nam})
        // if(!region) {
        //     region = await regionModel.create({code : feature.properties.Region_Cod, name: feature.properties.Region_Nam})
        // } 

        // district = await districtModel.findOne({code : feature.properties.District_C, name: feature.properties.District_N, region: region})
        // if(!district) {
        //     district = await districtModel.create({code : feature.properties.District_C, name: feature.properties.District_N, region: region})
        // }

        // ward = await wardModel.findOne({code : feature.properties.Ward_Code, name: feature.properties.Ward_Name, district: district})
        // if(!ward) {
        //     ward = await wardModel.create({code : feature.properties.Ward_Code, name: feature.properties.Ward_Name, district: district})
        // }

        //console.log(ward)
     
    }

    region = await regionModel.findOne({code : result.Region_Cod, name: result.Region_Nam})
    district = await districtModel.findOne({code : result.District_C, name: result.District_N, region: region})
    ward = await wardModel.findOne({code : result.Ward_Code, name: result.Ward_Name, district: district})

    console.log(result)
    return {
        region : region,
        district : district,
        ward: ward
    };

}

async function inside(point, vs) {

   
    // console.log(vs)
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var pt = turf.point(point);
    var poly = turf.multiPolygon(vs);

    // console.log(pt)
    // console.log(poly)

    inside = turf.booleanPointInPolygon(pt, poly);
    return inside;
};

module.exports = {
    getLocation: getLocation,
    inside: inside,
};