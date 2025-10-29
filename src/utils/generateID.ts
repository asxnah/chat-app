export const generateID = (): string => {
  const t = BigInt(Date.now());
  const hexTime = t.toString(16).padStart(12, '0');
  const rand = () =>
    Math.floor(Math.random() * 0xffff)
      .toString(16)
      .padStart(4, '0');

  return `${hexTime.slice(0, 8)}-${hexTime.slice(8, 12)}-${
    '7' + rand().slice(1)
  }-${rand()}-${rand()}${rand()}`;
};
