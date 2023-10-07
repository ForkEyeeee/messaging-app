interface IJwtPayload {
  user: {
    _id: string;
    username: string;
  };
  iat: number;
  exp: number;
}

const validateToken = (tokenData: IJwtPayload) => {
  if (tokenData !== undefined) {
    const cTs = Math.floor(Date.now() / 1000);
    return tokenData.exp >= cTs;
  }
  return;
};

export default validateToken;
