import express from "express";
import "dotenv/config";

import ValidationError from "../error/validation.error.js";
import recordsService from "./records.service.js";

const router = express.Router();

router.post("/give", give);
router.get("/recive", recive);

// принимает запись (строку) от пользователя и складывает ее в буфер
function give(req, res) {
  try {
    if (!req.body.record) throw new ValidationError("Property 'record' is invalid.");

    const newRecord = recordsService.setRecords(req.body.record)
    res.json(newRecord);
  } catch (err) {
    console.error(err.message);

    if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message });
    } else res.status(500).json({ error: err.message });
  }
}

// отдает записи из буфера пачкой.
// При этом в параметрах запроса пользователь может указать количество записей, которые ему необходимо получить из буфера.
function recive(req, res) {
  try {
    const standartCount = (Number(process.env.RECORDS_COUNT) > 0) ? Number(process.env.RECORDS_COUNT) : 10;
    const count = strToCount(req.query.count, standartCount);

    const records = recordsService.getRecords(count);
    res.json({ records });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

function strToCount(str, standartCount) {
  if (!str) return standartCount;

  const num = Number(str);
  return Number.isInteger(num) && num > 0 ? num : standartCount;
}

export default router;
