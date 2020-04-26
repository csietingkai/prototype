import util from 'js/util/util';

const LEVELS = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR'
};

const getLogMsg = (level, classname, datetime, msg) => {
    return '[' + level + '][' + classname + '][' + util.formatDateTime(datetime, true) + '] ' + msg;
};

export default class Logger {

    constructor(classname) {
        this.classname = classname;
    }

    debug = (msg) => {
        console.debug(getLogMsg(LEVELS.DEBUG, this.classname, new Date(), msg))
    }

    info = (msg) => {
        console.info(getLogMsg(LEVELS.INFO, this.classname, new Date(), msg))
    }

    warn = (msg) => {
        console.warn(getLogMsg(LEVELS.WARN, this.classname, new Date(), msg))
    }

    error = (msg) => {
        console.error(getLogMsg(LEVELS.ERROR, this.classname, new Date(), msg))
    }
}