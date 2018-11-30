import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { DaoContasProvider } from '../../providers/dao-contas/dao-contas'

import { ContasAddPage } from '../contas-add/contas-add'

/**
 * Generated class for the ContasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {

  public dao;
  public listContas: any[] = [];
  public loader = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoContas: DaoContasProvider,
              public loadingCtrl: LoadingController,
              public toast: ToastController) {
    // this.listContas = daoContas.getList();
  }

  ionViewDidEnter() {
    this.getList();
  }

  getList() {
    this.daoContas.getList()
                  .then((result: any[]) => {
                    console.log(result);
                    this.listContas = result;
                  });
  }

  onContasAdd () {
    this.navCtrl.push(ContasAddPage);
  }

  onContasEdt (id) {
    this.navCtrl.push(ContasAddPage, {"id": id});
  }

  delete(conta) {
    // this.daoContas.delete(conta);
    console.log(conta.ID);
    this.daoContas.delete(conta.ID)
                  .then(() => {
                    // Percore a conta no array para remover
                    var index = this.listContas.indexOf(conta);
                    this.listContas.splice(index, 1);
                    this.toast.create({
                      message: "Produto Removido",
                      duration: 3000,
                      position: 'botton'
                    }).present();
                  });
  }
}
