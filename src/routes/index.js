import express from 'express';
import QuoteController from '../controllers/QuoteController';

const router = express.Router();

router.get('/', QuoteController.getAllQuotes);
router.post('/', QuoteController.addQuote);
router.get('/:id', QuoteController.getAQuote);
router.put('/:id', QuoteController.updatedQuote);
router.delete('/:id', QuoteController.deleteQuote);

export default router;
