/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};

const idGenerator = (events, length = 1) => {
  const arrayData = [];
  events.map((data) => {
    return arrayData.push(parseInt(data.id, 10));
  });
  const number = (Math.max(...arrayData) + 1).toString();
  return number.length < length ? `${'0'.repeat(length - number.length)}${number}` : number;
};

const dateObjToString = (date, format) => {
  const year = date?.getFullYear()?.toString();
  let month = ((date?.getMonth() || 0) + 1)?.toString();
  let day = String(date?.getDate());

  if (year === 'NaN' || month === 'NaN' || day === 'NaN') return null;

  month = month?.length === 1 ? `0${month}` : month;
  day = day?.length === 1 ? `0${day}` : day;

  return format
    .replace(/YYYY|yyyy/g, year)
    .replace(/MM|mm/g, month)
    .replace(/DD|dd/g, day);
};

const blobToFile = (theBlob, fileName) => {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;

  return theBlob;
};

const blobToDCMFile = (theBlob, fileName) => {
  return new File([theBlob], fileName, { type: 'application/dicom' });
};

const getFileExtFromBase64 = (base64Data) => {
  return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
};

const validateDICOMFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    // Read the file as an ArrayBuffer
    fileReader.readAsArrayBuffer(file);

    // Handle file read completion
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      const dataView = new DataView(arrayBuffer);

      // Check the file signature
      const fileSignature = dataView.getUint32(128, false).toString(16);
      if (fileSignature === '42494d44') {
        resolve('Valid DICOM file');
      } else {
        reject(new Error('Invalid DICOM file'));
      }
    };

    // Handle file read error
    fileReader.onerror = () => {
      reject(new Error('Error reading file'));
    };
  });
};
export { ellipsis, idGenerator, dateObjToString, blobToFile, getFileExtFromBase64, blobToDCMFile, validateDICOMFile };
