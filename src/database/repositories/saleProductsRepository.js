import { connection } from "../connection.js";

class SalesRepository {
  async findSalesByProductId(productId){
    const sql = `SELECT sale_id, bar_code, value, date_sale,status_payment, name_client, last_name_client
                    FROM sales_products INNER JOIN 
                    products ON sales_products.product_id = $1
                    INNER JOIN sales ON sales_products.sale_id = sales.id`;

    const {rows} = await connection.query(sql, [productId])
    return rows
  }

  async create({saleId, productId}){
    const sql = 'INSERT INTO sales_products(sale_id, product_id) VALUES($1, $2)'

    const {rows} = await connection.query(sql, [saleId, productId])

    return  [saleId] = rows
    
  }

  async delete(saleId) {
    const sql = 'DELETE FROM sales_products WHERE id = $1'

    const {rowCount} = await connection.query(sql, [saleId])

    return rowCount
  }
} 


export default new SalesRepository()