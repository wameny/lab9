import { ConsoleLogger } from "./consoleLogger.js";
import { FileLogger } from "./fileLogger.js";

const loggerConsole = new ConsoleLogger();
const loggerFile = new FileLogger("logs.txt");

loggerConsole.log("Hello");
loggerFile.log("Hi");
