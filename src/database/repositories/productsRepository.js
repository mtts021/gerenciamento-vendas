import { defaults } from "pg";
import { connection } from "../connection.js";

class ProductsRepository {
  async findAllProducts(){
    const sql = 'SELECT * FROM products;'

    const {rows} = await connection.query(sql)
    return rows
  }

  async findByIdProduct(productId){
    const sql = 'SELECT * FROM products WHERE id = $1'

    const {rows} = await connection.query(sql, [productId])
    const [product] =  rows

    return product || null
  }

  async create({bar_code, name, description, brand, price, quantity}){
    const sql = 'INSERT INTO products(bar_code, name, description, brand, price, quantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING id'

    const {rows} = await connection.query(sql, [bar_code, name, description, brand, price, quantity])
    const [productId] = rows

    return productId
    
  }

  async update({id, bar_code, name, description, brand, price, quantity}){
    const sql =  `UPDATE products 
                  SET bar_code = $1, name = $2, description = $3, brand = $4, price = $5, quantity = $6
                  WHERE id = $7`

    const {rowCount} = await connection.query(sql, [bar_code, name, description, brand, price, quantity, id])

    return rowCount
  }

  async delete(productId) {
    const sql = 'DELETE FROM products WHERE id = $1'

    const {rowCount} = await connection.query(sql, [productId])

    return rowCount
  }
} 


export default new ProductsRepository()