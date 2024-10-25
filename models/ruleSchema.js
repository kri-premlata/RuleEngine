const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['operator', 'operand'],
    required: true
  },
  operator: {
    type: String,
    enum: ['AND', 'OR', '>', '<', '=', '>=', '<='],
    required: function() { return this.type === 'operator'; }
  },
  attribute: {
    type: String,
    required: function() { return this.type === 'operand'; }
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: function() { return this.type === 'operand'; }
  },
  left: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  right: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
});

const RuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ruleString: {
    type: String,
    required: true
  },
  ast: NodeSchema,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt timestamp on save
// RuleSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

module.exports = mongoose.model('Rule', RuleSchema);


