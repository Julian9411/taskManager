import { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/userSlice";
import { useHistory } from "react-router";
import { RootState } from "../../redux/store";
import { Countries } from "../../components";
import { ITask, deleteTask } from "../../redux/slices/tasksSlice";
import { trash } from "ionicons/icons";

export const Home: React.FC = () => {
  const [countryName, setCountryName] = useState("");
  const [taskFilter, setTaskFilter] = useState<ITask[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const modal = useRef<HTMLIonModalElement>(null);
  const [alert] = useIonAlert();

  const dismissModal = () => {
    setIsOpen(false);
  };

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      setTaskFilter(tasks);
      e.detail.complete();
    }, 3000);
  };

  useEffect(() => {
    setTaskFilter(tasks.filter((task) => task.country?.includes(countryName)));
  }, [countryName, tasks]);

  const taskDelete = (id: string) => {
    alert({
      header: "invalid credentials",
      message: "There is no user with that credential please verify or Sign Up",
      buttons: [
        { text: "Cancel" },
        {
          text: "Yes, Delete",
          handler: () => {
            dispatch(deleteTask(id));
            setTaskFilter(tasks);
          },
        },
      ],
    });
    
  };

  return (
    <IonPage id="home-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>TaskManager</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                dispatch(logOut());
                history.push("/");
              }}
            >
              Sign Out
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        className="ion-justify-content-center, ion-align-items-center"
      >
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonButton expand="block" onClick={() => setIsOpen(true)}>
          {countryName === ""
            ? "filter by country name"
            : `filter by ${countryName}`}
        </IonButton>
        <Countries
          ref={modal}
          isOpen={isOpen}
          setCountryName={setCountryName}
          dismissModal={dismissModal}
        />
        <IonList>
          {tasks.length ? (
            <>
              {taskFilter.map((task) => (
                <IonItem key={task.id}>
                  <IonLabel onClick={() => history.push(`/task/${task.id}`)}>
                    <h3>{task.name}</h3>
                    <p>{task.country}</p>
                  </IonLabel>
                  <IonButton
                    slot="end"
                    className="ion-margin-top ion-align-self-center"
                    fill="clear"
                    onClick={() => taskDelete(task.id as string)}
                  >
                    <IonIcon icon={trash} />
                  </IonButton>
                </IonItem>
              ))}
            </>
          ) : (
            <p>You don't have a task, please create one</p>
          )}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="full"
            shape="round"
            onClick={() => history.push("/addtask")}
          >
            Add a new task
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
