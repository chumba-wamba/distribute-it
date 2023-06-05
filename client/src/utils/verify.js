const crc32 = require("crc-32");

const generateChecksum = (fileData) => crc32.str(fileData) >>> 0;
