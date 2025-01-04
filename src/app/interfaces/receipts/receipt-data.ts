export interface ReceiptData {
  message: string
  receipts: Receipt[]
}

export interface Receipt {
  boughtAt: string
  totalPrice: number
  receiptProducts: ReceiptProduct[]
}

export interface ReceiptProduct {
  name: string
  type: string
  price: number
  quantity: number
  totalPrice: number
}
