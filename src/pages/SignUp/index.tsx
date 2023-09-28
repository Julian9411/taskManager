import { FormEvent, useRef, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { addUser, retrySignUp } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router";
import { Countries } from "../../components";

export const SignUp: React.FC = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState<string>("");
  const dispatch = useDispatch();
  const { isRegister } = useSelector((state: RootState) => state?.users);
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [countryName, setCountryName] = useState("");
  const [present, dismiss] = useIonLoading();
  const [isOpen, setIsOpen] = useState(false);

  const dismissModal = () => {
    setIsOpen(false);
  };

  const [alert] = useIonAlert();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await present({ message: "loading..." });
    dispatch(addUser({ name: email, pass, country: countryName }));

    setTimeout(() => {
      dismiss();
      if (isRegister) {
        alert({
          header: "Registered",
          message: "This user is registered by, please log in",
          buttons: [
            { text: "ok", handler: () => dispatch(retrySignUp()) },
            {
              text: "Log In",
              handler: () => {
                history.push("/");
                dispatch(retrySignUp());
              },
            },
          ],
        });
      } else {
        history.push("/home");
      }
    }, 1500);
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        className="ion-justify-content-center, ion-align-items-center"
      >
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Please sign up for continue</IonCardSubtitle>
            <IonCardTitle>Sign Up</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={onSubmit}>
              <IonItem>
                <IonInput
                  labelPlacement="floating"
                  label="Email"
                  type="email"
                  onIonChange={(e) => setEmail(e.detail.value as string)}
                />
              </IonItem>
              <IonItem className="ion-align-self-end">
                <IonInput
                  label="Password"
                  labelPlacement="floating"
                  onIonChange={(e) => setPass(e.detail.value as string)}
                  type={isPassword ? "password" : "text"}
                ></IonInput>
                <IonButton
                  slot="end"
                  className="ion-margin-top ion-align-self-center"
                  fill="clear"
                  onClick={() => setIsPassword(!isPassword)}
                >
                  <IonIcon
                    slot="icon-only"
                    icon={isPassword ? eyeOutline : eyeOffOutline}
                  />
                </IonButton>
              </IonItem>
              <IonButton
                shape="round"
                fill="clear"
                expand="block"
                onClick={() => setIsOpen(true)}
              >
                {countryName === "" ? "Choose Your country" : countryName}
              </IonButton>
              <Countries
                ref={modal}
                isOpen={isOpen}
                dismissModal={dismissModal}
                setCountryName={setCountryName}
              />

              <IonButton
                expand="full"
                fill="solid"
                shape="round"
                className="ion-margin-top"
                type="submit"
              >
                Submit
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
