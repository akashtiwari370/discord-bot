const Discord = require("discord.js");
const { Attachment } = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("connected as " + client.user.tag);

  client.user.setActivity("Youtube", { type: "Watching" });

  let generalChannel = client.channels.get("your channel id");

  generalChannel.send("Hi Guys");
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
  } else if (primaryCommand == "multiply") {
    multiplyCommand(arguments, receivedMessage);
  } else {
    receivedMessage.channel.send("Unknown command try !help or !multiply");
  }
}

function multiplyCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
    receivedMessage.channel.send("Not enough arguments. Try !multiply 2 10");
    return;
  }
  let product = 1;
  arguments.forEach((value) => {
    product = product * parseFloat(value);
  });
  receivedMessage.channel.send(
    "The product of " + arguments + " is " + product.toString()
  );
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

client.login("Bot id");
