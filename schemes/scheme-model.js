const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps, 
    add,
    update,
    remove,
    addStep
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({id})
        .first()
};

function findSteps(id) {
    return db('schemes')
        .where('schemes.id', id)
        .join('steps', 'steps.scheme_id', '=', 'schemes.id')
        .select('schemes.scheme_name as scheme', 'steps.step_number', 'steps.instructions')
        .orderBy('steps.step_number')
};

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(([id]) => {
            return findById(id);
        })
};

function getStep(id) {
    return db('steps')
        .where({id})
        .first();
}

function addStep(step, scheme_id) {
     step = ({
        ...step,
        scheme_id: scheme_id
    })
    return db('steps')
        .insert(step)
        .then(([id]) => {
            return getStep(id);
        })
}

function update(changes, id) {
    return db('schemes')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? this.findById(id) : null))
};

function remove(id) {
    return db('schemes')
    .where({id})
    .del()
};
