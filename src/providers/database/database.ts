import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public sqlite: SQLite) { }


  /**
   * Função tem o objetivo de criar/retonar o banco a ser utilizado
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'lp4-finance.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB().then((db:SQLiteObject) => {

      // Cria as tabelas
      this.createTables(db);

      // Insere dados padrões
      this.insertDefault(db);

    });
  }

 /**
  * Criando as tabelas no banco de dados
  * @param db
  */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    // sqlBatch podeexecutar mais de uma query
    // Em caso de erro, todas as alterações em um lote sql serão descartadas automaticamente usando ROLLBACK.
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS CONTAS (ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO TEXT)'],
      ['CREATE TABLE IF NOT EXISTS LANCAMENTOS (ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO TEXT, VALOR REAL, REFERENCIA_MES INTEGER, REFERENCIA_ANO INTEGER, TIPO TEXT, PAGO TEXT, CONTA_ID INTEGER, CONSTRAINT FK_CONTAS FOREIGN KEY (CONTA_ID) REFERENCES CONTAS (ID))']
    ]).then(() => console.log("Tabelas Criadas"))
    .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefault(db: SQLiteObject) {
    db.executeSql('SELECT COUNT(ID) AS QNTD FROM CONTAS', <any>{}).then((data: any) => {
      if (data.rows.item(0).QNTD == 0) {
        // Insere contas
        db.sqlBatch([
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Alimentação']],
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Salário']],
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Gasolina']]
          ])
          .then(() => console.log('Dads padrões de contas inseridas com sucesso!'))
          .catch(e => console.error('Erro ao incluir contas padrões', e));
      }
    }).catch(e => console.error("Erro ao consultar a qnt de contas", e));
  }
}
