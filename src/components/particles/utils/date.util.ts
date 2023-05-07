export const getDateSecondsFromNow = (seconds: number) => {
  return new Date(Date.now() + seconds * 1000);
};

export const getTimeDifference = (time: Date | undefined) => {
  const now = new Date().getTime();
  const recoveryTime = time?.getTime() ?? 0;
  const timeDifference = Math.floor((recoveryTime - now) / 1000);

  return timeDifference;
};
