import { createLogger, transports, format } from "winston";

export const EXPRESS_LOGGER_OPTION = {
    transports: [
        new transports.Console()
    ],
    format: format.combine(
        format.colorize(),
        format.json()
    )
};

export const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, service }) => {
            return `[${timestamp}] ${service} ${level}: ${message}`;
        })
    ),
    defaultMeta: {
        service: "Scam Score",
    },
});