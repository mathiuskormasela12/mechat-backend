// ===== Response
module.exports = (res, status, success, message, results, ...optional) => {
  const [
    totalData,
    totalPage,
    currentPage,
    req
  ] = optional

  if (optional && optional.length >= 1) {
    res.status(status).json({
      success,
      message,
      status,
      results,
      pageInfo: {
        totalData: totalData && totalData,
        totalPage: totalData && totalPage,
        currentPage: currentPage && Number(currentPage),
        prevLink: (currentPage > 1) ? `${process.env.APP_URL.concat(req.path)}?${!req.query.page ? 'page=1&' : ''}${Object.keys(req.query).map((item, index) => `${item}=${item === 'page' ? Number(Object.values(req.query)[index]) - 1 : Object.values(req.query)[index]}`).join('&')}` : null,
        nextLink: (currentPage < totalPage) ? `${process.env.APP_URL.concat(req.path)}?${!req.query.page ? 'page=2&' : ''}${Object.keys(req.query).map((item, index) => `${item}=${item === 'page' ? Number(Object.values(req.query)[index]) + 1 : Object.values(req.query)[index]}`).join('&')}` : null
      }
    })
  } else {
    res.status(status).json({
      success,
      message,
      status,
      results
    })
  }
}
