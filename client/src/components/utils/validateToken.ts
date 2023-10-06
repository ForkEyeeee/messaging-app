const validateToken = (tokenData: any) => {
  if (tokenData !== undefined) {
    const cTs = Math.floor(Date.now() / 1000);
    return tokenData.exp >= cTs;
  }
  return;
};

export default validateToken;
