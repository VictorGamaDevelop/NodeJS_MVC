const FarmerRepository = require('../repositories/farmerRepository');

class FarmerService {
  constructor() {
    this.farmerRepository = new FarmerRepository();
  }

  validateCpfCnpj(cpfOrCnpj) {
    cpfOrCnpj = cpfOrCnpj.replace(/\./g, '');
    cpfOrCnpj = cpfOrCnpj.replace('-', '');
    cpfOrCnpj = cpfOrCnpj.replace('/', '');
    cpfOrCnpj = cpfOrCnpj.split('');

    if (cpfOrCnpj.length === 11) {
      const cpf = cpfOrCnpj;
      var v1 = 0;
      var v2 = 0;
      var aux = false;

      for (var i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
          aux = true;
        }
      }

      if (aux == false) {
        return false;
      }

      for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
        v1 += cpf[i] * p;
      }

      v1 = ((v1 * 10) % 11);

      if (v1 == 10) {
        v1 = 0;
      }

      if (v1 != cpf[9]) {
        return false;
      }

      for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
        v2 += cpf[i] * p;
      }

      v2 = ((v2 * 10) % 11);

      if (v2 == 10) {
        v2 = 0;
      }

      if (v2 != cpf[10]) {
        return false;
      } else {
        return true;
      }
    } else if (cpfOrCnpj.length === 14) {
      const cnpj = cpfOrCnpj;
      var v1 = 0;
      var v2 = 0;
      var aux = false;

      for (var i = 1; cnpj.length > i; i++) {
        if (cnpj[i - 1] != cnpj[i]) {
          aux = true;
        }
      }

      if (aux == false) {
        return false;
      }

      for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v1 += cnpj[i] * p1;
        } else {
          v1 += cnpj[i] * p2;
        }
      }

      v1 = (v1 % 11);

      if (v1 < 2) {
        v1 = 0;
      } else {
        v1 = (11 - v1);
      }

      if (v1 != cnpj[12]) {
        return false;
      }

      for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v2 += cnpj[i] * p1;
        } else {
          v2 += cnpj[i] * p2;
        }
      }

      v2 = (v2 % 11);

      if (v2 < 2) {
        v2 = 0;
      } else {
        v2 = (11 - v2);
      }

      if (v2 != cnpj[13]) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  /**
     * Get all farmers.
     * @returns {Promise<Array>} A list of farmers.
     */
  async getAll() {
    try {
      return await this.farmerRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  /**
     * Get a farmer by ID.
     * @param {number} id - The ID of the farmer to retrieve.
     * @returns {Promise<Object|null>} The found farmer or null if not found.
     */
  async getById(id) {
    try {
      return await this.farmerRepository.getById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
    * Create a new farmer.
    * @param {Object} farmerData - The data of the farmer to create.
    * @returns {Promise<Object>} The created farmer.
    */
  async create(farmerData) {
    try {
      const { cpfCnpj } = farmerData;
      if (this.validateCpfCnpj(cpfCnpj)) {
        return await this.farmerRepository.create(farmerData);
      } else {
        throw new Error('CPF/CNPJ inválido');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a farmer by ID.
   * @param {number} id - The ID of the farmer to update.
   * @param {Object} farmerData - The data of the farmer to update.
   * @returns {Promise<Object|null>} The updated farmer or null if not found.
   */
  async update(id, farmerData) {
    try {
      const { cpfCnpj } = farmerData;
      if (this.validateCpfCnpj(cpfCnpj)) {
        return await this.farmerRepository.update(id, farmerData);
      } else {
        throw new Error('CPF/CNPJ inválido');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
  * Delete a farmer by ID.
  * @param {number} id - The ID of the farmer to delete.
  * @returns {Promise<boolean>} True if the farmer was deleted successfully, False if not found.
  */
  async delete(id) {
    try {
      return await this.farmerRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FarmerService;
