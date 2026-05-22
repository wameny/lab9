export function log({ logger, level = "INFO" }) {
  return function (targetFunction) {
    return function (...args) {
      const timestamp = new Date().toISOString();

      const startTime = performance.now();

      try {
        const result = targetFunction(...args);

        if (result instanceof Promise) {
          return result
            .then((resolvedValue) => {
              const endTime = performance.now();

              if (level !== "ERROR") {
                const message = `
[${timestamp}]
LEVEL: ${level}
FUNCTION: ${targetFunction.name}
ARGS: ${JSON.stringify(args)}
RESULT: ${JSON.stringify(resolvedValue)}
TIME: ${(endTime - startTime).toFixed(2)}ms
`.trim();

                logger.log(message);
              }

              return resolvedValue;
            })
            .catch((error) => {
              const endTime = performance.now();

              const message = `
[${timestamp}]
LEVEL: ERROR
FUNCTION: ${targetFunction.name}
ARGS: ${JSON.stringify(args)}
ERROR: ${error.message}
TIME: ${(endTime - startTime).toFixed(2)}ms
`.trim();

              logger.log(message);

              throw error;
            });
        }

        const endTime = performance.now();

        if (level !== "ERROR") {
          const message = `
[${timestamp}]
LEVEL: ${level}
FUNCTION: ${targetFunction.name}
ARGS: ${JSON.stringify(args)}
RESULT: ${JSON.stringify(result)}
TIME: ${(endTime - startTime).toFixed(2)}ms
`.trim();

          logger.log(message);
        }

        return result;
      } catch (error) {
        const endTime = performance.now();

        const message = `
[${timestamp}]
LEVEL: ERROR
FUNCTION: ${targetFunction.name}
ARGS: ${JSON.stringify(args)}
ERROR: ${error.message}
TIME: ${(endTime - startTime).toFixed(2)}ms
`.trim();

        logger.log(message);

        throw error;
      }
    };
  };
}
