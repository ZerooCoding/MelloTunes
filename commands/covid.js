const {
    MessageEmbed
} = require("discord.js");
const sendError = require("../util/error");
const api = require("novelcovid");

module.exports.run = async (client, message, args) => {
const covidArray = message.content.split(" ");
const covidArgs = covidArray.slice(1);
 if(!covidArgs.length) {
      return sendError("Please give the name of the country, state, or whatever.", message.channel)
    }
    if(covidArgs[0] === 'all') {
      let corona = await api.all() //it will give global cases
      
      let embed = new MessageEmbed()
      .setTitle("Global Cases")
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed) 
    }
	if(covidArgs[0] === 'country') {
      let covid = covidArgs.slice(1).join(" ")
	  let corona = await api.countries({country:`${covid}`})      
      let embed = new MessageEmbed()
      .setTitle(`${corona.country}`)
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed) 
    	}
	if(covidArgs[0] === 'continent') {
      let covid = covidArgs.slice(1).join(" ")
	  let corona = await api.continents({continent:`${covid}`})      
      let embed = new MessageEmbed()
      .setTitle(`${corona.continent}`)
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed) 
    }
	if(covidArgs[0] === 'state') {
      let covid = covidArgs.slice(1).join(" ")
	  let corona = await api.states({state:`${covid}`})      
      let embed = new MessageEmbed()
      .setTitle(`${corona.state}`)
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed) 
		}
	if(covidArgs[0] === 'county') {
      let covid = covidArgs.slice(1).join(" ")
	  let corona = await api.counties({county:`${covid}`})      
      let embed = new MessageEmbed()
      .setTitle(`${corona.county}`)
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed) 
		}
	}

	module.exports.config = {
    	name: "covid",
    	aliases: []
}