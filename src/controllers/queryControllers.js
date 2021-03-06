import queryServices from "../services/queryServices";

export default class QueryControllers {
  // TODO Don't access database from this file you only needs
  constructor() {
    this.services = new queryServices();
  }

  async createQuery(req, res, next) {
    try {
      const date = new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const result = await this.services.createQuery({
        ...req.body,
        date: date,
      });
      res
        .status(201)
        .json({ message: "this will save an query", data: result });
    } catch (error) {
      res
        .status(404)
        .json({
          message: error.message || "couldn't create the query",
          data: "",
        });
    }
  }

  async getAllQuerys(req, res, next) {
    try {
      const results = await this.services.getAllQuerys();
      res
        .status(200)
        .json({ message: "this will return all querys", data: results });
    } catch (error) {
      res
        .status(404)
        .json({
          message: error.message || "couldn't get the querries",
          data: "",
        });
    }
  }

  async deleteQuery(req, res, next) {
    try {
      const result = await this.services.deleteQuery(req.params.id);
      res
        .status(200)
        .json({ message: "this will delete one query", data: result });
    } catch (error) {
      res
        .status(404)
        .json({
          message: error.message || "couldn't delete the query",
          data: "",
        });
    }
  }

  async deleteAllQuery(req, res, next) {
    try {
      await this.services.deleteAllQuery();
      res
        .status(200)
        .json({
          message: "this will delete all querries",
          data: `deleted all querries  successfully `,
        });
    } catch (error) {
      res
        .status(404)
        .json({
          message: error.message || "couldn't delete all querries",
          data: "",
        });
    }
  }
}

