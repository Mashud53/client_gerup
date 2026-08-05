"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Payment {
  id: string;
  rentalId: string;
  transactionId: string;
  amount: number;
  status: string;
  createdAt: string;
  rental: {
    userId: string;
  };
}

interface PaymentTableProps {
  payments: Payment[];
}


const AllPayments = ({ payments }: PaymentTableProps) => {
     if (!payments.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No payments found.
      </div>
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Status</span>
                <Badge>{payment.status}</Badge>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Payment ID</p>
                <p className="break-all text-sm">{payment.id}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="break-all text-sm">{payment.rental.userId}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Rental ID</p>
                <p className="break-all text-sm">{payment.rentalId}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Transaction ID
                </p>
                <p className="break-all text-sm">
                  {payment.transactionId}
                </p>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">
                  ${payment.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden overflow-x-auto rounded-lg border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
             
              <TableHead>Rental ID</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pay Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="max-w-55 truncate font-medium">
                  {payment.id}
                </TableCell>                

                <TableCell className="max-w-55 truncate">
                  {payment.rentalId}
                </TableCell>

                <TableCell className="max-w-55 truncate">
                  {payment.transactionId}
                </TableCell>

                <TableCell>
                  ${payment.amount.toFixed(2)}
                </TableCell>

                <TableCell>
                  <Badge>{payment.status}</Badge>
                </TableCell>

                <TableCell>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
    return (
        <div>
            
        </div>
    );
};

export default AllPayments;