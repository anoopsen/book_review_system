export const errorHandler = (err:any) => {
    console.error(err);
    return { message: err.message, code: err.extensions.code };
  };
  