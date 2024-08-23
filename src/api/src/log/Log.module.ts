import { LoggingWinston } from '@google-cloud/logging-winston';
import { ConfigService, ConfigModule } from '@nestjs/config';
import DailyRotateFile from 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';
import Table from 'cli-table3';


// Helper function for hex to ANSI color conversion
const hexToAnsi = (
    hex: string,
    type: 'foreground' | 'background' = 'foreground',
): string => {
    const cleanHex = hex.startsWith('#')
        ? hex.slice(1)
        : hex;

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    const prefix = type === 'background' ? '48' : '38';

    return `\x1b[${prefix};2;${r};${g};${b}m`;
}

const consoleFormat = format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const colors: Record<string, string> = {
        info: hexToAnsi('#00C800'),
        warn: hexToAnsi('#FFFF00'),
        error: hexToAnsi('#FF0000'),
        debug: hexToAnsi('#6464FF'),
        silly: hexToAnsi('#9696FF'),
        reset: '\x1b[0m',
    };

    const backgrounds: Record<string, string> = {
        info: hexToAnsi('#003200', 'background'),
        warn: hexToAnsi('#646400', 'background'),
        error: hexToAnsi('#640000', 'background'),
        debug: hexToAnsi('#000064', 'background'),
        silly: hexToAnsi('#000064', 'background'),
        reset: '\x1b[0m',
    };

    const bold = '\x1b[1m';
    const light = '\x1b[2m';
    const reset = '\x1b[0m';

    const table = new Table({
        chars: {
            top: '',
            'top-mid': '',
            'top-left': '',
            'top-right': '',
            bottom: '',
            'bottom-mid': '',
            'bottom-left': '',
            'bottom-right': '',
            left: '',
            'left-mid': '',
            mid: '',
            'mid-mid': '',
            right: '',
            'right-mid': '',
            middle: ' ',
        },
        style: { 'padding-left': 0, 'padding-right': 2 },
    });

    Object.entries(meta).forEach(([key, value]) => {

        let printedValue = value;

        const dataTypeName = typeof value;

        if (dataTypeName === 'object')
            printedValue = JSON.stringify(value, null, 4);

        const displayValue = !value
            ? `${light}[no value]${reset}`
            : `${light}[${dataTypeName}]${reset} ${printedValue}`


        table.push([`${bold}${key}${reset}`, displayValue]);
    });

    const color = colors[level] || colors.reset;
    const background = backgrounds[level] || backgrounds.reset;

    const indentedTable = table.toString().split('\n').map(line => `        ${line}`).join('\n');

    // Adding stack trace formatting
    const formattedStack = (stack as string)
        ? stack.split('\n').map((line: string) => `    ${bold}${color}${line}${reset}`).join('\n')
        : '';

    // eslint-disable-next-line max-len
    return `${bold}${background}${color}${level.toUpperCase()}${reset} ${light}${timestamp}${reset}\n    ${bold}${message}${reset}\n${formattedStack}${indentedTable}\n${reset}`;
});

// Custom log formatter for file output
const fileFormat = format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    const formattedStack = stack ? `\n${stack}` : '';

    return `[${timestamp}] [${level.toUpperCase().padEnd(7)}]: ${message}${formattedStack} ${metaString}`;
});



// Inject ConfigService to get the log level from environment variables
export const LogModule = WinstonModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService : ConfigService) => {

        const logLevel = configService.get<string>('LOGGING_LEVEL', 'silly');

        return {
            level: logLevel,
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.json(),
            ),
            defaultMeta: { service: 'game-service' },
            transports: [
                new LoggingWinston(),
                new winston.transports.Console({
                    format: format.combine(format.timestamp(), consoleFormat),
                }),
                new DailyRotateFile({
                    filename: 'log/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '32m',
                    maxFiles: '99d',
                    format: fileFormat,
                }),
            ],
        };
    },
});
