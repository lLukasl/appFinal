import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../database/database'
import { Conta } from '../../class/conta';

/*
  Generated class for the DaoContasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DaoContasProvider {

  public list = [];


  constructor(private dbProvider: DatabaseProvider) { }


  public get(id: number) {
    return this.dbProvider.getDB()
                  .then((db: SQLiteObject) => {
                    return db.executeSql('SELECT * FROM CONTAS WHERE ID = ?', [id])
                             .then((data: any) => {
                               console.log(data);
                               if (data.rows.length > 0) {
                                 let item = data.rows.item(0);
                                 let conta = new Conta();
                                 conta.ID = item.ID;
                                 conta.DESCRICAO = item.DESCRICAO;
                                 return conta;
                               }
                               return null;
                             })
                             .catch(e => console.error("Erro ao buscar conta", e));
                  })
                  .catch(e => console.error("Erro ao abrir banco", e));
  }

  getList() {
    // this.list = [
    //   {
    //     id: 1,
    //     descricao: "Alimentação"
    //   },
    //   {
    //     id: 2,
    //     descricao: "Lazer"
    //   },
    //   {
    //     id: 3,
    //     descricao: "Transporte"
    //   }
    // ];
    //
    // return this.list;

    return this.dbProvider.getDB()
                  .then((db: SQLiteObject) => {
                    let sql = 'SELECT * FROM CONTAS ORDER BY DESCRICAO ASC';

                    return db.executeSql(sql, [])
                             .then((data: any) => {
                                if (data.rows.length > 0) {
                                  let produtos: any[] = [];
                                  for (var i=0; i < data.rows.length; i++) {
                                    var produto = data.rows.item(i);
                                    produtos.push(produto);
                                  }
                                  return produtos;
                                } else {
                                  return [];
                                }
                             })
                             .catch(e => console.error("Erro ao buscar contas", e));
                  })
                  .catch(e => console.error('Erro ao buscar o banco de dados', e));
  }


  insert(conta) {
    // let last_id = this.list.length;
    // conta.id = last_id+1;
    // this.list.push(conta);

    return this.dbProvider.getDB()
                  .then((db: SQLiteObject) => {
                    return db.executeSql("INSERT INTO CONTAS (DESCRICAO) VALUES (?)", [conta.DESCRICAO])
                             .catch(e => console.error(e));
                  })
                  .catch(e => console.error("Erro ao inserir", e));
  }


  update(conta) {
    // let updateItem = this.list.find(this.findIndexToUpdate, conta.id);
    // let index = this.list.indexOf(updateItem);
    // this.list[index] = conta;
    // console.log(this.list);

    return this.dbProvider.getDB()
                          .then((db: SQLiteObject) => {
                            return db.executeSql("UPDATE CONTAS SET DESCRICAO = ? WHERE ID = ?", [conta.DESCRICAO, conta.ID])
                                     .catch(e => console.error("Erro ao atualizar conta", e));
                          })
                          .catch(e => console.error("Erro ao brir banco", e));
  }

  // findIndexToUpdate(conta) {
  //   return conta.id === this;
  // }

  delete(id: number) {
    // let pos = this.list.indexOf(conta);
    // // Passa a posição e a quantidade de itens que ele apaga
    // this.list.splice(pos, 1);
    return this.dbProvider.getDB()
                  .then((db:SQLiteObject) => {
                    return db.executeSql('DELETE FROM CONTAS WHERE ID = ?', [id])
                             .catch(e => console.error("Erro ao excluir Conta", e));
                  });
  }
}
