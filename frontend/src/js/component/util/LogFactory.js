import util from "js/util/util";

const LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
};

const getLogMsg = (level, classname, datetime, msg) => {
    return '[' + level + '][' + classname + '][' + util.formatDateTime(datetime, true) + '] ' + msg;
};

const getLogger = (classname) => {
    let logger = {
        debug: (msg) => {
            console.debug(getLogMsg(LEVELS.DEBUG, classname, new Date(), msg))
        },
        info: (msg) => {
            console.info(getLogMsg(LEVELS.INFO, classname, new Date(), msg))
        },
        warn: (msg) => {
            console.warn(getLogMsg(LEVELS.WARN, classname, new Date(), msg))
        },
        error: (msg) => {
            console.error(getLogMsg(LEVELS.ERROR, classname, new Date(), msg))
        }
    };

    return logger;
};

export default {
    getLogger
};