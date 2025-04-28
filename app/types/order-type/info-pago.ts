export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  amountPaid: number;
  paidAt?: Date;
  metadata?: Record<string, any>;
}
