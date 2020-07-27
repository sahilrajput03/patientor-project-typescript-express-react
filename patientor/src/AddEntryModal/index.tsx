/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { allEntriesUnionForSubmit, Entry } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  // onSubmit: (values: Entry) => void;
  // onSubmit: (values: { [key: string]: string | number | object }) => void;
  onSubmit: (values: allEntriesUnionForSubmit) => void;
  // Above type annotation is just phenomenol, say we are defining that object's keys can have objects as their values too.
  error?: string;
  id: string;
}

const AddEntryModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit, error, id }: Props) => (
  // const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => ( // THis was the actual line, but throwin error return type isn't defined.
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon> {/* This is a SEMANTIC_UI_REACT component. */}
    <Modal.Header>Add new entry</Modal.Header>
    {/* This ^^ Modal.Header just sets the class name as "header" in the HTML5 div tag simply.  */}
    <Modal.Content>
      {/* This ^^ Modal.Content just sets the class name as "content" in the HTML5 div tag simply.  */}
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment> /* This is a SEMANTIC_UI_REACT component. */}
      {/* ABOVE Segment tag OF SEMANTIC_UI_REACT COMPONENT transpiler to this=>  <div style="color: red;">Field is required</div> */}
      <AddEntryForm id={id} onSubmit={onSubmit} onCancel={onClose} /> {/* This is a pure REACT component. */}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;