import React, { useState, useEffect } from "react";
import { Table, Input, DatePicker, Button } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const InvoiceDetails = () => {
  const [invoices, setInvoices] = useState([]);
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchInvoices = async () => {
    const params = new URLSearchParams();
    if (clientName) params.append("clientName", clientName);
    if (startDate)
      params.append("startDate", startDate.toISOString().split("T")[0]);
    if (endDate) params.append("endDate", endDate.toISOString().split("T")[0]);

    try {
      const response = await fetch(
        `/api/accountants/invoices?${params.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch invoices");
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      // Here you might want to set an error state and display it to the user
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []); // Fetch invoices on component mount

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchInvoices();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <DatePicker
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
            <Button type="submit">Filter</Button>
          </div>
        </form>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Invoice Number</Table.Head>
              <Table.Head>Date</Table.Head>
              <Table.Head>Client Name</Table.Head>
              <Table.Head>Total Amount</Table.Head>
              <Table.Head>Payment Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoices.map((invoice) => (
              <Table.Row key={invoice.invoice_number}>
                <Table.Cell>{invoice.invoice_number}</Table.Cell>
                <Table.Cell>
                  {new Date(invoice.invoice_date).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{invoice.client_name}</Table.Cell>
                <Table.Cell>${invoice.total_amount.toFixed(2)}</Table.Cell>
                <Table.Cell>{invoice.payment_status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
