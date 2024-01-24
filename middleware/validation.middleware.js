export const validateSchema_ReqBody = (validateSchema) => {
  return async (req, res, next) => {
    // validate new user
    try {
      const validatedData = await validateSchema.validate(req.body);
      req.body = validatedData;
      //call next
      next();
      // throw error response
    } catch (error) {
      return res.status(409).send({ message: error.message });
    }
  };
};
