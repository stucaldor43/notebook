function arrayDifference(minuend, subtrahend) {
  if (!Array.isArray(minuend) || !Array.isArray(subtrahend)) return undefined;
  const difference = minuend.filter((minuendMember) => subtrahend.indexOf(minuendMember) < 0)
  return difference;
}

export default arrayDifference;