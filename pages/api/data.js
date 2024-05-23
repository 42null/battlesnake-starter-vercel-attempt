// pages/api/data.js
import { getCachedData } from '../dataCache';

export default function handler(req, res) {
    const data = getCachedData();
    res.status(200).json(data);
}
