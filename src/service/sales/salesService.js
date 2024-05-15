import productsRepository from '../../database/repositories/productsRepository.js'
import salesRepository from '../../database/repositories/salesRepository.js'
import saleProductsRepository from '../../database/repositories/saleProductsRepository.js'
export class SalesService {
    async findAllSales(){
        return await salesRepository.findAllSales()
    }

    async findByIdSale(saleId) {
        return await salesRepository.findByIdSale(saleId)
    }

    async findByDateSale(saleDate){
        return await salesRepository.findSaleByDate(saleDate)
    }

    /**
     * 
     * @param {object} request
     * @param {string} request.value
     * @param {date} request.dateSale
     * @param {string} request.statusPayment
     * @param {string} request.nameClient
     * @param {string} request.lastNameClient
     * @param {number} request.productBarCode
     * @param {number} request.quantityProduct
     * 
     * @returns Promise<void>
     * 
     */
    async create(request){
        const product = await productsRepository.findByBarCodeProduct(request.productBarCode)
        if(!product.quantity){
            throw Error('Produto esgotado')
        }
        const [saleId]  = await salesRepository.create(request)

        await saleProductsRepository.create(saleId, product.id, request.quantityProduct)
    }


     /**
     * 
     * @param {object} request
     * @param {string} request.value
     * @param {date} request.dateSale
     * @param {string} request.statusPayment
     * @param {string} request.nameClient
     * @param {string} request.lastNameClient
     * 
     * @returns Promise<void>
     * 
     */
    async update(request, saleId){
        const sale = await salesRepository.update({saleId, ...request})

        return sale
    }

    async delete(saleId){
        const result = await salesRepository.delete(saleId)

        return result
    }
} 