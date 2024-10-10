import React, { useState, useEffect } from "react";

const InvoiceDetails = () => {
  const [invoices, setInvoices] = useState([]);
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInvoices = async () => {
    setIsLoading(true);
    setError(null);

    // Validate dates
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be later than end date.");
      setIsLoading(false);
      return;
    }

    const params = new URLSearchParams();
    if (clientName) params.append("clientName", clientName);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    try {
      const response = await fetch(
        `http://localhost:3001/api/accountants/invoices?${params.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch invoices");

      const data = await response.json();
      console.log("Fetched invoices:", data);

      // Set invoices state from the nested invoices array
      setInvoices(data.invoices);

      // Reset the filters after fetching
      resetFilters();
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setError("Failed to fetch invoices. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setClientName("");
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchInvoices();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Filter"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {isLoading ? (
        <p>Loading invoices...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 p-2 text-left">
                Invoice Number
              </th>
              <th className="border-b-2 border-gray-300 p-2 text-left">Date</th>
              <th className="border-b-2 border-gray-300 p-2 text-left">
                Client Name
              </th>
              <th className="border-b-2 border-gray-300 p-2 text-left">
                Total Amount
              </th>
              <th className="border-b-2 border-gray-300 p-2 text-left">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.invoice_number}>
                <td className="border-b border-gray-300 p-2">
                  {invoice.invoice_number}
                </td>
                <td className="border-b border-gray-300 p-2">
                  {new Date(invoice.invoice_date).toLocaleDateString()}
                </td>
                <td className="border-b border-gray-300 p-2">
                  {invoice.client_name}
                </td>
                <td className="border-b border-gray-300 p-2">
                  ${parseFloat(invoice.total_amount).toFixed(2)}
                </td>
                <td className="border-b border-gray-300 p-2">
                  {invoice.payment_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceDetails;
