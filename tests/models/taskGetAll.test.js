const sinon = require('sinon');
const { expect } = require('chai');

const taskModel = require('../../models/taskModel')
const connection = require('../../models/connection');

describe('Obtem todos as tarefas no BD', () => {
  describe('quando não extiste nanhuma tarefa criada', () => {
    const mockResult = []

    before(() => {
      sinon.stub(connection, 'query')
        .resolves(mockResult);
    });

    after(() => {
      connection.query.restore();
    });

    it('retorna um array vazio', async () => {
      const result = await taskModel.getAll();
      expect(result).to.be.an('array').that.is.empty;
    });
  });

  describe('quando extistem tarefas no BD', () => {
    const mockResult = [
      {
        id: 1,
        status: 'pendente',
        title: 'Estudar',
        date: '05/07/2022 14:00:00',
      }
    ]

    before(() => {
      sinon.stub(connection, 'query')
        .resolves(mockResult);
    });

    after(() => {
      connection.query.restore();
    });

    it('o objeto que esta no array contem os atributos id, status, title, date', async () => {
      const [result] = await movieModel.getAll();
      expect(result).to.be.eql(mockResult)
    })
  });
});
