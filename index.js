import { ConsoleLogger } from "./consoleLogger.js";
import { FileLogger } from "./fileLogger.js";
import { log } from "./loggerDecorator.js";

const loggerConsole = new ConsoleLogger();
const loggerFile = new FileLogger("logs.txt");

loggerConsole.log("Hello");
loggerFile.log("Hi");

function add(a, b) {
  return a + b;
}

const loggedAdd = log({
  logger: new ConsoleLogger(),
  level: "INFO",
})(add);

console.log(loggedAdd(3, 3));

async function fetchUser(id) {
  return {
    id,
    name: "Vlada",
  };
}

const loggedFetchUser = log({
  logger: new ConsoleLogger(),
  level: "DEBUG",
})(fetchUser);

await loggedFetchUser(1);
