import QuoteService from '../services/QuoteService';
import Util from '../utils/Utils';

const util = new Util();

class QuoteController {
  static async getAllQuotes(req, res) {
    try {
      const allQuotes = await QuoteService.getAllQuotes();
      if (allQuotes.length > 0) {
        util.setSuccess(200, 'Quotes retrieved', allQuotes);
      } else {
        util.setSuccess(200, 'No quote found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addQuote(req, res) {
    if (!req.body.content) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newQuote = req.body;
    try {
      const createdQuote = await QuoteService.addQuote(newQuote);
      util.setSuccess(201, 'Quote Added!', createdQuote);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedQuote(req, res) {
    const alteredQuote = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateQuote = await QuoteService.updateQuote(id, alteredQuote);
      if (!updateQuote) {
        util.setError(404, `Cannot find quote with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Quote updated', updateQuote);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAQuote(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theQuote = await QuoteService.getAQuote(id);

      if (!theQuote) {
        util.setError(404, `Cannot find quote with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Quote', theQuote);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteQuote(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const quoteToDelete = await QuoteService.deleteQuote(id);

      if (quoteToDelete) {
        util.setSuccess(200, 'Quote deleted');
      } else {
        util.setError(404, `Quote with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default QuoteController;
