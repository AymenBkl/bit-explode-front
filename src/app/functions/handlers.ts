import { ModalController } from "@ionic/angular";
import { ComplaintComponent } from "../components/modals/complaint/complaint.component";
import { InteractionService } from "../services/interaction.service";

export async function complaintForm(data:any,interactionService:InteractionService,modalCntrl:ModalController) {
    interactionService.confirmBox("YOU ARE NOT ALLOWED", 'BLOCKED', 'error', 'MAKE COMPLAINT', 'OK')
      .then(async (result: any) => {
        if (result && result.status == true) {
          this.makeComplaintForm(data);
        }
        else {
          console.log("cancel");
        }
      });
}

export async function makeComplaintForm(data:any,modalCntrl:ModalController) {
    const modal = await modalCntrl.create({
        component: ComplaintComponent,
        backdropDismiss: true,
        componentProps:data
      });
      modal.onDidDismiss()
        .then(data => {
          console.log(data);
        });
      await modal.present();
}