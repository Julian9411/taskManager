import { FC, FormEvent, useEffect, useState } from "react";
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
} from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { logIn, retryLogin } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router";

export const Login: FC = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState<string>("");
  const dispatch = useDispatch();
  const { notUser, isLogin } = useSelector((state: RootState) => state?.users);
  const history = useHistory();

  const [alert] = useIonAlert();

  useEffect(() => {
    if (notUser) {
      alert({
        header: "invalid credentials",
        message:
          "There is no user with that credential please verify or Sign Up",
        buttons: [
          { text: "ok", handler: () => dispatch(retryLogin()) },
          {
            text: "Sign up",
            handler: () => {
              history.push("/signup");
              dispatch(retryLogin());
            },
          },
        ],
      });
    }

    if (isLogin) {
      history.push("/home")
    }
  
  }, [notUser, isLogin]);
 

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logIn({ name: email, pass }));
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
            <IonCardSubtitle>Please log in for continue</IonCardSubtitle>
            <IonCardTitle>Log In</IonCardTitle>
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
