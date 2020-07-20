const axios = require("axios")
const apiBaseUrl = 'http://localhost:3001/api';

const dataToSend = {
  "name": "Pinku",
  "ssn": "9416662422",
  "occupation": "Accountant",
  "dateOfBirth": "1994-12-24",
  "gender": "male"
}

const submitNewPatient = async (values) => {
  try {
    //Below line is beauty of renaming the destructured variable as newPatient.
    const { data: newPatient } = await axios.post(
      `${apiBaseUrl}/patients`,
      values
    );
    console.log('JSON.stringify(newPatient)=>', newPatient); // This is when we successfully get +ve response from backend route.
    // When we print this we get the same data as we sent to backend{along with id and empty emtries as the properties too.}
  } catch (err) {
    // **err.response.data** is anything that we send by =>  res.status(500).end("my_message") or res.status(500).send("my_message")
    console.log('errorrrrr.name==>>>', err.name) // Output: Error
    console.log('errorrrrr.message==>>>', err.message) // Output: Request failed with status code 500
    console.log('errorrrrr.response.data==>>>', err.response.data) // Output: my_message
  }
};
submitNewPatient({ "Some indigestable": "input to backend." });// This is BAD REQUEST to backend route.
submitNewPatient(dataToSend);// This is about GOOD REQUEST to backend route.

