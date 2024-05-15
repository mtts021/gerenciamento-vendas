import { connection } from "../connection.js";

class SalesRepository {
  async findSaleByDate(saleDate) {
    const sql = 'SELECT * FROM sales WHERE date_sale = $1'
    const {rows} = await connection.query(sql, [saleDate])
    return rows
  }

  async findAllSales(){
    const sql = 'SELECT * FROM sales;'

    const {rows} = await connection.query(sql)
    return rows
  }

  async findByIdSale(saleId){
    const sql = 'SELECT * FROM sales INNER JOIN sales_products ON sales_products.sale_id = $1 WHERE sales.id = $1'

    const {rows} = await connection.query(sql, [saleId])
    const [sale] =  rows

    return sale || null
  }

  async create({value, dateSale, statusPayment, nameClient, lastNameClient}){
    const sql = 'INSERT INTO sales(value, date_sale, status_payment, name_client, last_name_client) VALUES($1, $2, $3, $4, $5) RETURNING id'

    const {rows} = await connection.query(sql, [value, dateSale, statusPayment, nameClient, lastNameClient])
    const [saleId] = rows

    return saleId
    
  }

  async update({id, value, dateSale, statusPayment, nameClient, lastNameClient}){
    const sql =  `UPDATE sales 
                  SET value = $1, date_sale = $2, status_payment = $3, name_client = $4, last_name_client = $5
                  WHERE id = $6`

    const {rowCount} = await connection.query(sql, [value, dateSale, statusPayment, nameClient, lastNameClient, id])

    return rowCount
  }

  async delete(saleId) {
    const sql = 'DELETE FROM sales WHERE id = $1'

    const {rowCount} = await connection.query(sql, [saleId])

    return rowCount
  }
} 


export default new SalesRepository()