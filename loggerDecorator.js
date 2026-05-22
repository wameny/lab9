export function log({ logger, level = "INFO" }) {
  return function (targetFunction) {
    return function (...args) {
      const timestamp = new Date().toISOString();

      const result = targetFunction(...args);

      const message = `
[${timestamp}]
LEVEL: ${level}
FUNCTION: ${targetFunction.name}
ARGS: ${JSON.stringify(args)}
RESULT: ${JSON.stringify(result)}
`.trim();

      logger.log(message);

      return result;
    };
  };
}
