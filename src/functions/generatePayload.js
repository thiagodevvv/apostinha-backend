function generatePayload(id) {
  if (!id) return false;
  const payload = {
    id: id,
  };
  return payload;
}

module.exports = generatePayload;
