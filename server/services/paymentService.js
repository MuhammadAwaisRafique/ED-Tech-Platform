
const processPayment = async (req, res) => {
  try {
    const { amount, token } = req.body;
    // Mock success response
    res.status(200).json({ success: true, message: "Payment processed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { processPayment };
