import productsRepository from '../../database/repositories/productsRepository.js'

export class ProductsService {
  async findAllProducts(){
    return await productsRepository.findAllProducts()
  }

  async findByIdProduct(productId){
    return await productsRepository.findByIdProduct(productId)
  }

  async findByBarCodeProduct(productBarCode){
    return await productsRepository.findByIdProduct(productBarCode)
  }
  /**
   * 
   * @param {object} request
   * @param {number} request.barCode
   * @param {string} request.name
   * @param {string} request.description
   * @param {string} request.brand
   * @param {number} request.price
   * @param {number} request.quantity
   * @returns {Promise<object | Error>}
   */
  async create(request){
    const alreadyExistProduct = await productsRepository.findByBarCodeProduct(request.barCode)
    if(alreadyExistProduct){
      throw Error('Produto já existe')
    }
    const response = await productsRepository.create(request)

    return response 
  }


  /**
   * 
   * @param {object} request
   * @param {number} request.id
   * @param {number} request.barCode
   * @param {string} request.name
   * @param {string} request.description
   * @param {string} request.brand
   * @param {number} request.price
   * @param {number} request.quantity
   * @returns {Promise<object | Error>}
   */
  async update(request){
    const alreadyExistProduct = productsRepository.findByIdProduct(request.id)
    if(!alreadyExistProduct){
      throw Error('Produto não existe')
    }

    productsRepository.update(request) 

  }

  async delete(productId){
    const result = productsRepository.delete(productId)
    if(!result){
      throw Error('Produto não existe')
    }
  }
}