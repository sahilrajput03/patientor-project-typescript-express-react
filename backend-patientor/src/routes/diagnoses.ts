import express from 'express';
// import diaryService from '../services/diaryService';
import diagnosesService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  // res.send('Fetching all diaries!');
  res.header("Content-Type", 'application/json');
  // res.send(JSON.stringify(diaryService.getNonSensitiveEntries(), null, 4));
  res.send(JSON.stringify(diagnosesService.getEntries(), null, 4));
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;