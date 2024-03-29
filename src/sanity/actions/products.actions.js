import { client } from '../lib/client'

export const getAllProducts = async () => {
  const productsQuery = `*[_type == 'products']`
  try {
    const products = await client.fetch(productsQuery)
    return products
  } catch (error) {
    console.log("Lỗi truy vấn dữ liệu")
  }
}
