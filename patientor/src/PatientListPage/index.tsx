/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Redirect, Route, useRouteMatch, useParams, Link, Switch, useHistory } from "react-router-dom";
import React from "react";
import axios from "axios";
import { Container, Table, Button, Icon } from "semantic-ui-react";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { AssertionError } from "assert";

const PatientListPage: React.FC = () => {
  const [{ patients, diagnosisCodes }, dispatch] = useStateValue();
  // console.log(useStateValue()[0].patients);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  //Above line is just simple useState hook of react, though this form makes it more clearer to udnerstand what you are reffering iwth useState name convention.
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (err) {
      interface errtype {
        response: {
          data: {
            error: string
          }
        }
      }
      const e = err as errtype;
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
  // const historyChanger = () => {
  //   useHistory().push("komalll");
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const personNameClickHandler = async (patient: Patient) => {
    try {
      const { data } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${patient.id}`);
      // alert(JSON.stringify(data));
      dispatch({ type: "UPDATE_FULLDETAILS_PATIENT", payload: data });
    } catch (error) {
      console.log(`error=> ${error.message} from ${error.name}. Thanks.`);
    }
  };

  // interface singlePatientProps {
  //   ...Patient
  // }

  const match = useRouteMatch('/:id') as RoutesInterface;
  // const { id } = useParams<{ id: string }>(); // suggested by the course.

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


  interface interfaceForDiagnoseCode {
    code: string
  }

  const DiagnoseCodeNameFetcher: React.FC<interfaceForDiagnoseCode> = props => {
    // console.log('diagnosisCodes', diagnosisCodes)
    const found = diagnosisCodes.find(c => c.code === props.code)
    // console.log('found=>', found)
    if (found) return (<>{found.name}</>)
    else return (<>No description for this diagnosis code.</>)
  }

  const EntryTypeIconFetcher: React.FC<{ entryType: string }> = (props) => {
    // const size = 'large'
    const size = 'big'
    // const size = 'huge'
    // const size = 'massive'
    switch (props.entryType) {
      case "Hospital":
        return (<><Icon name="user doctor" size={size}></Icon></>)
      case "OccupationalHealthcare":
        return (<><Icon name="universal access" size={size} ></Icon></>)
      case "HealthCheck":
        return (<><Icon name="american sign language interpreting" size={size}></Icon></>)
      default:
        return (<><Icon name="wheelchair" size={size} ></Icon></>)
    }
  }

  const SinglePatient = () => {
    const matchedPatient = Object.keys(patients).includes(match.params.id);
    if (matchedPatient) {
      // to do here....?>?>>?> for diagonses code for current.

      const { name, gender, entries, dateOfBirth, occupation, ssn } = patients[match.params.id];
      // const diagnosisCodesOfMatch = diagnosisCodes
      // console.log('diagnosisCodes, pambad', diagnosisCodes)

      return (
        <div>
          <h2>{name}
            {gender === "male" ? <Icon name='mars' /> : <Icon name='venus' />}
          </h2>
          SSN: {ssn}<br></br>
          Occupation: {occupation}
          DOB: {dateOfBirth}
          <br /><br></br>
          <div>
            <h2>Entries</h2>
            {entries.map((e, k) => {
              switch (e.type) {
                case "Hospital":
                  return (
                    <div className="ui success message" key={k}>
                      <b>Entry Type: {e.type} <EntryTypeIconFetcher entryType={e.type}></EntryTypeIconFetcher><br></br></b>
                      Date: {e.date}<br></br>
                      {e.description && (<> Description: {e.description}</>)}<br></br>
                  Diagnosis Code:<ul> {e.diagnosisCodes.map((d, key) => <li key={key}> {d}: <DiagnoseCodeNameFetcher code={d}></DiagnoseCodeNameFetcher> </li>)} </ul><br></br>
                      <br></br>
                    </div>
                  )
                case "OccupationalHealthcare":
                  return (
                    <div className="ui success message" key={k}>
                      <b>Entry Type: {e.type} <EntryTypeIconFetcher entryType={e.type}></EntryTypeIconFetcher><br></br></b>
                      Date: {e.date}<br></br>
                      {e.description && (<> Description: {e.description}</>)}<br></br>
                      {e.diagnosisCodes && (<> Diagnosisi Codes:<ul> {e.diagnosisCodes.map((d, key) => <li key={key}> {d}: <DiagnoseCodeNameFetcher code={d}></DiagnoseCodeNameFetcher> </li>)} </ul></>)}{/* you don't need a break here */}
                      <br></br><br></br>
                    </div>
                  )
                case "HealthCheck":
                  return (
                    <div className="ui success message" key={k}>
                      <b>Entry Type: {e.type} <EntryTypeIconFetcher entryType={e.type}></EntryTypeIconFetcher><br></br></b>
                      Date: {e.date}<br></br>
                      {e.description && (<> Description: {e.description}</>)}<br></br>
                      {e.healthCheckRating != null && (<> Health Check Rating: {e.healthCheckRating}</>)}<br></br><br></br>
                    </div>
                  )
                default:
                  return assertNever(e);
                // return (<>Add specifics to frontend for "{}" type.</>) // Earlier though code.

              }

            })}
          </div>
        </div>
      );
    } else {
      return (<></>)
    }
  };

  interface RoutesInterface {
    params: {
      id: string
    }
  }
  // const matchedPatient = Object.keys(patients).includes(match.params.id);

  return (
    <div className="App">
      <Switch>
        <Route path="/:id">
          {match ? <SinglePatient /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          <Container textAlign="center">
            <h3>Patient list</h3>
          </Container>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Occupation</Table.HeaderCell>
                <Table.HeaderCell>Health Rating</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.values(patients).map((patient: Patient) => (
                <Table.Row key={patient.id}>
                  <Table.Cell  >
                    <Link style={{ padding: 5 }} to={`/${patient.id}`}>
                      {patient.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{patient.gender}</Table.Cell>
                  <Table.Cell>{patient.occupation}</Table.Cell>
                  <Table.Cell>
                    <HealthRatingBar showText={false} rating={1} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Route>
      </Switch>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
