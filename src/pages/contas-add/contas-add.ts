import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { DaoContasProvider } from '../../providers/dao-contas/dao-contas';

import { ContasPage } from '../contas/contas'
import { Conta } from '../../class/conta';

/**
 * Generated class for the ContasAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contas-add',
  templateUrl: 'contas-add.html',
})
export class ContasAddPage {

  public conta: Conta;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoContas: DaoContasProvider,
              public toast: ToastController) {

    this.conta = new Conta();

    if (this.navParams.data.id) {
      this.daoContas.get(this.navParams.data.id)
        .then((result: any) => {
          this.conta = result;
        })
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ContasAddPage');
  }

  salvar() {
    // if (this.conta.id == null) {
    //   this.daoContas.insert(this.conta);
    // } else {
    //   this.daoContas.update(this.conta);
    // }
    // this.navCtrl.pop();
    this.saveConta()
        .then(() => {
          this.toast.create({
            message: "Conta Salva",
            duration: 3000,
            position: 'botton'
          }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({
            message: 'Erro ao salvar uma Conta',
            duration: 3000,
            position: 'botton'
          }).present();
        });
  }

  private saveConta() {
    if (this.conta.ID) {
      return this.daoContas.update(this.conta);
    } else {
      return this.daoContas.insert(this.conta);
    }
  }
}
