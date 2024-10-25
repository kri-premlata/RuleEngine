const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

// Route to create a new rule
router.post('/create', ruleController.createRule);

// Route to combine multiple rules
router.post('/combine', ruleController.combineRules);

// Route to evaluate a rule against provided data
router.post('/evaluate', ruleController.evaluateRule);

// Bonus: Route to modify an existing rule
router.put('/modify/:ruleId', ruleController.modifyRule);

// Bonus: Route to validate attributes against a catalog
router.post('/validate-attributes', ruleController.validateAttributes);

// DELETE route to delete a rule by ID
router.delete('/rules/:id', ruleController.deleteRule);

module.exports = router;
