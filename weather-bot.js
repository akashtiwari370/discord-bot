const Discord = require("discord.js");
const fetch = require("node-fetch");
const { Attachment } = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("connected as " + client.user.tag);

  client.user.setActivity("Music", { type: "playing" });

  let generalChannel = client.channels.get("channel id");

  generalChannel.send("Hi I'm weather Bot");
});

client.on("message", (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return;
  }

  if (receivedMessage.content[0] == "!") {
    processCommand(receivedMessage);
  }
});

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1);
  let splitCommand = fullCommand.split(" ");
  let primaryCommand = splitCommand[0];
  let arguments = splitCommand.slice(1);

  if (primaryCommand == "help") {
    helpCommand(arguments, receivedMessage);
  } else if (primaryCommand == "weather") {
    weatherCommand(arguments, receivedMessage);
  } else {
    receivedMessage.channel.send("Unknown command try !help or !weather");
  }
}

function weatherCommand(arguments, receivedMessage) {
  if (arguments < 0) {
    receivedMessage.channel.send("Not enough arguments. Try !weather 208027");

    return;
  } else {
    const response = fetch(
      "https://api.openweathermap.org/data/2.5/forecast/daily?zip=${arguments},{IN}&appid={your API key}"
    );
    receivedMessage.channel.send(
      "The Current Weather Location: ${parsedWeather.name} Forecast: ${parsedWeather.weather[0].main} Current Temperature: ${parsedWeather.main.temp} "
    );
  }
}

function helpCommand(arguments, receivedMessage) {
  if (arguments.length == 0) {
    receivedMessage.channel.send(
      "T'm not sure what you need try !help [Topic]"
    );
  } else {
    receivedMessage.channel.send(
      "it looks like you need help with " + arguments
    );
  }
}

client.login("BOt id");
