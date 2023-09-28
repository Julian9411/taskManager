import { FC } from "react";
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const ViewTask: FC = () => {
  const params = useParams<{ id: string }>();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const task = tasks.find((item) => item.id === params.id);

  return (
    <IonPage id="view-task-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{task?.name}</IonCardTitle>
            <IonCardSubtitle>{task?.country}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel>{task?.createAt}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>{task?.authorEmail}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
