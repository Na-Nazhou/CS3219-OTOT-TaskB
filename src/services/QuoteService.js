import database from '../models';

class QuoteService {
  static async getAllQuotes() {
    try {
      return await database.Quote.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addQuote(newQuote) {
    try {
      return await database.Quote.create(newQuote);
    } catch (error) {
      throw error;
    }
  }

  static async updateQuote(id, updateQuote) {
    try {
      const quoteToUpdate = await database.Quote.findOne({
        where: { id: Number(id) },
      });

      if (quoteToUpdate) {
        await database.Quote.update(updateQuote, { where: { id: Number(id) } });

        return updateQuote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAQuote(id) {
    try {
      const theQuote = await database.Quote.findOne({
        where: { id: Number(id) },
      });

      return theQuote;
    } catch (error) {
      throw error;
    }
  }

  static async deleteQuote(id) {
    try {
      const quoteToDelete = await database.Quote.findOne({
        where: { id: Number(id) },
      });

      if (quoteToDelete) {
        const deletedQuote = await database.Quote.destroy({
          where: { id: Number(id) },
        });
        return deletedQuote;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default QuoteService;
