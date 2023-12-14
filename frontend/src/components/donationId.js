let donationId = 0;

export const getNextDonationId = () => {
  donationId += 1;
  return donationId;
};
