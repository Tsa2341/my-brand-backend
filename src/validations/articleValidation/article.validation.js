import { articleSchema } from "./article.schema.js";

export const articleValidation = async (req, res, next) => {
  const value = articleSchema.validate(req.body);
  console.log(value);
  if (value.error) {
    res.status(406).json({
      message: value.error.details[0].message.replaceAll('"', ""),
    });
  } else {
    next();
  }
}

