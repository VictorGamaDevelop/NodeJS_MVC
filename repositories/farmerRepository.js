const Farmer = require('../models/farmer');

class FarmerRepository {
  async getAll() {
    try {
      const farmers = await Farmer.findAll();
      return farmers;
    } catch (error) {
      console.error('Error fetching farmers:', error);
      throw new Error('Error fetching farmers');
    }
  }

  async getById(id) {
    try {
      const farmer = await Farmer.findByPk(id);
      if (!farmer) {
        throw new Error(`Farmer with ID ${id} not found`);
      }
      return farmer;
    } catch (error) {
      console.error(`Error fetching farmer with ID ${id}:`, error);
      throw new Error(`Error fetching farmer with ID ${id}`);
    }
  }

  async create(farmerData) {
    try {
      const farmer = await Farmer.create(farmerData);
      return farmer;
    } catch (error) {
      console.error('Error creating farmer:', error);
      throw new Error('Error creating farmer');
    }
  }

  async update(id, farmerData) {
    try {
      const [rowsUpdated] = await Farmer.update(farmerData, {
        where: { id },
      });
      if (rowsUpdated === 0) {
        throw new Error(`Farmer with ID ${id} not found`);
      }
      return { message: 'Farmer updated successfully' };
    } catch (error) {
      console.error(`Error updating farmer with ID ${id}:`, error);
      throw new Error(`Error updating farmer with ID ${id}`);
    }
  }

  async delete(id) {
    try {
      const rowsDeleted = await Farmer.destroy({
        where: { id },
      });
      if (rowsDeleted === 0) {
        throw new Error(`Farmer with ID ${id} not found`);
      }
      return { message: 'Farmer deleted successfully' };
    } catch (error) {
      console.error(`Error deleting farmer with ID ${id}:`, error);
      throw new Error(`Error deleting farmer with ID ${id}`);
    }
  }
}

module.exports = FarmerRepository;
