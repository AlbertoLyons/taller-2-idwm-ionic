export interface ProductData {
    concat(response: Product): ProductData
    message: string
    totalRecords: number
    totalPages: number
    currentPage: number
    pageSize: number
    products: Product[]
  }
  
  export interface Product {
    name: string
    type: string
    price: number
    stock: number
    imageUrl: string
  }
  