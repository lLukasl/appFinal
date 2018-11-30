import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentoAddPage } from './lancamento-add';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    LancamentoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentoAddPage),
    BrMaskerModule
  ],
})
export class LancamentoAddPageModule {}
