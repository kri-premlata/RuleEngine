const createAST = (ruleString) => {
  const tokens = tokenize(ruleString);
  let index = 0;

  function parseExpression() {
    if (tokens[index] === '(') {
      index++; // Skip opening parenthesis
      const left = parseExpression();
      const operator = tokens[index++].toUpperCase();
      const right = parseExpression();
      index++; // Skip closing parenthesis
      return { type: 'operator', operator, left, right };
    } else {
      const attribute = tokens[index++];
      const operator = tokens[index++];
      const value = tokens[index++].replace(/'/g, '');
      return { type: 'operand', attribute, operator, value };
    }
  }

  return parseExpression();
};

const tokenize = (ruleString) => {
  return ruleString.match(/\(|\)|\w+|[<>=]+|'[^']*'/g);
};

const combineRules = (rules) => {
  return rules.reduce((combined, rule) => {
    const ast = typeof rule === 'string' ? createAST(rule) : rule;
    return combined ? { type: 'operator', operator: 'AND', left: combined, right: ast } : ast;
  }, null);
};

const evaluateRule = (ast, data) => {
  if (ast.type === 'operand') {
    const value = data[ast.attribute];
    if (value === undefined) {
      throw new Error(`Attribute '${ast.attribute}' not found in data`);
    }
    switch (ast.operator) {
      case '>': return value > parseFloat(ast.value);
      case '<': return value < parseFloat(ast.value);
      case '=': return value.toString() === ast.value;
      case '>=': return value >= parseFloat(ast.value);
      case '<=': return value <= parseFloat(ast.value);
      default: throw new Error(`Invalid operator: ${ast.operator}`);
    }
  } else if (ast.type === 'operator') {
    const leftResult = evaluateRule(ast.left, data);
    const rightResult = evaluateRule(ast.right, data);
    switch (ast.operator) {
      case 'AND': return leftResult && rightResult;
      case 'OR': return leftResult || rightResult;
      default: throw new Error(`Invalid operator: ${ast.operator}`);
    }
  }
  throw new Error(`Invalid node type: ${ast.type}`);
};

module.exports = {
  createAST,
  combineRules,
  evaluateRule
};
