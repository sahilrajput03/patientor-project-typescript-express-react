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



const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  // console.log(useStateValue()[0].patients);
  // This is just beauty of javascript. Isn't it.

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
      console.log('error');
    }
  };

  // interface singlePatientProps {
  //   ...Patient
  // }

  const match = useRouteMatch('/:id') as RoutesInterface;
  // const { id } = useParams<{ id: string }>(); // suggested by the course.

  const SinglePatient = () => {
    const matchedPatient = Object.keys(patients).includes(match.params.id);
    if (matchedPatient) {

      const { name, gender, entries, dateOfBirth, occupation, ssn } = patients[match.params.id];

      return (
        <div>
          <h2>{name}
            {gender === "male" ? <Icon name='mars' /> : <Icon name='venus' />}
          </h2>
          <br />
          <p>
            {entries}
          </p>
          <p>
            {dateOfBirth}
          </p>
          <p>
          </p>
          <p>
            {occupation}
          </p>
          <p>
            {ssn}
          </p>
          {/* {JSON.stringify(matchedPatient)} */}

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
