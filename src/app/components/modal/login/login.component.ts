import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  passwordChanged:boolean;
  submitted:boolean;
  hashId:string;
  password:string = '';
  incorrectPassword: boolean = false;
  constructor(private navParams: NavParams,
              private interactionService: InteractionService,
              private authService: AuthServiceService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.getData();
    
  }

  getData(){
    this.passwordChanged = this.navParams.get('passwordchanged');
    this.hashId = this.navParams.get('hashId');
    if (!this.passwordChanged){
      this.password = '3CSyB2q85ZTqsDM@EcMcsZ!gg@p!E8n?fEsV2aUecrzRPFAu_=?cgMW_=Fz=MS5U?$8SeZGy?PGJfk#TpjdfHe7?4&FTZpN2_4Z$?wwfYQpvN?Qz*f&HfKk-?kDGy*r-LR&Yr5Fwjn@JnCWSrNaDv&G5f%qTeWFA%@ez3WSbRCGxA2!8SaYVL&MV#@9uMnch%5UC9J_cGxHmXr4jPbjTcSsLWX*#TK8s=Zn9p#-MSDU&t3VUwxnW34n4GM#y!ZH9Z$p*?X^Q=GryfHrbwMf27^sfCs6Zn=GvNAjx^DX$6k3GtuTnH59-#avT2SuCLhLp&TJ&^XNnG2*#_LtAaU6fK-a@s_^f2A3LxAreJvrvhKsqKdh&t%4U!CPZ+-Z&SAT-*@AGN*UyFpZEFzZtPbcpw8#@Z%HPXHRFPnvbsZtL^BsHaT2^gdkj%=9L2pBf$KMW8JD3v-FQJ#C*n4D2nA2$F?GAa@pjZyajbU@F#_g82G8A5L$%-Tfm#gPPuM-BrdUPksZZgGDuTRT-Q^@sp!mBQ7Jgt^4jy^-@k8a&Zd43m2f^Q_3#LMqym?z!vncDLv^K#kK6mj$6FwW2Wq*wq+*G2@rqtvv6Zt@eDU@&y@d_7WFfd56FpCwm@4CskdPrcApesAgzR8^JJWFScda&=E%$+g2QAKDHknK-$BkfFu#S=*P^qArh8rpVWNa%gJT%6FF@+7AJJtKfbEfw+*gHS#tYW%abRn^Y$raE?-92cs828^DXQPfeZA=T_Hyn7U69WXXP$&5ymex2Qudb%mw*-!^PrAjsJz^WRm*ar5kkLuTq43FN9?Bz25F%H57jtudrc*&DDt8vTPt?j^WUZxrZP_V!QszHq%5?r&Cj6F4x7e3E&dn?*!Z6uad!$NN^DrnEtt_Dw$9+H5KLJ&AQx^uYFrzY^B+hp+VTaC3JNJ*3p%b!V_h?+c^dtagt#3GHwj_RKP=Cx*TwvVgX__#e3T=zF$5KLP=Vq&4d+8JAZRE8N4c7SDx=xK_NU$6?rLPWtGBGk3X7ZEh%3N8g^FuCgLhStqzbzuNX!RZ+fQPyJc3aJ3euFh#t*YNg9$yXAZ&Tr7egj8UyJn5DP^Nfe5t&SW?3ScY-vVvn2c?hv^AjJy4%zQ+VtEezgwrYCD+GCpvLeUxC8t3%#J7h2u3jnefLkxQe+YYbuJ3yr8$*Cjr#n7+zPp&4d&vMQ!_datd!Tw!w54cpau?gjmnd-32bxcTN9z2B8k$fXFE!JgpKN!Na4Qu2C?@kDFj@7GDBJTvpjUS_vyrP%2m*pDsDcy+8vt38Q^n&CUh4M39^kqk@eKmJKHPm4v+_6d*cT&VbFhSGsCrQ8rH&5qQ!L9UCW$*C8uF377NhRfAzKnU#A%9B&meaejyZRqXHtHz2J@ws?m@!5RE=8DAD#svZYqNU@=a-XY!PZM&36uHgBGE8ePe*U_DNTSNm3?wsqyRKksMLukqkJXZw4_-ggk#wLkDM5-dH@RJ%VF4SMnZk%ZKCBQX3wVp8nN&9qt^cRf!?kxDWsS##S#h_Vgyw9LwMsHfXAM?ztfVUcEk&^Dr&PXD?=^k!w6=pXT_@$48J4_gd-ksZSDVHeH=2Zp8!dat8j4Ne-*pCNx&n#83ZU5zRNeEJjr&fY#FPvt+7qxUnJMmVCw8j8Tex*Yh&H2c^y9LDW69+8C!LZ=CejaMPzvLY$2=4Jrnaw#pS!*m_ejSSX2?kjP77ut$#&5RQMNb=a$3fcspc5&JK^9Wv65Z*Qn@3em6H222nHZcH#Eus8EuYq-@F$Qcrx8mQe*xb7Va#pD-u7URRb2z7+Tk6UnJeQu7zTGc9-V7ySbxsyavG*Cq9d-y$G9#4^G+f*puPJf%gf*D#wuHF3fe-U2hV=zU-*e44Y?tNFrMB&CpT!*j5BUxwz9pT9C++VH3^RV6b!FxG@C8sdT-yMcwZ=vmCq$ykZRZZ5^2P?H9J&YtaCgAgV-xqVB-bHKR!uSD@pD?E7f&FmEav!fT5tuDQL+a^QG*Tgc89a!Ff2V2#Jt@rhQ@-8$KQR$%yHLrEp_6aB!8f=ycDCrmW';
      this.login();
    }
  }

  login(){
    this.submitted = true;
    this.interactionService.createToast('Login In','info',true);
    this.authService.login(this.password,this.hashId)
      .then((result: any) => {
        this.submitted = false;
        this.interactionService.closeToast();
        if (result && result != false){
          this.modalController.dismiss({loggedIn: true});
          this.interactionService.createToast('WELCOM BACK !','success',false);
        }
        else {
          this.interactionService.createToast('Wrong Password !','error',false);
        }
      })
      .catch(err => {
        this.submitted = false;
        this.interactionService.closeToast();
        console.log(err,err.error)
        if (err && err.error && err.error.err.name == 'IncorrectPasswordError'){
          this.incorrectPassword = true;
          this.interactionService.createToast('Wrong Password !','error',false);
        }
        else {
          this.interactionService.createToast('Something Went Wrong !','error',false);
        }
      })
  }
}
