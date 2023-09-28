import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/slices/tasksSlice";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router";

export const FormTask: FC = () => {
  const [nameTask, setNameTask] = useState("");
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const [alert] = useIonAlert();
  const history = useHistory();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addTask({
        name: nameTask,
        country: user.country,
        authorEmail: user.name,
        createAt: new Date().toISOString(),
        id: uuidv4(),
      })
    );

    alert({
      header: "Successful",
      message: "The task was created",
      buttons: [
        { text: "Create other task",},
        {
          text: "Go back to home",
          handler: () => {
            history.push("/home");
          },
        },
      ],
    });
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
            <IonCardSubtitle>Please create a name of task</IonCardSubtitle>
            <IonCardTitle>Add new task</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={onSubmit}>
              <IonItem>
                <IonInput
                  labelPlacement="floating"
                  label="Name of task"
                  type="text"
                  onIonChange={(e) => setNameTask(e.detail.value as string)}
                />
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
