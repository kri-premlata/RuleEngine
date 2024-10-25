const Rule = require('../models/ruleSchema');
const { createAST } = require('../utils/ruleAST');


// Controller to create a new rule
exports.createRule = async (req, res) => {
  try {
    const { name, ruleString } = req.body;
    // console.log(ruleString);
    
    if (!name || !ruleString) {
      return res.status(400).json({ message: 'Name and rule string are required' });
    }

    const ast = createAST(ruleString);
 
    
    const newRule = new Rule({
      name,
      ruleString,
      ast
    });
    
console.log(newRule);
    await newRule.save();
    console.log(name);
    
    res.status(201).json({ message: 'Rule created successfully', rule: newRule });
  } catch (error) {
    res.status(500).json({ message: 'Error creating rule', error: error.message });
  }
};

// Controller to combine multiple rules
exports.combineRules = async (req, res) => {
  try {
    const { ruleIds } = req.body;
    if (!ruleIds || !Array.isArray(ruleIds) || ruleIds.length < 2) {
      return res.status(400).json({ message: 'At least two valid rule IDs are required' });
    }

    const rules = await Rule.find({ _id: { $in: ruleIds } });
    if (rules.length !== ruleIds.length) {
      return res.status(404).json({ message: 'One or more rules not found' });
    }
    
    // Combine ASTs
    const combinedAST = rules.reduce((combined, rule) => {
      return combined ? { type: 'operator', operator: 'AND', left: combined, right: rule.ast } : rule.ast;
    }, null);

    res.status(200).json({ message: 'Rules combined successfully', combinedAST });
  } catch (error) {
    res.status(500).json({ message: 'Error combining rules', error: error.message });
  }
};

// Controller to evaluate a rule against provided data
exports.evaluateRule = async (req, res) => {
  try {
    const { ruleId, data } = req.body;
    if (!ruleId || !data) {
      return res.status(400).json({ message: 'Rule ID and data are required' });
    }

    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }

    const result = evaluateAST(rule.ast, data);

    res.status(200).json({ message: 'Rule evaluated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating rule', error: error.message });
  }
};

// Helper function to evaluate AST
const evaluateAST = (node, data) => {
  try {
    if (node.type === 'operand') {
      const value = data[node.attribute];
      if (value === undefined) {
        throw new Error(`Attribute '${node.attribute}' not found in data`);
      }
      switch (node.operator) {
        case '>': return value > parseFloat(node.value);
        case '<': return value < parseFloat(node.value);
        case '=': return value.toString() === node.value;
        case '>=': return value >= parseFloat(node.value);
        case '<=': return value <= parseFloat(node.value);
        default: throw new Error(`Invalid operator: ${node.operator}`);
      }
    } else if (node.type === 'operator') {
      const leftResult = evaluateAST(node.left, data);
      const rightResult = evaluateAST(node.right, data);
      switch (node.operator.toUpperCase()) {
        case 'AND': return leftResult && rightResult;
        case 'OR': return leftResult || rightResult;
        default: throw new Error(`Invalid operator: ${node.operator}`);
      }
    }
    throw new Error(`Invalid node type: ${node.type}`);
  } catch (error) {
    throw new Error(`Evaluation error: ${error.message}`);
  }
};

// Bonus: Controller to modify an existing rule
exports.modifyRule = async (req, res) => {
  try {
    const { ruleId } = req.params;
    const { newRuleString } = req.body;
    
    if (!newRuleString) {
      return res.status(400).json({ message: 'New rule string is required' });
    }

    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }

    rule.ruleString = newRuleString;
    rule.ast = createAST(newRuleString);
    await rule.save();

    res.status(200).json({ message: 'Rule modified successfully', rule });
  } catch (error) {
    res.status(500).json({ message: 'Error modifying rule', error: error.message });
  }
};

// Bonus: Controller to validate attributes against a catalog
exports.validateAttributes = async (req, res) => {
  try {
    const { attributes } = req.body;
    if (!attributes || !Array.isArray(attributes)) {
      return res.status(400).json({ message: 'Valid array of attributes is required' });
    }

    const validAttributes = ['age', 'department', 'salary', 'experience']; // This could be fetched from a database

    const invalidAttributes = attributes.filter(attr => !validAttributes.includes(attr));

    if (invalidAttributes.length > 0) {
      return res.status(400).json({ message: 'Invalid attributes found', invalidAttributes });
    }

    res.status(200).json({ message: 'All attributes are valid' });
  } catch (error) {
    res.status(500).json({ message: 'Error validating attributes', error: error.message });
  }
};


// Controller to delete a rule by ID
exports.deleteRule = async (req, res) => {
  try {
    const { id } = req.params;

    const rule = await Rule.findById(id);
    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }

    await Rule.findByIdAndDelete(id);

    res.status(200).json({ message: 'Rule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rule', error: error.message });
  }
};
