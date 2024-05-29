const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      // be sure to include its associated Products
      include: [
        { model: Product }
      ]
    })
    res.json(categories)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error getting all categories.')
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const { id } = req.params
  try {
    const category = await Category.findByPk(id, {
      // be sure to include its associated Products
      include: [
        { model: Product }
      ]
    })
    res.json(category)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error getting category.')
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.json(newCategory)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error creating category.')
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { id } = req.params
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id }
    })
    res.json(updatedCategory)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error updating category.')
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params
  try {
    const deletedCategory = await Category.destroy({
      where: { id }
    })
    res.json(deletedCategory)
  } catch(err) {
    res.status(500).send(`Error deleting category.`)
  }
});

module.exports = router;
