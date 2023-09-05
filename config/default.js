require('dotenv').config();

module.exports = {
  stripe: {
    stripeApiKey: process.env.STRIPE_API_KEY,
    stripeEndpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
  },
};
